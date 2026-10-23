package br.edu.fatec.fateclab.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import br.edu.fatec.fateclab.quiz.Alternativa;
import br.edu.fatec.fateclab.quiz.Questao;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Fluxo completo do quiz: lição sem gabarito exposto, verificação por questão, aprovação com
 * 2 de 3 acertos, bônus por gabarito, bloqueio de módulos futuros e resumo com conquistas.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class QuizFlowTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private TrilhaRepository trilhaRepository;

    private TrilhaDeEstudo trilha;

    private Questao questao(Modulo modulo, int ordem, String enunciado, int indiceCorreta) {
        Questao q =
                Questao.builder()
                        .modulo(modulo)
                        .ordem(ordem)
                        .enunciado(enunciado)
                        .explicacao("Explicação " + ordem)
                        .alternativas(new ArrayList<>())
                        .build();
        for (int i = 0; i < 3; i++) {
            q.getAlternativas()
                    .add(
                            Alternativa.builder()
                                    .questao(q)
                                    .ordem(i + 1)
                                    .texto("Alternativa " + (i + 1))
                                    .correta(i == indiceCorreta)
                                    .build());
        }
        return q;
    }

    private Modulo moduloComQuiz(TrilhaDeEstudo t, int ordem, int xp) {
        Modulo m =
                Modulo.builder()
                        .trilha(t)
                        .ordem(ordem)
                        .titulo("Módulo " + ordem)
                        .conteudo("Conteúdo do módulo " + ordem)
                        .xpConcedido(xp)
                        .questoes(new ArrayList<>())
                        .build();
        for (int i = 1; i <= 3; i++) {
            m.getQuestoes().add(questao(m, i, "Pergunta " + ordem + "." + i, i % 3));
        }
        return m;
    }

    private void criarTrilha() {
        trilha =
                TrilhaDeEstudo.builder()
                        .titulo("SQL")
                        .area("Banco de Dados")
                        .nivel(NivelTrilha.INICIANTE)
                        .modulos(new ArrayList<>())
                        .build();
        trilha.getModulos().add(moduloComQuiz(trilha, 1, 20));
        trilha.getModulos().add(moduloComQuiz(trilha, 2, 30));
        trilha = trilhaRepository.save(trilha);
    }

    private String cadastrar(String email) throws Exception {
        String corpo =
                objectMapper.writeValueAsString(
                        Map.of("nome", "Teste Quiz", "email", email, "senha", "senhaSegura123"));
        String resposta =
                mockMvc.perform(post("/api/auth/cadastro").contentType(MediaType.APPLICATION_JSON).content(corpo))
                        .andExpect(status().isCreated())
                        .andReturn()
                        .getResponse()
                        .getContentAsString();
        return objectMapper.readTree(resposta).get("token").asText();
    }

    private List<Map<String, Long>> respostas(Modulo modulo, int quantasCertas) {
        List<Map<String, Long>> lista = new ArrayList<>();
        int i = 0;
        for (Questao q : modulo.getQuestoes()) {
            Alternativa escolhida =
                    i < quantasCertas
                            ? q.alternativaCorreta().orElseThrow()
                            : q.getAlternativas().stream().filter(a -> !a.isCorreta()).findFirst().orElseThrow();
            lista.add(Map.of("questaoId", q.getId(), "alternativaId", escolhida.getId()));
            i++;
        }
        return lista;
    }

    @Test
    void fluxoCompletoDoQuiz() throws Exception {
        criarTrilha();
        Modulo m1 = trilha.getModulos().get(0);
        Modulo m2 = trilha.getModulos().get(1);
        String token = cadastrar("quiz.fluxo@fatec.sp.gov.br");
        String auth = "Bearer " + token;

        // Sem iniciar a trilha, a lição fica bloqueada.
        mockMvc.perform(get("/api/trilhas/{t}/modulos/{m}/licao", trilha.getId(), m1.getId()).header("Authorization", auth))
                .andExpect(status().isConflict());

        mockMvc.perform(post("/api/trilhas/{t}/iniciar", trilha.getId()).header("Authorization", auth))
                .andExpect(status().isOk());

        // Lição do módulo atual: conteúdo e questões, sem revelar a correta.
        mockMvc.perform(get("/api/trilhas/{t}/modulos/{m}/licao", trilha.getId(), m1.getId()).header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.conteudo").value("Conteúdo do módulo 1"))
                .andExpect(jsonPath("$.minimoParaAprovacao").value(2))
                .andExpect(jsonPath("$.questoes.length()").value(3))
                .andExpect(jsonPath("$.questoes[0].alternativas[0].correta").doesNotExist());

        // Módulo seguinte continua bloqueado.
        mockMvc.perform(get("/api/trilhas/{t}/modulos/{m}/licao", trilha.getId(), m2.getId()).header("Authorization", auth))
                .andExpect(status().isConflict());

        // Módulo com quiz não pode ser concluído "no clique".
        mockMvc.perform(post("/api/trilhas/{t}/modulos/{m}/concluir", trilha.getId(), m1.getId()).header("Authorization", auth))
                .andExpect(status().isConflict());

        // Verificação de uma questão.
        Questao q1 = m1.getQuestoes().get(0);
        Long correta = q1.alternativaCorreta().orElseThrow().getId();
        mockMvc.perform(
                        post("/api/trilhas/{t}/modulos/{m}/questoes/{q}/verificar", trilha.getId(), m1.getId(), q1.getId())
                                .header("Authorization", auth)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(Map.of("alternativaId", correta))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correta").value(true))
                .andExpect(jsonPath("$.explicacao").value("Explicação 1"));

        // 1 de 3: reprovado, sem XP e sem avançar.
        mockMvc.perform(
                        post("/api/trilhas/{t}/modulos/{m}/responder", trilha.getId(), m1.getId())
                                .header("Authorization", auth)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(Map.of("respostas", respostas(m1, 1)))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aprovado").value(false))
                .andExpect(jsonPath("$.xpGanho").value(0))
                .andExpect(jsonPath("$.progresso.moduloAtualId").value(m1.getId()));

        // 2 de 3: aprovado, XP do módulo sem bônus, libera o módulo 2 e inicia a ofensiva.
        mockMvc.perform(
                        post("/api/trilhas/{t}/modulos/{m}/responder", trilha.getId(), m1.getId())
                                .header("Authorization", auth)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(Map.of("respostas", respostas(m1, 2)))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aprovado").value(true))
                .andExpect(jsonPath("$.acertos").value(2))
                .andExpect(jsonPath("$.xpGanho").value(20))
                .andExpect(jsonPath("$.bonusGabarito").value(0))
                .andExpect(jsonPath("$.progresso.moduloAtualId").value(m2.getId()))
                .andExpect(jsonPath("$.aluno.ofensiva").value(1));

        // 3 de 3 no último módulo: 30 XP + bônus de 20% (6 XP); trilha concluída com 56 XP no total.
        mockMvc.perform(
                        post("/api/trilhas/{t}/modulos/{m}/responder", trilha.getId(), m2.getId())
                                .header("Authorization", auth)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(Map.of("respostas", respostas(m2, 3)))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.aprovado").value(true))
                .andExpect(jsonPath("$.xpGanho").value(36))
                .andExpect(jsonPath("$.bonusGabarito").value(6))
                .andExpect(jsonPath("$.progresso.status").value("CONCLUIDA"))
                .andExpect(jsonPath("$.aluno.xpTotal").value(56))
                .andExpect(jsonPath("$.aluno.nivel").value(1));

        // Resumo do perfil com estatísticas e conquistas.
        mockMvc.perform(get("/api/alunos/me/resumo").header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.modulosConcluidos").value(2))
                .andExpect(jsonPath("$.trilhasConcluidas").value(1))
                .andExpect(jsonPath("$.quizzesGabaritados").value(1))
                .andExpect(jsonPath("$.posicaoRanking").value(1))
                .andExpect(jsonPath("$.trilhas[0].status").value("CONCLUIDA"))
                .andExpect(jsonPath("$.conquistas[?(@.codigo=='PRIMEIRO_PASSO')].desbloqueada").value(true))
                .andExpect(jsonPath("$.conquistas[?(@.codigo=='TRILHA_COMPLETA')].desbloqueada").value(true))
                .andExpect(jsonPath("$.conquistas[?(@.codigo=='GABARITOU')].desbloqueada").value(true))
                .andExpect(jsonPath("$.conquistas[?(@.codigo=='VETERANO')].desbloqueada").value(false));

        // Ranking traz nível e ofensiva.
        mockMvc.perform(get("/api/ranking").header("Authorization", auth))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entradas[0].nivel").value(1))
                .andExpect(jsonPath("$.entradas[0].ofensiva").value(1));
    }

    @Test
    void saudeEhPublica() throws Exception {
        mockMvc.perform(get("/api/saude")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ok"));
    }
}
