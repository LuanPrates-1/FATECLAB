package br.edu.fatec.fateclab.contract;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/** Contrato de GET /alunos/me e PATCH /alunos/me (FR-018; achado C1 da análise). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AlunoPerfilContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record AtualizarApelidoRequestTeste(String apelido) {}

    @Test
    void deveRetornarPerfilComApelidoPadraoGeradoAutomaticamente() throws Exception {
        String token = cadastrarAlunoERetornarToken("Tais Andrade", "tais.andrade@fatec.sp.gov.br");

        mockMvc.perform(get("/api/alunos/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Tais Andrade"))
                .andExpect(jsonPath("$.apelido").value("Tais"))
                .andExpect(jsonPath("$.xpTotal").value(0));
    }

    @Test
    void deveAtualizarApelidoDoAluno() throws Exception {
        String token = cadastrarAlunoERetornarToken("Ugo Vieira", "ugo.vieira@fatec.sp.gov.br");

        String corpo = objectMapper.writeValueAsString(new AtualizarApelidoRequestTeste("UgoV"));
        mockMvc.perform(
                        patch("/api/alunos/me")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(corpo))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.apelido").value("UgoV"));
    }

    @Test
    void deveRejeitarAcessoAoPerfilSemAutenticacao() throws Exception {
        mockMvc.perform(get("/api/alunos/me")).andExpect(status().isUnauthorized());
    }

    private String cadastrarAlunoERetornarToken(String nome, String email) throws Exception {
        String corpo = objectMapper.writeValueAsString(new CadastroRequestTeste(nome, email, "senhaSegura123"));
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
