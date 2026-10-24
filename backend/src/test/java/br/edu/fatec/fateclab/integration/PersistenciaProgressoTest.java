package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
 * SC-003 / US2 cenário 3: o progresso de um aluno persiste entre sessões — simulado aqui
 * encerrando o "token" da primeira sessão e autenticando de novo via /auth/login antes de
 * consultar o progresso, confirmando que ele retoma exatamente de onde parou.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class PersistenciaProgressoTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record LoginRequestTeste(String email, String senha) {}

    @Test
    void progressoEXpPersistemAposReautenticacaoEmNovaSessao() throws Exception {
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

        String email = "olivia.rocha@fatec.sp.gov.br";
        String senha = "senhaSegura123";

        String corpoCadastro =
                objectMapper.writeValueAsString(new CadastroRequestTeste("Olivia Rocha", email, senha));
        String respostaCadastro =
                mockMvc.perform(
                                post("/api/auth/cadastro")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpoCadastro))
                        .andExpect(status().isCreated())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        String tokenPrimeiraSessao = objectMapper.readTree(respostaCadastro).get("token").asText();

        mockMvc.perform(
                        post("/api/trilhas/{id}/iniciar", trilha.getId())
                                .header("Authorization", "Bearer " + tokenPrimeiraSessao))
                .andExpect(status().isOk());
        mockMvc.perform(
                        post(
                                        "/api/trilhas/{tid}/modulos/{mid}/concluir",
                                        trilha.getId(),
                                        trilha.getModulos().get(0).getId())
                                .header("Authorization", "Bearer " + tokenPrimeiraSessao))
                .andExpect(status().isOk());

        // "Nova sessão": autentica de novo, obtendo um token diferente.
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
        String tokenSegundaSessao = objectMapper.readTree(respostaLogin).get("token").asText();

        mockMvc.perform(get("/api/alunos/me/progresso").header("Authorization", "Bearer " + tokenSegundaSessao))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("EM_ANDAMENTO"))
                .andExpect(jsonPath("$[0].moduloAtualId").value(trilha.getModulos().get(1).getId()))
                .andExpect(jsonPath("$[0].xpObtidoNaTrilha").value(10));
    }
}
