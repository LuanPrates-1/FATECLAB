package br.edu.fatec.fateclab.shared;

/** Mapeada pelo GlobalExceptionHandler para HTTP 409 (ex.: e-mail duplicado — RF02). */
public class ConflitoException extends RuntimeException {
    public ConflitoException(String mensagem) {
        super(mensagem);
    }
}
