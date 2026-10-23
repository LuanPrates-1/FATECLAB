package br.edu.fatec.fateclab.quiz;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.config.AuthenticatedUser;
import br.edu.fatec.fateclab.gamificacao.Nivel;
import br.edu.fatec.fateclab.progresso.ProgressoAluno;
import br.edu.fatec.fateclab.progresso.ProgressoAlunoRepository;
import br.edu.fatec.fateclab.progresso.ProgressoService;
import br.edu.fatec.fateclab.progresso.ResultadoQuiz;
import br.edu.fatec.fateclab.progresso.StatusProgresso;
import br.edu.fatec.fateclab.progresso.dto.ProgressoResponse;
import br.edu.fatec.fateclab.quiz.dto.LicaoResponse;
import br.edu.fatec.fateclab.quiz.dto.ResponderQuizRequest;
import br.edu.fatec.fateclab.quiz.dto.ResultadoQuizResponse;
import br.edu.fatec.fateclab.quiz.dto.VerificacaoResponse;
import br.edu.fatec.fateclab.shared.ConflitoException;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.ModuloRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lições e quizzes dos módulos (RF19 a RF22). O aluno precisa acertar cerca de 70% das questões
 * (arredondado) para concluir o módulo; acertando todas, ganha 20% de XP de bônus. A correção é sempre feita no
 * servidor: as alternativas corretas só são reveladas depois da resposta.
 */
@Service
public class QuizService {

    private static final Logger log = LoggerFactory.getLogger(QuizService.class);

    static final double PERCENTUAL_APROVACAO = 0.7;
    static final double PERCENTUAL_BONUS_GABARITO = 0.2;

    private final ModuloRepository moduloRepository;
    private final QuestaoRepository questaoRepository;
    private final ProgressoAlunoRepository progressoAlunoRepository;
    private final ProgressoService progressoService;

    public QuizService(
            ModuloRepository moduloRepository,
            QuestaoRepository questaoRepository,
            ProgressoAlunoRepository progressoAlunoRepository,
            ProgressoService progressoService) {
        this.moduloRepository = moduloRepository;
        this.questaoRepository = questaoRepository;
        this.progressoAlunoRepository = progressoAlunoRepository;
        this.progressoService = progressoService;
    }

    /**
     * Menor número de acertos que aprova: 70% do total, arredondado para o inteiro mais próximo
     * (2 de 3, 3 de 4, 4 de 5) e nunca menos que 1.
     */
    public static int minimoParaAprovacao(int totalQuestoes) {
        return Math.max(1, (int) Math.round(totalQuestoes * PERCENTUAL_APROVACAO));
    }

    public static int bonusGabarito(int xpModulo) {
        return (int) Math.round(xpModulo * PERCENTUAL_BONUS_GABARITO);
    }

    @Transactional(readOnly = true)
    public LicaoResponse buscarLicao(AuthenticatedUser usuario, Long trilhaId, Long moduloId) {
        Modulo modulo = buscarModulo(trilhaId, moduloId);
        if (usuario.papel() != PapelUsuario.ADMINISTRADOR) {
            garantirModuloLiberado(usuario.id(), modulo);
        }
        return LicaoResponse.de(modulo, minimoParaAprovacao(modulo.getQuestoes().size()));
    }

    @Transactional(readOnly = true)
    public VerificacaoResponse verificar(
            AuthenticatedUser usuario, Long trilhaId, Long moduloId, Long questaoId, Long alternativaId) {
        Modulo modulo = buscarModulo(trilhaId, moduloId);
        if (usuario.papel() != PapelUsuario.ADMINISTRADOR) {
            garantirModuloLiberado(usuario.id(), modulo);
        }
        Questao questao =
                questaoRepository
                        .findById(questaoId)
                        .filter(q -> q.getModulo().getId().equals(modulo.getId()))
                        .orElseThrow(
                                () -> new RecursoNaoEncontradoException("Questão não encontrada"));
        return corrigir(questao, alternativaId);
    }

