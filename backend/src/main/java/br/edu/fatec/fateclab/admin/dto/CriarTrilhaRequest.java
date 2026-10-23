package br.edu.fatec.fateclab.admin.dto;

import br.edu.fatec.fateclab.trilha.NivelTrilha;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CriarTrilhaRequest(
        @NotBlank String titulo,
        @NotBlank String area,
        @NotNull NivelTrilha nivel,
        @Size(max = 500, message = "descrição deve ter no máximo 500 caracteres") String descricao,
        @NotEmpty(message = "trilha deve ter ao menos um módulo") @Valid List<ModuloRequest> modulos) {}
