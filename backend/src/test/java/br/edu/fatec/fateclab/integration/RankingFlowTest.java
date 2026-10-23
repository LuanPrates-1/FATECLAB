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
 * User Story 3, fluxo completo: dois alunos ganham XP concluindo módulos e o ranking reflete a
 * ordenação correta, exibindo o apelido padrão gerado automaticamente para quem ainda não
 * personalizou o seu (RF18).
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class RankingFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private record CadastroRequestTeste(String nome, String email, String senha) {}

    @Test
    void alunosGanhamXpERankingReflete() throws Exception {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo("Java Básico")
                        .area("Programação")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(
                                List.of(Modulo.builder().ordem(1).titulo("Variáveis").xpConcedido(20).build()))
                        .build();
        trilha.getModulos().forEach(modulo -> modulo.setTrilha(trilha));
        trilha = trilhaRepository.save(trilha);
        Long moduloId = trilha.getModulos().get(0).getId();

        String tokenVitoria = cadastrarAlunoERetornarToken("Vitoria Ramos", "vitoria.ramos@fatec.sp.gov.br");
        String tokenWalter = cadastrarAlunoERetornarToken("Walter Costa", "walter.costa@fatec.sp.gov.br");

        // Vitoria conclui o módulo (ganha 20 XP); Walter não inicia a trilha (fica com 0 XP).
        mockMvc.perform(
                        post("/api/trilhas/{id}/iniciar", trilha.getId())
                                .header("Authorization", "Bearer " + tokenVitoria))
                .andExpect(status().isOk());
        mockMvc.perform(
                        post("/api/trilhas/{tid}/modulos/{mid}/concluir", trilha.getId(), moduloId)
                                .header("Authorization", "Bearer " + tokenVitoria))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/ranking").header("Authorization", "Bearer " + tokenWalter))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entradas.length()").value(2))
                .andExpect(jsonPath("$.entradas[0].apelido").value("Vitoria"))
                .andExpect(jsonPath("$.entradas[0].xpTotal").value(20))
                .andExpect(jsonPath("$.entradas[1].apelido").value("Walter"))
                .andExpect(jsonPath("$.entradas[1].xpTotal").value(0))
                .andExpect(jsonPath("$.entradas[1].ehVoce").value(true));
    }

    private String cadastrarAlunoERetornarToken(String nome, String email) throws Exception {
        String corpo = objectMapper.writeValueAsString(new CadastroRequestTeste(nome, email, "senhaSegura123"));
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
