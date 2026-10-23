package br.edu.fatec.fateclab.admin.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AlternativaRequest(
        @NotBlank(message = "texto da alternativa é obrigatório") @Size(max = 500) String texto,
        boolean correta) {}
