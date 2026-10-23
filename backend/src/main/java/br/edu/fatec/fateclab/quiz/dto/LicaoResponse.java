package br.edu.fatec.fateclab.quiz.dto;

import br.edu.fatec.fateclab.quiz.Alternativa;
import br.edu.fatec.fateclab.quiz.Questao;
import br.edu.fatec.fateclab.trilha.Modulo;
import java.util.List;

/** Lição de um módulo para o aluno: conteúdo e questões, sem revelar a alternativa correta. */
public record LicaoResponse(
        Long id,
        Long trilhaId,
        Integer ordem,
        String titulo,
        String conteudo,
        Integer xpConcedido,
        int minimoParaAprovacao,
        List<QuestaoAluno> questoes) {

    public record QuestaoAluno(Long id, Integer ordem, String enunciado, List<AlternativaAluno> alternativas) {

        static QuestaoAluno de(Questao questao) {
            return new QuestaoAluno(
                    questao.getId(),
                    questao.getOrdem(),
                    questao.getEnunciado(),
                    questao.getAlternativas().stream().map(AlternativaAluno::de).toList());
        }
    }

    public record AlternativaAluno(Long id, String texto) {

        static AlternativaAluno de(Alternativa alternativa) {
            return new AlternativaAluno(alternativa.getId(), alternativa.getTexto());
        }
    }

    public static LicaoResponse de(Modulo modulo, int minimoParaAprovacao) {
        return new LicaoResponse(
                modulo.getId(),
                modulo.getTrilha().getId(),
                modulo.getOrdem(),
                modulo.getTitulo(),
                modulo.getConteudo(),
                modulo.getXpConcedido(),
                minimoParaAprovacao,
                modulo.getQuestoes().stream().map(QuestaoAluno::de).toList());
    }
}
