package br.edu.fatec.fateclab.contract;

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

/** Contrato de POST /admin/trilhas: 201 sucesso (US4 cenário 1), 403 usuário não administrador (FR-015). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminCriarTrilhaContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record LoginRequestTeste(String email, String senha) {}

    private record ModuloRequestTeste(int ordem, String titulo, int xpConcedido) {}

    private record CriarTrilhaRequestTeste(
            String titulo, String area, String nivel, java.util.List<ModuloRequestTeste> modulos) {}

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
        JsonNode json = objectMapper.readTree(resposta);
        return json.get("token").asText();
    }

    @Test
    void deveCriarTrilhaComModuloQuandoAdministrador() throws Exception {
        String token = loginComoAdministrador("admin.zeta@fatec.sp.gov.br");

        var request =
                new CriarTrilhaRequestTeste(
                        "React do Zero",
                        "Front-end",
                        "INICIANTE",
                        java.util.List.of(new ModuloRequestTeste(1, "JSX", 10)));

        mockMvc.perform(
                        post("/api/admin/trilhas")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.titulo").value("React do Zero"))
                .andExpect(jsonPath("$.modulos.length()").value(1));
    }

    @Test
    void deveRejeitarCriacaoDeTrilhaPorAlunoComum() throws Exception {
        String token = cadastrarAlunoERetornarToken("aluno.comum@fatec.sp.gov.br");

        var request =
                new CriarTrilhaRequestTeste(
                        "React do Zero",
                        "Front-end",
                        "INICIANTE",
                        java.util.List.of(new ModuloRequestTeste(1, "JSX", 10)));

        mockMvc.perform(
                        post("/api/admin/trilhas")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }
}
