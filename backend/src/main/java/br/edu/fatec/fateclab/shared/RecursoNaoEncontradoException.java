package br.edu.fatec.fateclab.shared;

/** Mapeada pelo GlobalExceptionHandler para HTTP 404. */
public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
