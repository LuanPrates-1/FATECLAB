package br.edu.fatec.fateclab.quiz.dto;

import jakarta.validation.constraints.NotNull;

public record VerificarRespostaRequest(@NotNull(message = "alternativa é obrigatória") Long alternativaId) {}
