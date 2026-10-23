package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
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
 * User Story 4, fluxo completo: administrador cria uma trilha com módulo → ela aparece na
 * listagem de trilhas disponível aos alunos; um aluno comum tenta acessar um endpoint do painel
 * de administração e recebe 403.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private record LoginRequestTeste(String email, String senha) {}

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    private record ModuloRequestTeste(int ordem, String titulo, int xpConcedido) {}

    private record CriarTrilhaRequestTeste(
            String titulo, String area, String nivel, List<ModuloRequestTeste> modulos) {}

    @Test
    void trilhaCriadaPeloAdminApareceParaAlunosEAlunoNaoAcessaPainelAdmin() throws Exception {
        usuarioRepository.save(
                Usuario.builder()
                        .nome("Administradora Elena")
                        .email("elena.admin@fatec.sp.gov.br")
                        .senhaHash(passwordEncoder.encode("senhaSegura123"))
                        .papel(PapelUsuario.ADMINISTRADOR)
                        .build());
        String corpoLoginAdmin =
                objectMapper.writeValueAsString(
                        new LoginRequestTeste("elena.admin@fatec.sp.gov.br", "senhaSegura123"));
        String respostaLoginAdmin =
                mockMvc.perform(
                                post("/api/auth/login")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpoLoginAdmin))
                        .andExpect(status().isOk())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        String tokenAdmin = objectMapper.readTree(respostaLoginAdmin).get("token").asText();

        var criarTrilhaRequest =
                new CriarTrilhaRequestTeste(
                        "Introdução a Bancos de Dados",
                        "Banco de Dados",
                        "INICIANTE",
                        List.of(new ModuloRequestTeste(1, "Modelo relacional", 10)));

        mockMvc.perform(
                        post("/api/admin/trilhas")
                                .header("Authorization", "Bearer " + tokenAdmin)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(criarTrilhaRequest)))
                .andExpect(status().isCreated());

        String corpoCadastroAluno =
                objectMapper.writeValueAsString(
                        new CadastroRequestTeste(
                                "Felipe Rocha", "felipe.rocha@fatec.sp.gov.br", "senhaSegura123"));
        String respostaCadastroAluno =
                mockMvc.perform(
                                post("/api/auth/cadastro")
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .content(corpoCadastroAluno))
                        .andExpect(status().isCreated())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        String tokenAluno = objectMapper.readTree(respostaCadastroAluno).get("token").asText();

        mockMvc.perform(get("/api/trilhas").header("Authorization", "Bearer " + tokenAluno))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].titulo").value("Introdução a Bancos de Dados"));

        mockMvc.perform(
                        post("/api/admin/trilhas")
                                .header("Authorization", "Bearer " + tokenAluno)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(criarTrilhaRequest)))
                .andExpect(status().isForbidden());
    }
}
