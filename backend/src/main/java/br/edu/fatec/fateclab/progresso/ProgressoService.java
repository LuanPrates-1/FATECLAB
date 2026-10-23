package br.edu.fatec.fateclab.progresso;

import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.gamificacao.Relogio;
import br.edu.fatec.fateclab.shared.ConflitoException;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.ModuloRepository;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Inicia trilhas, credita XP ao concluir módulos em ordem (RF09, RF10), atualiza a ofensiva do
 * aluno e mantém o {@code xpTotal} denormalizado para leitura rápida do ranking.
 */
@Service
public class ProgressoService {

    private static final Logger log = LoggerFactory.getLogger(ProgressoService.class);

    private final ProgressoAlunoRepository progressoAlunoRepository;
    private final ProgressoModuloRepository progressoModuloRepository;
    private final ModuloRepository moduloRepository;
    private final TrilhaRepository trilhaRepository;
    private final UsuarioRepository usuarioRepository;

    public ProgressoService(
            ProgressoAlunoRepository progressoAlunoRepository,
            ProgressoModuloRepository progressoModuloRepository,
            ModuloRepository moduloRepository,
            TrilhaRepository trilhaRepository,
            UsuarioRepository usuarioRepository) {
        this.progressoAlunoRepository = progressoAlunoRepository;
        this.progressoModuloRepository = progressoModuloRepository;
        this.moduloRepository = moduloRepository;
        this.trilhaRepository = trilhaRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public ProgressoAluno iniciar(Long alunoId, Long trilhaId) {
        var existente = progressoAlunoRepository.findByAlunoIdAndTrilhaId(alunoId, trilhaId);
        if (existente.isPresent()) {
            return existente.get();
        }

        Usuario aluno = buscarAluno(alunoId);
        TrilhaDeEstudo trilha =
                trilhaRepository
                        .findByIdAndAtivaTrue(trilhaId)
                        .orElseThrow(
                                () -> new RecursoNaoEncontradoException("Trilha não encontrada ou inativa"));
        Modulo primeiroModulo =
                moduloRepository
                        .findFirstByTrilhaIdOrderByOrdemAsc(trilhaId)
                        .orElseThrow(() -> new RecursoNaoEncontradoException("Trilha sem módulos"));

        ProgressoAluno progresso =
                ProgressoAluno.builder()
                        .aluno(aluno)
                        .trilha(trilha)
                        .status(StatusProgresso.EM_ANDAMENTO)
                        .moduloAtual(primeiroModulo)
                        .xpObtidoNaTrilha(0)
                        .build();

        progresso = progressoAlunoRepository.save(progresso);
        log.info("Trilha iniciada: alunoId={}, trilhaId={}", alunoId, trilhaId);
        return progresso;
    }

    /** Conclusão de módulo sem quiz (somente leitura da lição). */
    @Transactional
    public ProgressoAluno concluirModulo(Long alunoId, Long trilhaId, Long moduloId) {
        return concluirModulo(alunoId, trilhaId, moduloId, null);
    }

    /**
     * Conclui o módulo atual da trilha e credita o XP do módulo, mais o bônus de gabarito quando
     * houver. {@code resultado} é nulo para módulos sem quiz.
     */
    @Transactional
    public ProgressoAluno concluirModulo(
            Long alunoId, Long trilhaId, Long moduloId, ResultadoQuiz resultado) {
        ProgressoAluno progresso = buscarProgresso(alunoId, trilhaId);

        Modulo moduloAtual = progresso.getModuloAtual();
        if (moduloAtual == null || !moduloAtual.getId().equals(moduloId)) {
            throw new ConflitoException(
                    "Conclua os módulos em ordem: este não é o módulo atual da trilha");
        }

        ProgressoModulo.ProgressoModuloBuilder registro =
                ProgressoModulo.builder().progressoAluno(progresso).modulo(moduloAtual);
        if (resultado != null) {
            registro.acertos(resultado.acertos()).totalQuestoes(resultado.totalQuestoes());
        }
        progressoModuloRepository.save(registro.build());

        int bonus = resultado != null ? resultado.bonusXp() : 0;
        int xpConcedido = moduloAtual.getXpConcedido() + bonus;
        progresso.setXpObtidoNaTrilha(progresso.getXpObtidoNaTrilha() + xpConcedido);

        Usuario aluno = progresso.getAluno();
        aluno.setXpTotal(aluno.getXpTotal() + xpConcedido);
        aluno.registrarAtividade(Relogio.hoje());
        usuarioRepository.save(aluno);

        var proximoModulo =
                moduloRepository.findFirstByTrilhaIdAndOrdemGreaterThanOrderByOrdemAsc(
                        trilhaId, moduloAtual.getOrdem());
        if (proximoModulo.isPresent()) {
            progresso.setModuloAtual(proximoModulo.get());
        } else {
            progresso.setStatus(StatusProgresso.CONCLUIDA);
            progresso.setModuloAtual(null);
        }
        progresso.setAtualizadoEm(Instant.now());

        progresso = progressoAlunoRepository.save(progresso);
        log.info(
                "Módulo concluído: alunoId={}, trilhaId={}, moduloId={}, xpConcedido={}",
                alunoId,
                trilhaId,
                moduloId,
                xpConcedido);
        return progresso;
    }

    public ProgressoAluno buscarProgresso(Long alunoId, Long trilhaId) {
        return progressoAlunoRepository
                .findByAlunoIdAndTrilhaId(alunoId, trilhaId)
                .orElseThrow(
                        () ->
                                new RecursoNaoEncontradoException(
                                        "Trilha ainda não iniciada por este aluno"));
    }

    public List<ProgressoAluno> listarProgressoDoAluno(Long alunoId) {
        return progressoAlunoRepository.findByAlunoId(alunoId);
    }

    private Usuario buscarAluno(Long alunoId) {
        return usuarioRepository
                .findById(alunoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Aluno não encontrado"));
    }
}
