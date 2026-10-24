package br.edu.fatec.fateclab.contract;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
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
 * Contrato de DELETE /admin/trilhas/{trilhaId}: 204 sucesso (US4 cenário 3), 403 usuário não
 * administrador.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdminRemoverTrilhaContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private TrilhaRepository trilhaRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private record LoginRequestTeste(String email, String senha) {}

    private record CadastroRequestTeste(String nome, String email, String senha) {}

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
        return objectMapper.readTree(resposta).get("token").asText();
    }

    private TrilhaDeEstudo criarTrilha() {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Trilha Removível")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(new ArrayList<>(List.of(Modulo.builder().ordem(1).titulo("M1").xpConcedido(10).build())))
                        .build();
        for (var m : trilha.getModulos()) {
            m.setTrilha(trilha);
        }
        return trilhaRepository.save(trilha);
    }

    @Test
    void deveRemoverTrilhaEDeixarDeAparecerParaAlunos() throws Exception {
        TrilhaDeEstudo trilha = criarTrilha();
        String tokenAdmin = loginComoAdministrador("admin.remocao@fatec.sp.gov.br");

        mockMvc.perform(delete("/api/admin/trilhas/{id}", trilha.getId()).header("Authorization", "Bearer " + tokenAdmin))
                .andExpect(status().isNoContent());

        String tokenAluno = cadastrarAlunoERetornarToken("carol.verificadora@fatec.sp.gov.br");
        mockMvc.perform(get("/api/trilhas").header("Authorization", "Bearer " + tokenAluno))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void deveRejeitarRemocaoPorAlunoComum() throws Exception {
        TrilhaDeEstudo trilha = criarTrilha();
        String tokenAluno = cadastrarAlunoERetornarToken("davi.aluno@fatec.sp.gov.br");

        mockMvc.perform(delete("/api/admin/trilhas/{id}", trilha.getId()).header("Authorization", "Bearer " + tokenAluno))
                .andExpect(status().isForbidden());
    }
}
