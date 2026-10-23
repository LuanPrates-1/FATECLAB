package br.edu.fatec.fateclab.quiz.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ResponderQuizRequest(
        @NotEmpty(message = "envie ao menos uma resposta") @Valid List<Resposta> respostas) {

    public record Resposta(@NotNull Long questaoId, @NotNull Long alternativaId) {}
}
