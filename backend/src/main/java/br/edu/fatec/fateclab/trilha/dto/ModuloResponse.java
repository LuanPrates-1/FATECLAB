package br.edu.fatec.fateclab.trilha.dto;

import br.edu.fatec.fateclab.trilha.Modulo;

public record ModuloResponse(Long id, Integer ordem, String titulo, Integer xpConcedido) {

    public static ModuloResponse de(Modulo modulo) {
        return new ModuloResponse(
                modulo.getId(), modulo.getOrdem(), modulo.getTitulo(), modulo.getXpConcedido());
    }
}
