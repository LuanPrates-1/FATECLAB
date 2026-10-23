package br.edu.fatec.fateclab.perfil;

import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.gamificacao.Conquista;
import br.edu.fatec.fateclab.perfil.dto.ResumoAlunoResponse;
import br.edu.fatec.fateclab.perfil.dto.ResumoAlunoResponse.ConquistaResponse;
import br.edu.fatec.fateclab.perfil.dto.ResumoAlunoResponse.TrilhaIniciada;
import br.edu.fatec.fateclab.progresso.ProgressoAluno;
import br.edu.fatec.fateclab.progresso.ProgressoAlunoRepository;
import br.edu.fatec.fateclab.progresso.ProgressoModuloRepository;
import br.edu.fatec.fateclab.progresso.StatusProgresso;
import br.edu.fatec.fateclab.ranking.RankingService;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Monta o resumo do aluno (RF23) e calcula as conquistas a partir do histórico (RF24). */
@Service
public class PerfilService {

    private final UsuarioRepository usuarioRepository;
    private final ProgressoAlunoRepository progressoAlunoRepository;
    private final ProgressoModuloRepository progressoModuloRepository;
    private final RankingService rankingService;

    public PerfilService(
            UsuarioRepository usuarioRepository,
            ProgressoAlunoRepository progressoAlunoRepository,
            ProgressoModuloRepository progressoModuloRepository,
            RankingService rankingService) {
        this.usuarioRepository = usuarioRepository;
        this.progressoAlunoRepository = progressoAlunoRepository;
        this.progressoModuloRepository = progressoModuloRepository;
        this.rankingService = rankingService;
    }

    @Transactional(readOnly = true)
    public ResumoAlunoResponse resumo(Long alunoId) {
        Usuario aluno =
                usuarioRepository
                        .findById(alunoId)
                        .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));
        AlunoPerfilResponse perfil = AlunoPerfilResponse.de(aluno);

        List<TrilhaIniciada> trilhas = new ArrayList<>();
        long trilhasConcluidas = 0;
        for (ProgressoAluno progresso : progressoAlunoRepository.findByAlunoId(alunoId)) {
            TrilhaDeEstudo trilha = progresso.getTrilha();
            if (progresso.getStatus() == StatusProgresso.CONCLUIDA) {
                trilhasConcluidas++;
            }
            if (!trilha.isAtiva()) {
                continue;
            }
            trilhas.add(
                    new TrilhaIniciada(
                            trilha.getId(),
                            trilha.getTitulo(),
                            trilha.getArea(),
                            trilha.getNivel(),
                            progresso.getStatus(),
                            progressoModuloRepository.countByProgressoAluno_Id(progresso.getId()),
                            trilha.getModulos().size(),
                            progresso.getXpObtidoNaTrilha()));
        }
        // Em andamento primeiro; depois as concluídas.
        trilhas.sort(
                Comparator.comparing((TrilhaIniciada t) -> t.status() == StatusProgresso.CONCLUIDA));

        long modulosConcluidos = progressoModuloRepository.countByProgressoAluno_Aluno_Id(alunoId);
        long gabaritos = progressoModuloRepository.contarGabaritos(alunoId);
        int posicao = rankingService.posicaoDe(alunoId);

        Set<Conquista> desbloqueadas = EnumSet.noneOf(Conquista.class);
        if (modulosConcluidos >= 1) desbloqueadas.add(Conquista.PRIMEIRO_PASSO);
        if (modulosConcluidos >= 10) desbloqueadas.add(Conquista.MARATONISTA);
        if (trilhasConcluidas >= 1) desbloqueadas.add(Conquista.TRILHA_COMPLETA);
        if (gabaritos >= 1) desbloqueadas.add(Conquista.GABARITOU);
        if (perfil.maiorOfensiva() >= 3) desbloqueadas.add(Conquista.EM_CHAMAS);
        if (perfil.maiorOfensiva() >= 7) desbloqueadas.add(Conquista.IMPARAVEL);
        if (posicao >= 1 && posicao <= 3 && perfil.xpTotal() > 0) desbloqueadas.add(Conquista.PODIO);
        if (perfil.nivel() >= 5) desbloqueadas.add(Conquista.VETERANO);

        List<ConquistaResponse> conquistas = new ArrayList<>();
        for (Conquista c : Conquista.values()) {
            conquistas.add(
                    new ConquistaResponse(
                            c.name(), c.getTitulo(), c.getDescricao(), desbloqueadas.contains(c)));
        }

        return new ResumoAlunoResponse(
                perfil,
                posicao,
                rankingService.totalDeAlunos(),
                modulosConcluidos,
                trilhasConcluidas,
                gabaritos,
                trilhas,
                conquistas);
    }
}
