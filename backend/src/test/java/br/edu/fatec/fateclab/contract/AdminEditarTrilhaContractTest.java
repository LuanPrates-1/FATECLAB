package br.edu.fatec.fateclab.contract;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
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
 * Contrato de PUT /admin/trilhas/{trilhaId}: edição refletida imediatamente para os alunos
 * (FR-016), 403 usuário não administrador.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminEditarTrilhaContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private TrilhaRepository trilhaRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private record LoginRequestTeste(String email, String senha) {}

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record ModuloRequestTeste(int ordem, String titulo, int xpConcedido) {}

    private record CriarTrilhaRequestTeste(
            String titulo, String area, String nivel, List<ModuloRequestTeste> modulos) {}

    private String loginComoAdministrador(String email) throws Exception {
        usuarioRepository.save(
                Usuario.builder()
                        .nome("Administrador Teste")
                        .email(email)
                        .senhaHash(passwordEncoder.encode("senhaSegura123"))
                        .papel(PapelUsuario.ADMINISTRADOR)
                        .build());
        String corpoLogin = objectMapper.writeValueAsString(new LoginRequestTeste(email, "senhaSegura123"));
        String resposta =
                mockMvc.perform(
                                post("/api/auth/login")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpoLogin))
                        .andExpect(status().isOk())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        return objectMapper.readTree(resposta).get("token").asText();
    }

    private String cadastrarAlunoERetornarToken(String email) throws Exception {
        String corpo =
                objectMapper.writeValueAsString(new CadastroRequestTeste("Aluno Teste", email, "senhaSegura123"));
        String resposta =
                mockMvc.perform(
                                post("/api/auth/cadastro")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpo))
                        .andExpect(status().isCreated())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        return objectMapper.readTree(resposta).get("token").asText();
    }

    @Test
    void edicaoDeveSerRefletidaImediatamenteParaOsAlunos() throws Exception {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Título Antigo")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(List.of(Modulo.builder().ordem(1).titulo("M1").xpConcedido(10).build()))
                        .build();
        trilha.getModulos().forEach(m -> m.setTrilha(trilha));
        trilha = trilhaRepository.save(trilha);

        String tokenAdmin = loginComoAdministrador("admin.editor@fatec.sp.gov.br");

        var request =
                new CriarTrilhaRequestTeste(
                        "Título Novo",
                        "Programação",
                        "INICIANTE",
                        List.of(new ModuloRequestTeste(1, "M1 atualizado", 20)));

        mockMvc.perform(
                        put("/api/admin/trilhas/{id}", trilha.getId())
                                .header("Authorization", "Bearer " + tokenAdmin)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Título Novo"));

        String tokenAluno = cadastrarAlunoERetornarToken("aluna.verificadora@fatec.sp.gov.br");
        mockMvc.perform(get("/api/trilhas/{id}", trilha.getId()).header("Authorization", "Bearer " + tokenAluno))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Título Novo"))
                .andExpect(jsonPath("$.modulos[0].titulo").value("M1 atualizado"));
    }

    @Test
    void deveRejeitarEdicaoPorAlunoComum() throws Exception {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Título Antigo")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(List.of(Modulo.builder().ordem(1).titulo("M1").xpConcedido(10).build()))
                        .build();
        trilha.getModulos().forEach(m -> m.setTrilha(trilha));
        trilha = trilhaRepository.save(trilha);

        String tokenAluno = cadastrarAlunoERetornarToken("beto.aluno@fatec.sp.gov.br");

        var request =
                new CriarTrilhaRequestTeste(
                        "Tentativa", "Programação", "INICIANTE", List.of(new ModuloRequestTeste(1, "M1", 10)));

        mockMvc.perform(
                        put("/api/admin/trilhas/{id}", trilha.getId())
                                .header("Authorization", "Bearer " + tokenAluno)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }
}