    @Transactional
    public ResultadoQuizResponse responder(
            Long alunoId, Long trilhaId, Long moduloId, ResponderQuizRequest request) {
        Modulo modulo = buscarModulo(trilhaId, moduloId);
        List<Questao> questoes = modulo.getQuestoes();
        if (questoes.isEmpty()) {
            throw new ConflitoException("Este módulo não possui quiz");
        }

        ProgressoAluno progresso = progressoService.buscarProgresso(alunoId, trilhaId);
        if (progresso.getModuloAtual() == null
                || !progresso.getModuloAtual().getId().equals(moduloId)) {
            throw new ConflitoException(
                    "Conclua os módulos em ordem: este não é o módulo atual da trilha");
        }

        Map<Long, Long> respostas =
                request.respostas().stream()
                        .collect(
                                Collectors.toMap(
                                        ResponderQuizRequest.Resposta::questaoId,
                                        ResponderQuizRequest.Resposta::alternativaId,
                                        (primeira, segunda) -> segunda));

        List<VerificacaoResponse> correcao = new ArrayList<>();
        int acertos = 0;
        for (Questao questao : questoes) {
            VerificacaoResponse verificacao = corrigir(questao, respostas.get(questao.getId()));
            if (verificacao.correta()) {
                acertos++;
            }
            correcao.add(verificacao);
        }

        int total = questoes.size();
        int minimo = minimoParaAprovacao(total);
        boolean aprovado = acertos >= minimo;
        Usuario aluno = progresso.getAluno();
        int nivelAntes = Nivel.calcular(aluno.getXpTotal());

        int xpGanho = 0;
        int bonus = 0;
        if (aprovado) {
            bonus = acertos == total ? bonusGabarito(modulo.getXpConcedido()) : 0;
            xpGanho = modulo.getXpConcedido() + bonus;
            progresso =
                    progressoService.concluirModulo(
                            alunoId, trilhaId, moduloId, new ResultadoQuiz(acertos, total, bonus));
            aluno = progresso.getAluno();
        }

        log.info(
                "Quiz respondido: alunoId={}, moduloId={}, acertos={}/{}, aprovado={}",
                alunoId,
                moduloId,
                acertos,
                total,
                aprovado);

        return new ResultadoQuizResponse(
                aprovado,
                acertos,
                total,
                minimo,
                xpGanho,
                bonus,
                Nivel.calcular(aluno.getXpTotal()) > nivelAntes,
                correcao,
                ProgressoResponse.de(progresso),
                AlunoPerfilResponse.de(aluno));
    }

    /** Impede concluir "no clique" um módulo que tem quiz. */
    @Transactional(readOnly = true)
    public void garantirModuloSemQuiz(Long trilhaId, Long moduloId) {
        Modulo modulo = buscarModulo(trilhaId, moduloId);
        if (!modulo.getQuestoes().isEmpty()) {
            throw new ConflitoException(
                    "Este módulo tem quiz: responda às questões para concluí-lo");
        }
    }

    private VerificacaoResponse corrigir(Questao questao, Long alternativaEscolhidaId) {
        Long corretaId = questao.alternativaCorreta().map(Alternativa::getId).orElse(null);
        boolean acertou = corretaId != null && corretaId.equals(alternativaEscolhidaId);
        return new VerificacaoResponse(questao.getId(), acertou, corretaId, questao.getExplicacao());
    }

    private Modulo buscarModulo(Long trilhaId, Long moduloId) {
        return moduloRepository
                .findById(moduloId)
                .filter(m -> m.getTrilha().getId().equals(trilhaId) && m.getTrilha().isAtiva())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Módulo não encontrado"));
    }

    private void garantirModuloLiberado(Long alunoId, Modulo modulo) {
        ProgressoAluno progresso =
                progressoAlunoRepository
                        .findByAlunoIdAndTrilhaId(alunoId, modulo.getTrilha().getId())
                        .orElseThrow(
                                () ->
                                        new ConflitoException(
                                                "Inicie a trilha para acessar os módulos"));
        if (progresso.getStatus() == StatusProgresso.CONCLUIDA) {
            return;
        }
        Modulo atual = progresso.getModuloAtual();
        if (atual == null || modulo.getOrdem() > atual.getOrdem()) {
            throw new ConflitoException("Módulo bloqueado: conclua os módulos anteriores");
        }
    }
}
