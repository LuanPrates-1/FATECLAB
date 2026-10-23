package br.edu.fatec.fateclab.ranking;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.ranking.dto.RankingEntryResponse;
import br.edu.fatec.fateclab.ranking.dto.RankingResponse;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Ranking geral de alunos por XP total, com desempate por apelido (FR-011) e destaque do aluno
 * autenticado (FR-012).
 */
@Service
public class RankingService {

    private final UsuarioRepository usuarioRepository;

    public RankingService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public RankingResponse obterRanking(Long alunoAutenticadoId) {
        List<Usuario> alunos =
                usuarioRepository.findByPapelOrderByXpTotalDescApelidoAsc(PapelUsuario.ALUNO);

        List<RankingEntryResponse> entradas = new ArrayList<>();
        int posicao = 1;
        for (Usuario aluno : alunos) {
            entradas.add(
                    new RankingEntryResponse(
                            posicao++,
                            aluno.getApelido(),
                            aluno.getXpTotal(),
                            aluno.getId().equals(alunoAutenticadoId)));
        }
        return new RankingResponse(entradas);
    }
}
