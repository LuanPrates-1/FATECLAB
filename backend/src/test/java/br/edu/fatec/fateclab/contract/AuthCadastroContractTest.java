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

/**
 * Contrato de POST /auth/cadastro (docs/api.md): 201 sucesso, 409 e-mail duplicado
 * (RF02), 422 e-mail fora do domínio institucional (RF17).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthCadastroContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void deveCadastrarAlunoComEmailInstitucionalValido() throws Exception {
        String corpo =
                objectMapper.writeValueAsString(
                        new CadastroRequestTeste("Ana Silva", "ana.silva@fatec.sp.gov.br", "senhaSegura123"));

        mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token", notNullValue()))
                .andExpect(jsonPath("$.aluno.nome").value("Ana Silva"))
                .andExpect(jsonPath("$.aluno.papel").value("ALUNO"));
    }

    @Test
    void deveRejeitarCadastroComEmailDuplicado() throws Exception {
        String corpo =
                objectMapper.writeValueAsString(
                        new CadastroRequestTeste("Bruno Costa", "bruno.costa@fatec.sp.gov.br", "senhaSegura123"));

        mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.mensagem", notNullValue()));
    }

    @Test
    void deveRejeitarCadastroComEmailForaDoDominioInstitucional() throws Exception {
        String corpo =
                objectMapper.writeValueAsString(
                        new CadastroRequestTeste("Carla Dias", "carla.dias@gmail.com", "senhaSegura123"));

        mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.mensagem", notNullValue()));
    }

    private record CadastroRequestTeste(String nome, String email, String senha) {}
}
