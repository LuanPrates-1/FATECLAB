package br.edu.fatec.fateclab.quiz.dto;

/** Retorno imediato de uma questão: se acertou, qual era a correta e a explicação. */
public record VerificacaoResponse(
        Long questaoId, boolean correta, Long alternativaCorretaId, String explicacao) {}
