package br.edu.fatec.fateclab.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CadastroAlunoRequest(
        @NotBlank(message = "nome é obrigatório") String nome,
        @NotBlank(message = "e-mail é obrigatório") @Email(message = "e-mail inválido") String email,
        @NotBlank(message = "senha é obrigatória")
                @Size(min = 8, message = "senha deve ter ao menos 8 caracteres")
                String senha) {}
