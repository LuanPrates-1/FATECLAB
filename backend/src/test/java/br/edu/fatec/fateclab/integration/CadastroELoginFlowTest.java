package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
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

/**
 * User Story 1, fluxo completo: um visitante se cadastra com e-mail institucional, depois faz
 * login separadamente (nova "sessão"), e então navega/filtra as trilhas disponíveis.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class CadastroELoginFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record LoginRequestTeste(String email, String senha) {}

    @Test
    void alunoSeCadastraFazLoginENavegaPelasTrilhasFiltradas() throws Exception {
        trilhaRepository.save(
                TrilhaDeEstudo.builder()
                        .titulo("Introdução ao React")
                        .area("Front-end")
                        .nivel(NivelTrilha.INICIANTE)
                        .build());
        trilhaRepository.save(
                TrilhaDeEstudo.builder()
                        .titulo("Spring Boot na prática")
                        .area("Back-end")
                        .nivel(NivelTrilha.INTERMEDIARIO)
                        .build());

        String email = "isabela.pereira@fatec.sp.gov.br";
        String senha = "senhaSegura123";

        String corpoCadastro =
                objectMapper.writeValueAsString(new CadastroRequestTeste("Isabela Pereira", email, senha));
        mockMvc.perform(
                        post("/api/auth/cadastro")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(corpoCadastro))
                .andExpect(status().isCreated());

        String corpoLogin = objectMapper.writeValueAsString(new LoginRequestTeste(email, senha));
        String respostaLogin =
                mockMvc.perform(
                                post("/api/auth/login")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpoLogin))
                        .andExpect(status().isOk())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        String token = objectMapper.readTree(respostaLogin).get("token").asText();

        mockMvc.perform(get("/api/trilhas").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));

        mockMvc.perform(
                        get("/api/trilhas")
                                .header("Authorization", "Bearer " + token)
                                .param("area", "Front-end"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].titulo").value("Introdução ao React"));
    }
}
