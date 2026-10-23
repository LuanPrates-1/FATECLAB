package br.edu.fatec.fateclab.admin.dto;

import br.edu.fatec.fateclab.quiz.Alternativa;
import br.edu.fatec.fateclab.quiz.Questao;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import java.util.Comparator;
import java.util.List;

/** Visão completa da trilha para edição no painel, incluindo lições e respostas corretas. */
public record AdminTrilhaResponse(
        Long id,
        String titulo,
        String area,
        NivelTrilha nivel,
        String descricao,
        boolean ativa,
        List<ModuloAdmin> modulos) {

    public record ModuloAdmin(
            Long id,
            Integer ordem,
            String titulo,
            Integer xpConcedido,
            String conteudo,
            List<QuestaoAdmin> questoes) {

        static ModuloAdmin de(Modulo modulo) {
            return new ModuloAdmin(
                    modulo.getId(),
                    modulo.getOrdem(),
                    modulo.getTitulo(),
                    modulo.getXpConcedido(),
                    modulo.getConteudo(),
                    modulo.getQuestoes().stream().map(QuestaoAdmin::de).toList());
        }
    }

    public record QuestaoAdmin(
            Long id, String enunciado, String explicacao, List<AlternativaAdmin> alternativas) {

        static QuestaoAdmin de(Questao questao) {
            return new QuestaoAdmin(
                    questao.getId(),
                    questao.getEnunciado(),
                    questao.getExplicacao(),
                    questao.getAlternativas().stream().map(AlternativaAdmin::de).toList());
        }
    }

    public record AlternativaAdmin(Long id, String texto, boolean correta) {

        static AlternativaAdmin de(Alternativa alternativa) {
            return new AlternativaAdmin(
                    alternativa.getId(), alternativa.getTexto(), alternativa.isCorreta());
        }
    }

    public static AdminTrilhaResponse de(TrilhaDeEstudo trilha) {
        return new AdminTrilhaResponse(
                trilha.getId(),
                trilha.getTitulo(),
                trilha.getArea(),
                trilha.getNivel(),
                trilha.getDescricao(),
                trilha.isAtiva(),
                trilha.getModulos().stream()
                        .sorted(Comparator.comparing(Modulo::getOrdem))
                        .map(ModuloAdmin::de)
                        .toList());
    }
}
