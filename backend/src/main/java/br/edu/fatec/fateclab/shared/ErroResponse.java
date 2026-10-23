package br.edu.fatec.fateclab.shared;

/** Corpo de erro padrão da API, conforme o schema ErroResponse em contracts/openapi.yaml. */
public record ErroResponse(String mensagem) {}
