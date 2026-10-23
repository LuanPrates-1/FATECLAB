package br.edu.fatec.fateclab.trilha.dto;

import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;

public record TrilhaResponse(
        Long id,
        String titulo,
        String area,
        NivelTrilha nivel,
        String descricao,
        int totalModulos,
        int xpTotal) {

    public static TrilhaResponse de(TrilhaDeEstudo trilha) {
        return new TrilhaResponse(
                trilha.getId(),
                trilha.getTitulo(),
                trilha.getArea(),
                trilha.getNivel(),
                trilha.getDescricao(),
                trilha.getModulos().size(),
                somarXp(trilha));
    }

    static int somarXp(TrilhaDeEstudo trilha) {
        return trilha.getModulos().stream()
                .map(Modulo::getXpConcedido)
                .filter(xp -> xp != null)
                .mapToInt(Integer::intValue)
                .sum();
    }
}
