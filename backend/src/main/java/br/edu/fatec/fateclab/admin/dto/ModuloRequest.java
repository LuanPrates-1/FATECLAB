package br.edu.fatec.fateclab.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.List;

/** Módulo enviado pelo administrador; {@code conteudo} e {@code questoes} são opcionais. */
public record ModuloRequest(
        @NotNull Integer ordem,
        @NotBlank String titulo,
        @NotNull @PositiveOrZero Integer xpConcedido,
        String conteudo,
        @Valid List<QuestaoRequest> questoes) {}
