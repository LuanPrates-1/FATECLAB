package br.edu.fatec.fateclab.admin;

import br.edu.fatec.fateclab.admin.dto.AdminTrilhaResponse;
import br.edu.fatec.fateclab.admin.dto.AlternativaRequest;
import br.edu.fatec.fateclab.admin.dto.CriarTrilhaRequest;
import br.edu.fatec.fateclab.admin.dto.ModuloRequest;
import br.edu.fatec.fateclab.admin.dto.QuestaoRequest;
import br.edu.fatec.fateclab.progresso.ProgressoAlunoRepository;
import br.edu.fatec.fateclab.progresso.ProgressoModuloRepository;
import br.edu.fatec.fateclab.quiz.Alternativa;
import br.edu.fatec.fateclab.quiz.Questao;
import br.edu.fatec.fateclab.shared.ConflitoException;
import br.edu.fatec.fateclab.shared.EntradaInvalidaException;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import br.edu.fatec.fateclab.trilha.dto.TrilhaDetalheResponse;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Criação, edição e remoção (desativação) de trilhas, módulos, lições e quizzes pelo painel de
 * administração (RF14 a RF16).
 *
 * <p>Na edição, os módulos são atualizados no lugar, casando pela ordem. Assim o progresso dos
 * alunos (que referencia os módulos) é preservado. Só é possível excluir um módulo que nenhum aluno
 * concluiu nem está cursando.
 */
@Service
public class AdminTrilhaService {

    private static final Logger log = LoggerFactory.getLogger(AdminTrilhaService.class);

    private final TrilhaRepository trilhaRepository;
    private final ProgressoAlunoRepository progressoAlunoRepository;
    private final ProgressoModuloRepository progressoModuloRepository;

    public AdminTrilhaService(
            TrilhaRepository trilhaRepository,
            ProgressoAlunoRepository progressoAlunoRepository,
            ProgressoModuloRepository progressoModuloRepository) {
        this.trilhaRepository = trilhaRepository;
        this.progressoAlunoRepository = progressoAlunoRepository;
        this.progressoModuloRepository = progressoModuloRepository;
    }

    @Transactional(readOnly = true)
    public AdminTrilhaResponse buscar(Long trilhaId) {
        return AdminTrilhaResponse.de(buscarQualquerStatus(trilhaId));
    }

    @Transactional
    public TrilhaDetalheResponse criar(CriarTrilhaRequest request) {
        validarModulos(request.modulos());
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo(request.titulo())
                        .area(request.area())
                        .nivel(request.nivel())
                        .descricao(textoOuNulo(request.descricao()))
                        .build();
        for (ModuloRequest m : request.modulos()) {
            Modulo modulo = Modulo.builder().trilha(trilha).build();
            preencherModulo(modulo, m);
            trilha.getModulos().add(modulo);
        }

        trilha = trilhaRepository.save(trilha);
        log.info("Trilha criada por administrador: trilhaId={}", trilha.getId());
        return TrilhaDetalheResponse.de(trilha);
    }

    @Transactional
    public TrilhaDetalheResponse editar(Long trilhaId, CriarTrilhaRequest request) {
        validarModulos(request.modulos());
        TrilhaDeEstudo trilha = buscarQualquerStatus(trilhaId);

        trilha.setTitulo(request.titulo());
        trilha.setArea(request.area());
        trilha.setNivel(request.nivel());
        trilha.setDescricao(textoOuNulo(request.descricao()));

        Map<Integer, Modulo> existentes =
                trilha.getModulos().stream()
                        .collect(Collectors.toMap(Modulo::getOrdem, Function.identity()));
        Set<Integer> ordensRecebidas =
                request.modulos().stream().map(ModuloRequest::ordem).collect(Collectors.toSet());

        List<Modulo> remover = new ArrayList<>();
        for (Modulo modulo : trilha.getModulos()) {
            if (!ordensRecebidas.contains(modulo.getOrdem())) {
                garantirSemProgresso(modulo);
                remover.add(modulo);
            }
        }
        if (!remover.isEmpty()) {
            trilha.getModulos().removeAll(remover);
        }

        for (ModuloRequest m : request.modulos()) {
            Modulo modulo = existentes.get(m.ordem());
            if (modulo == null) {
                modulo = Modulo.builder().trilha(trilha).build();
                trilha.getModulos().add(modulo);
            }
            preencherModulo(modulo, m);
        }
        trilha.setAtualizadaEm(Instant.now());

        trilha = trilhaRepository.save(trilha);
        log.info("Trilha editada por administrador: trilhaId={}", trilha.getId());
        return TrilhaDetalheResponse.de(trilha);
    }

    @Transactional
    public void remover(Long trilhaId) {
        TrilhaDeEstudo trilha = buscarQualquerStatus(trilhaId);
        trilha.setAtiva(false);
        trilha.setAtualizadaEm(Instant.now());
        trilhaRepository.save(trilha);
        log.info("Trilha removida (desativada) por administrador: trilhaId={}", trilhaId);
    }

    private void preencherModulo(Modulo modulo, ModuloRequest m) {
        modulo.setOrdem(m.ordem());
        modulo.setTitulo(m.titulo());
        modulo.setXpConcedido(m.xpConcedido());
        modulo.setConteudo(textoOuNulo(m.conteudo()));

        modulo.getQuestoes().clear();
        List<QuestaoRequest> questoes = m.questoes() == null ? List.of() : m.questoes();
        int ordemQuestao = 1;
        for (QuestaoRequest q : questoes) {
            Questao questao =
                    Questao.builder()
                            .modulo(modulo)
                            .ordem(ordemQuestao++)
                            .enunciado(q.enunciado())
                            .explicacao(textoOuNulo(q.explicacao()))
                            .build();
            int ordemAlternativa = 1;
            for (AlternativaRequest a : q.alternativas()) {
                questao.getAlternativas()
                        .add(
                                Alternativa.builder()
                                        .questao(questao)
                                        .ordem(ordemAlternativa++)
                                        .texto(a.texto())
                                        .correta(a.correta())
                                        .build());
            }
            modulo.getQuestoes().add(questao);
        }
    }

    private void validarModulos(List<ModuloRequest> modulos) {
        Set<Integer> ordens = new HashSet<>();
        for (ModuloRequest m : modulos) {
            if (!ordens.add(m.ordem())) {
                throw new EntradaInvalidaException("Há mais de um módulo com a ordem " + m.ordem());
            }
            if (m.questoes() == null) {
                continue;
            }
            for (QuestaoRequest q : m.questoes()) {
                long corretas = q.alternativas().stream().filter(AlternativaRequest::correta).count();
                if (corretas != 1) {
                    throw new EntradaInvalidaException(
                            "Cada questão deve ter exatamente uma alternativa correta (módulo \""
                                    + m.titulo()
                                    + "\")");
                }
            }
        }
    }

    private void garantirSemProgresso(Modulo modulo) {
        boolean emUso =
                progressoModuloRepository.existsByModulo_Id(modulo.getId())
                        || progressoAlunoRepository.existsByModuloAtual_Id(modulo.getId());
        if (emUso) {
            throw new ConflitoException(
                    "O módulo \""
                            + modulo.getTitulo()
                            + "\" já tem progresso de alunos e não pode ser excluído");
        }
    }

    private static String textoOuNulo(String texto) {
        return texto == null || texto.isBlank() ? null : texto.trim();
    }

    private TrilhaDeEstudo buscarQualquerStatus(Long trilhaId) {
        return trilhaRepository
                .findById(trilhaId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Trilha não encontrada"));
    }
}
