package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * User Story 2, fluxo completo: iniciar trilha → concluir módulos em sequência → status muda
 * para CONCLUIDA com XP total correto, tanto na trilha quanto no total acumulado do aluno
 * (docs/arquitetura.md).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class ProgressoTrilhaFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;
    @Autowired private UsuarioRepository usuarioRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    @Test
    void concluirTodosOsModulosMudaStatusParaConcluidaComXpCorreto() throws Exception {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Java Básico")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(
                                List.of(
                                        Modulo.builder().ordem(1).titulo("Variáveis").xpConcedido(10).build(),
                                        Modulo.builder().ordem(2).titulo("Laços").xpConcedido(15).build()))
                        .build();
        for (var modulo : trilha.getModulos()) {
            modulo.setTrilha(trilha);
        }
        trilha = trilhaRepository.save(trilha);

        String email = "nicolas.pinto@fatec.sp.gov.br";
        String token = cadastrarAlunoERetornarToken(email);

        mockMvc.perform(post("/api/trilhas/{id}/iniciar", trilha.getId()).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        mockMvc.perform(
                        post(
                                        "/api/trilhas/{tid}/modulos/{mid}/concluir",
                                        trilha.getId(),
                                        trilha.getModulos().get(0).getId())
                                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("EM_ANDAMENTO"));

        mockMvc.perform(
                        post(
                                        "/api/trilhas/{tid}/modulos/{mid}/concluir",
                                        trilha.getId(),
                                        trilha.getModulos().get(1).getId())
                                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONCLUIDA"))
                .andExpect(jsonPath("$.moduloAtualId").doesNotExist())
                .andExpect(jsonPath("$.xpObtidoNaTrilha").value(25));

        var aluno = usuarioRepository.findByEmail(email).orElseThrow();
        org.assertj.core.api.Assertions.assertThat(aluno.getXpTotal()).isEqualTo(25);
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
        JsonNode json = objectMapper.readTree(resposta);
        return json.get("token").asText();
    }
}
