package br.edu.fatec.fateclab.contract;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
 * Contrato de POST /trilhas/{trilhaId}/modulos/{moduloId}/concluir: 200 sucesso (US2 cenário 2),
 * 409 tentativa de pular etapa sem completar a anterior (edge case do spec).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class ConcluirModuloContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private TrilhaDeEstudo criarTrilhaComDoisModulos() {
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
        trilha.getModulos().forEach(modulo -> modulo.setTrilha(trilha));
        return trilhaRepository.save(trilha);
    }

    @Test
    void deveConcluirModuloAtualECreditarXp() throws Exception {
        TrilhaDeEstudo trilha = criarTrilhaComDoisModulos();
        String token = cadastrarAlunoERetornarToken("karen.lima@fatec.sp.gov.br");

        mockMvc.perform(post("/api/trilhas/{id}/iniciar", trilha.getId()).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        Long primeiroModuloId = trilha.getModulos().get(0).getId();

        mockMvc.perform(
                        post("/api/trilhas/{tid}/modulos/{mid}/concluir", trilha.getId(), primeiroModuloId)
                                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.xpObtidoNaTrilha").value(10))
                .andExpect(jsonPath("$.status").value("EM_ANDAMENTO"))
                .andExpect(jsonPath("$.moduloAtualId").value(trilha.getModulos().get(1).getId()));
    }

    @Test
    void deveRejeitarConclusaoDeModuloForaDeOrdem() throws Exception {
        TrilhaDeEstudo trilha = criarTrilhaComDoisModulos();
        String token = cadastrarAlunoERetornarToken("leo.farias@fatec.sp.gov.br");

        mockMvc.perform(post("/api/trilhas/{id}/iniciar", trilha.getId()).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());

        Long segundoModuloId = trilha.getModulos().get(1).getId();

        mockMvc.perform(
                        post("/api/trilhas/{tid}/modulos/{mid}/concluir", trilha.getId(), segundoModuloId)
                                .header("Authorization", "Bearer " + token))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.mensagem", org.hamcrest.Matchers.notNullValue()));
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
