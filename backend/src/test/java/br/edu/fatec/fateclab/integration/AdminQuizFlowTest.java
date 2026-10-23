package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Administrador cria trilha com lição e quiz, edita sem perder o progresso dos alunos e não
 * consegue excluir módulo que já tem progresso.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminQuizFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private static Map<String, Object> questao(String enunciado) {
        return Map.of(
                "enunciado", enunciado,
                "explicacao", "Porque sim",
                "alternativas",
                        List.of(Map.of("texto", "Certa", "correta", true), Map.of("texto", "Errada", "correta", false)));
    }

    private static Map<String, Object> modulo(int ordem, String titulo, Object questoes) {
        return Map.of(
                "ordem", ordem,
                "titulo", titulo,
                "xpConcedido", 20,
                "conteudo", "Lição " + titulo,
                "questoes", questoes);
    }

    private static Map<String, Object> trilha(String titulo, List<Map<String, Object>> modulos) {
        return Map.of(
                "titulo", titulo,
                "area", "Programação",
                "nivel", "INICIANTE",
                "descricao", "Descrição",
                "modulos", modulos);
    }

    private String token(String email, PapelUsuario papel) throws Exception {
        usuarioRepository.save(
                Usuario.builder()
                        .nome("Usuário " + papel)
                        .email(email)
                        .apelido(papel.name().toLowerCase())
                        .senhaHash(passwordEncoder.encode("senhaSegura123"))
                        .papel(papel)
                        .build());
        String resposta =
                mockMvc.perform(
                                post("/api/auth/login")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(objectMapper.writeValueAsString(Map.of("email", email, "senha", "senhaSegura123"))))
                        .andExpect(status().isOk())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        return "Bearer " + objectMapper.readTree(resposta).get("token").asText();
    }

    @Test
    void rejeitaQuestaoSemAlternativaCorreta() throws Exception {
        String admin = token("admin.validacao@fatec.sp.gov.br", PapelUsuario.ADMINISTRADOR);
        Map<String, Object> invalida =
                trilha(
                        "Inválida",
                        List.of(
                                modulo(
                                        1,
                                        "M1",
                                        List.of(
                                                Map.of(
                                                        "enunciado", "?",
                                                        "alternativas",
                                                                List.of(
                                                                        Map.of("texto", "a", "correta", false),
                                                                        Map.of("texto", "b", "correta", false)))))));
        mockMvc.perform(
                        post("/api/admin/trilhas")
                                .header("Authorization", admin)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(invalida)))
                .andExpect(status().isUnprocessableEntity());

    }

    @Test
    void criaEditaEProtegeModulosComProgresso() throws Exception {
        String admin = token("admin.quiz@fatec.sp.gov.br", PapelUsuario.ADMINISTRADOR);
        String aluno = token("aluno.quiz@fatec.sp.gov.br", PapelUsuario.ALUNO);

        // Criação com lição e quiz.
        String criada =
                mockMvc.perform(
                                post("/api/admin/trilhas")
                                        .header("Authorization", admin)
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(
                                                objectMapper.writeValueAsString(
                                                        trilha(
                                                                "Java",
                                                                List.of(
                                                                        modulo(1, "Classes", List.of(questao("Q1"))),
                                                                        modulo(2, "Herança", List.of(questao("Q2"))))))))
                        .andExpect(status().isCreated())
                        .andExpect(jsonPath("$.modulos.length()").value(2))
                        .andExpect(jsonPath("$.modulos[0].totalQuestoes").value(1))
                        .andExpect(jsonPath("$.descricao").value("Descrição"))
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        JsonNode json = objectMapper.readTree(criada);
        long trilhaId = json.get("id").asLong();
        long modulo1Id = json.get("modulos").get(0).get("id").asLong();

        // Visão completa do administrador revela a alternativa correta.
        mockMvc.perform(get("/api/admin/trilhas/{id}", trilhaId).header("Authorization", admin))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.modulos[0].conteudo").value("Lição Classes"))
                .andExpect(jsonPath("$.modulos[0].questoes[0].alternativas[0].correta").value(true));

        // Aluno não acessa a visão de administrador.
        mockMvc.perform(get("/api/admin/trilhas/{id}", trilhaId).header("Authorization", aluno))
                .andExpect(status().isForbidden());

        // Aluno inicia a trilha (módulo 1 passa a ter progresso).
        mockMvc.perform(post("/api/trilhas/{id}/iniciar", trilhaId).header("Authorization", aluno))
                .andExpect(status().isOk());

        // Edição que mantém o módulo 1 preserva o ID dele (o progresso continua válido).
        mockMvc.perform(
                        put("/api/admin/trilhas/{id}", trilhaId)
                                .header("Authorization", admin)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                trilha(
                                                        "Java OO",
                                                        List.of(
                                                                modulo(1, "Classes e objetos", List.of(questao("Q1 nova"))),
                                                                modulo(2, "Herança", List.of(questao("Q2"))))))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Java OO"))
                .andExpect(jsonPath("$.modulos[0].id").value(modulo1Id))
                .andExpect(jsonPath("$.modulos[0].titulo").value("Classes e objetos"));

        // Excluir o módulo 1, que o aluno está cursando, é recusado.
        mockMvc.perform(
                        put("/api/admin/trilhas/{id}", trilhaId)
                                .header("Authorization", admin)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(
                                                trilha("Java OO", List.of(modulo(2, "Herança", List.of(questao("Q2"))))))))
                .andExpect(status().isConflict());
    }
}
