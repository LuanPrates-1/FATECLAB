package br.edu.fatec.fateclab.trilha.dto;

import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import java.util.Comparator;
import java.util.List;

public record TrilhaDetalheResponse(
        Long id,
        String titulo,
        String area,
        NivelTrilha nivel,
        String descricao,
        int xpTotal,
        List<ModuloResponse> modulos) {

    public static TrilhaDetalheResponse de(TrilhaDeEstudo trilha) {
        return new TrilhaDetalheResponse(
                trilha.getId(),
                trilha.getTitulo(),
                trilha.getArea(),
                trilha.getNivel(),
                trilha.getDescricao(),
                TrilhaResponse.somarXp(trilha),
                trilha.getModulos().stream()
                        .sorted(Comparator.comparing(Modulo::getOrdem))
                        .map(ModuloResponse::de)
                        .toList());
    }
}
