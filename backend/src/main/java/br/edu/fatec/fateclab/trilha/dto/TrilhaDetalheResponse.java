package br.edu.fatec.fateclab.trilha.dto;

import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import java.util.List;

public record TrilhaDetalheResponse(
        Long id, String titulo, String area, NivelTrilha nivel, List<ModuloResponse> modulos) {

    public static TrilhaDetalheResponse de(TrilhaDeEstudo trilha) {
        return new TrilhaDetalheResponse(
                trilha.getId(),
                trilha.getTitulo(),
                trilha.getArea(),
                trilha.getNivel(),
                trilha.getModulos().stream().map(ModuloResponse::de).toList());
    }
}
