package br.edu.fatec.fateclab.admin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ModuloRequest(
        @NotNull Integer ordem,
        @NotBlank String titulo,
        @NotNull @PositiveOrZero Integer xpConcedido) {}
