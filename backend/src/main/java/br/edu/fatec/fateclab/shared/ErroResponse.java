package br.edu.fatec.fateclab.shared;

/** Corpo de erro padrão da API, conforme o schema ErroResponse em docs/api.md. */
public record ErroResponse(String mensagem) {}
