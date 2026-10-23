package br.edu.fatec.fateclab.contract;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * Contrato de GET /ranking: ordenação decrescente por xpTotal, desempate por apelido, e
 * destaque (ehVoce) do aluno autenticado (RF11, RF12).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class RankingContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private record LoginRequestTeste(String email, String senha) {}

    private Usuario criarAlunoComXp(String nome, String email, String apelido, int xpTotal) {
        Usuario usuario =
                Usuario.builder()
                        .nome(nome)
                        .email(email)
                        .senhaHash(passwordEncoder.encode("senhaSegura123"))
                        .papel(PapelUsuario.ALUNO)
                        .apelido(apelido)
                        .xpTotal(xpTotal)
                        .build();
        return usuarioRepository.save(usuario);
    }

    @Test
    void deveOrdenarPorXpEDestacarOAlunoAutenticado() throws Exception {
        criarAlunoComXp("Pedro Xavier", "pedro.xavier@fatec.sp.gov.br", "pedro", 50);
        criarAlunoComXp("Quenia Alves", "quenia.alves@fatec.sp.gov.br", "quenia", 90);

        String corpoLogin =
                objectMapper.writeValueAsString(
                        new LoginRequestTeste("pedro.xavier@fatec.sp.gov.br", "senhaSegura123"));
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

        mockMvc.perform(get("/api/ranking").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entradas.length()").value(2))
                .andExpect(jsonPath("$.entradas[0].apelido").value("quenia"))
                .andExpect(jsonPath("$.entradas[0].posicao").value(1))
                .andExpect(jsonPath("$.entradas[0].ehVoce").value(false))
                .andExpect(jsonPath("$.entradas[1].apelido").value("pedro"))
                .andExpect(jsonPath("$.entradas[1].ehVoce").value(true));
    }

    @Test
    void deveDesempatarPorApelidoEmOrdemAlfabetica() throws Exception {
        criarAlunoComXp("Rui Nogueira", "rui.nogueira@fatec.sp.gov.br", "rui", 40);
        criarAlunoComXp("Sara Melo", "sara.melo@fatec.sp.gov.br", "ana", 40);

        String corpoLogin =
                objectMapper.writeValueAsString(
                        new LoginRequestTeste("rui.nogueira@fatec.sp.gov.br", "senhaSegura123"));
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

        mockMvc.perform(get("/api/ranking").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entradas[0].apelido").value("ana"))
                .andExpect(jsonPath("$.entradas[1].apelido").value("rui"));
    }
}
