package br.edu.fatec.fateclab.contract;

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
 * Contrato de GET /trilhas com filtro area/nivel: 200 autenticado (RF06), 401 não autenticado
 * (RF04).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TrilhasContractTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    @Test
    void deveListarESomenteFiltrarTrilhasCorrespondentesQuandoAutenticado() throws Exception {
        trilhaRepository.save(
                TrilhaDeEstudo.builder()
                        .titulo("Lógica de Programação")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .build());
        trilhaRepository.save(
                TrilhaDeEstudo.builder()
                        .titulo("Banco de Dados Avançado")
                        .area("Banco de Dados")
                        .nivel(NivelTrilha.AVANCADO)
                        .build());

        String token = cadastrarAlunoERetornarToken("fernanda.reis@fatec.sp.gov.br");

        mockMvc.perform(
                        get("/api/trilhas")
                                .header("Authorization", "Bearer " + token)
                                .param("area", "Programação")
                                .param("nivel", "INICIANTE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].titulo").value("Lógica de Programação"));
    }

    @Test
    void deveRejeitarListagemDeTrilhasSemAutenticacao() throws Exception {
        mockMvc.perform(get("/api/trilhas")).andExpect(status().isUnauthorized());
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
