package br.edu.fatec.fateclab.progresso;

/** Desempenho no quiz que concluiu um módulo; {@code bonusXp} é somado ao XP do módulo. */
public record ResultadoQuiz(int acertos, int totalQuestoes, int bonusXp) {}
