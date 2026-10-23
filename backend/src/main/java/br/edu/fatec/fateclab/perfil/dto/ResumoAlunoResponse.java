package br.edu.fatec.fateclab.perfil.dto;

import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.progresso.StatusProgresso;
import br.edu.fatec.fateclab.trilha.NivelTrilha;
import java.util.List;

/** Painel do aluno: perfil, estatísticas, trilhas iniciadas e conquistas. */
public record ResumoAlunoResponse(
        AlunoPerfilResponse aluno,
        int posicaoRanking,
        int totalAlunos,
        long modulosConcluidos,
        long trilhasConcluidas,
        long quizzesGabaritados,
        List<TrilhaIniciada> trilhas,
        List<ConquistaResponse> conquistas) {

    public record TrilhaIniciada(
            Long trilhaId,
            String titulo,
            String area,
            NivelTrilha nivel,
            StatusProgresso status,
            long modulosConcluidos,
            int totalModulos,
            int xpObtido) {}

    public record ConquistaResponse(
            String codigo, String titulo, String descricao, boolean desbloqueada) {}
}
