package br.edu.fatec.fateclab.admin.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record QuestaoRequest(
        @NotBlank(message = "enunciado é obrigatório") String enunciado,
        String explicacao,
        @NotNull @Size(min = 2, max = 6, message = "a questão deve ter de 2 a 6 alternativas") @Valid
                List<AlternativaRequest> alternativas) {}
