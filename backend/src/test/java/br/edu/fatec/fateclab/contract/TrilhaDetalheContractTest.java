package br.edu.fatec.fateclab.contract;

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

/** Contrato de GET /trilhas/{trilhaId}: 200 com módulos, 404 trilha não encontrada ou inativa (achado C2 da análise). */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TrilhaDetalheContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    @Test
    void deveRetornarDetalheComModulosOrdenados() throws Exception {
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

        String token = cadastrarAlunoERetornarToken("giovana.alves@fatec.sp.gov.br");

        mockMvc.perform(
                        get("/api/trilhas/{id}", trilha.getId()).header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Java Básico"))
                .andExpect(jsonPath("$.modulos.length()").value(2))
                .andExpect(jsonPath("$.modulos[0].titulo").value("Variáveis"));
    }

    @Test
    void deveRetornar404ParaTrilhaInexistente() throws Exception {
        String token = cadastrarAlunoERetornarToken("heitor.nunes@fatec.sp.gov.br");

        mockMvc.perform(get("/api/trilhas/{id}", 999_999L).header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
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
