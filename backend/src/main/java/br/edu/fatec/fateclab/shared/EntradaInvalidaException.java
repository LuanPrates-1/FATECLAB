package br.edu.fatec.fateclab.shared;

/** Mapeada pelo GlobalExceptionHandler para HTTP 422 (ex.: e-mail fora do domínio — FR-017). */
public class EntradaInvalidaException extends RuntimeException {
    public EntradaInvalidaException(String mensagem) {
        super(mensagem);
    }
}
