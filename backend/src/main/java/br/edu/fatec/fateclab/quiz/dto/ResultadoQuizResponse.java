package br.edu.fatec.fateclab.quiz.dto;

import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.progresso.dto.ProgressoResponse;
import java.util.List;

/**
 * Resultado do quiz: aprovação (cerca de 70% de acertos), XP ganho (com bônus de 20% por
 * gabarito), correção questão a questão e o estado atualizado do aluno e da trilha.
 */
public record ResultadoQuizResponse(
        boolean aprovado,
        int acertos,
        int totalQuestoes,
        int minimoParaAprovacao,
        int xpGanho,
        int bonusGabarito,
        boolean subiuDeNivel,
        List<VerificacaoResponse> correcao,
        ProgressoResponse progresso,
        AlunoPerfilResponse aluno) {}
