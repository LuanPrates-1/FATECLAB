package br.edu.fatec.fateclab.ranking;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.gamificacao.Nivel;
import br.edu.fatec.fateclab.gamificacao.Relogio;
import br.edu.fatec.fateclab.ranking.dto.RankingEntryResponse;
import br.edu.fatec.fateclab.ranking.dto.RankingResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Ranking geral de alunos por XP total, com desempate por apelido (RF11) e destaque do aluno
 * autenticado (RF12).
 */
@Service
public class RankingService {

    private final UsuarioRepository usuarioRepository;

    public RankingService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public RankingResponse obterRanking(Long alunoAutenticadoId) {
        List<Usuario> alunos = alunosOrdenados();
        LocalDate hoje = Relogio.hoje();

        List<RankingEntryResponse> entradas = new ArrayList<>();
        int posicao = 1;
        for (Usuario aluno : alunos) {
            int xp = aluno.getXpTotal() == null ? 0 : aluno.getXpTotal();
            entradas.add(
                    new RankingEntryResponse(
                            posicao++,
                            aluno.getApelido(),
                            xp,
                            aluno.getId().equals(alunoAutenticadoId),
                            Nivel.calcular(xp),
                            aluno.ofensivaVigente(hoje)));
        }
        return new RankingResponse(entradas);
    }

    /** Posição do aluno no ranking geral (1 = primeiro), ou 0 se ele não aparece. */
    public int posicaoDe(Long alunoId) {
        List<Usuario> alunos = alunosOrdenados();
        for (int i = 0; i < alunos.size(); i++) {
            if (alunos.get(i).getId().equals(alunoId)) {
                return i + 1;
            }
        }
        return 0;
    }

    public int totalDeAlunos() {
        return alunosOrdenados().size();
    }

    private List<Usuario> alunosOrdenados() {
        return usuarioRepository.findByPapelOrderByXpTotalDescApelidoAsc(PapelUsuario.ALUNO);
    }
}
