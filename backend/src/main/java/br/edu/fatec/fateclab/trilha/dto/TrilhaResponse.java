package br.edu.fatec.fateclab.trilha.dto;

import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;

public record TrilhaResponse(Long id, String titulo, String area, NivelTrilha nivel) {

    public static TrilhaResponse de(TrilhaDeEstudo trilha) {
        return new TrilhaResponse(trilha.getId(), trilha.getTitulo(), trilha.getArea(), trilha.getNivel());
    }
}
