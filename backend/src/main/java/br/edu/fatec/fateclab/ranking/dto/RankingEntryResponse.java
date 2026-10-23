package br.edu.fatec.fateclab.ranking.dto;

public record RankingEntryResponse(
        int posicao, String apelido, int xpTotal, boolean ehVoce, int nivel, int ofensiva) {}
