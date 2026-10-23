package br.edu.fatec.fateclab.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record AtualizarApelidoRequest(@NotBlank(message = "apelido é obrigatório") String apelido) {}
