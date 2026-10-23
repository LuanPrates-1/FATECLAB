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

/** Contrato de POST /trilhas/{trilhaId}/iniciar (US2 cenário 1). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class IniciarTrilhaContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    @Test
    void deveIniciarTrilhaELiberarPrimeiroModulo() throws Exception {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Java Básico")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(
                                List.of(Modulo.builder().ordem(1).titulo("Variáveis").xpConcedido(10).build()))
                        .build();
        trilha.getModulos().forEach(modulo -> modulo.setTrilha(trilha));
        trilha = trilhaRepository.save(trilha);

        String token = cadastrarAlunoERetornarToken("joao.matos@fatec.sp.gov.br");

        mockMvc.perform(
                        post("/api/trilhas/{id}/iniciar", trilha.getId())
                                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("EM_ANDAMENTO"))
                .andExpect(jsonPath("$.moduloAtualId", org.hamcrest.Matchers.notNullValue()))
                .andExpect(jsonPath("$.xpObtidoNaTrilha").value(0));
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
