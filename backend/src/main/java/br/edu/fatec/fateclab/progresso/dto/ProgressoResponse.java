package br.edu.fatec.fateclab.progresso.dto;

import br.edu.fatec.fateclab.progresso.ProgressoAluno;
import br.edu.fatec.fateclab.progresso.StatusProgresso;

public record ProgressoResponse(
        Long trilhaId, StatusProgresso status, Long moduloAtualId, Integer xpObtidoNaTrilha) {

    public static ProgressoResponse de(ProgressoAluno progresso) {
        Long moduloAtualId =
                progresso.getModuloAtual() != null ? progresso.getModuloAtual().getId() : null;
        return new ProgressoResponse(
                progresso.getTrilha().getId(),
                progresso.getStatus(),
                moduloAtualId,
                progresso.getXpObtidoNaTrilha());
    }
}
