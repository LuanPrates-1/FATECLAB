package br.edu.fatec.fateclab.contract;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/** Contrato de POST /auth/login: 200 sucesso, 401 credenciais inválidas. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthLoginContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record LoginRequestTeste(String email, String senha) {}

    @Test
    void deveAutenticarComCredenciaisCorretas() throws Exception {
        String email = "diego.souza@fatec.sp.gov.br";
        cadastrarAluno("Diego Souza", email, "senhaSegura123");

        String corpoLogin = objectMapper.writeValueAsString(new LoginRequestTeste(email, "senhaSegura123"));

        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(corpoLogin))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", notNullValue()))
                .andExpect(jsonPath("$.aluno.nome").value("Diego Souza"));
    }

    @Test
    void deveRejeitarLoginComSenhaIncorreta() throws Exception {
        String email = "elisa.melo@fatec.sp.gov.br";
        cadastrarAluno("Elisa Melo", email, "senhaSegura123");

        String corpoLogin = objectMapper.writeValueAsString(new LoginRequestTeste(email, "senhaErrada"));

        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(corpoLogin))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.mensagem", notNullValue()));
    }

    @Test
    void deveRejeitarLoginComEmailInexistente() throws Exception {
        String corpoLogin =
                objectMapper.writeValueAsString(
                        new LoginRequestTeste("ninguem@fatec.sp.gov.br", "qualquerSenha123"));

        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(corpoLogin))
                .andExpect(status().isUnauthorized());
    }

    private void cadastrarAluno(String nome, String email, String senha) throws Exception {
        String corpo = objectMapper.writeValueAsString(new CadastroRequestTeste(nome, email, senha));
        mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isCreated());
    }
}
