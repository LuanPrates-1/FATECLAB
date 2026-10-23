package br.edu.fatec.fateclab.admin;

import br.edu.fatec.fateclab.admin.dto.CriarTrilhaRequest;
import br.edu.fatec.fateclab.admin.dto.ModuloRequest;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Criação, edição e remoção (desativação) de trilhas e módulos pelo painel de administração
 * (FR-014, FR-016).
 */
@Service
public class AdminTrilhaService {

    private static final Logger log = LoggerFactory.getLogger(AdminTrilhaService.class);

    private final TrilhaRepository trilhaRepository;

    public AdminTrilhaService(TrilhaRepository trilhaRepository) {
        this.trilhaRepository = trilhaRepository;
    }

    @Transactional
    public TrilhaDeEstudo criar(CriarTrilhaRequest request) {
        TrilhaDeEstudo trilha =
                TrilhaDeEstudo.builder()
                        .titulo(request.titulo())
                        .area(request.area())
                        .nivel(request.nivel())
                        .build();
        trilha.setModulos(paraModulos(request.modulos(), trilha));

        trilha = trilhaRepository.save(trilha);
        log.info("Trilha criada por administrador: trilhaId={}", trilha.getId());
        return trilha;
    }

    @Transactional
    public TrilhaDeEstudo editar(Long trilhaId, CriarTrilhaRequest request) {
        TrilhaDeEstudo trilha = buscarQualquerStatus(trilhaId);

        trilha.setTitulo(request.titulo());
        trilha.setArea(request.area());
        trilha.setNivel(request.nivel());

        trilha.getModulos().clear();
        trilha.getModulos().addAll(paraModulos(request.modulos(), trilha));
        trilha.setAtualizadaEm(Instant.now());

        trilha = trilhaRepository.save(trilha);
        log.info("Trilha editada por administrador: trilhaId={}", trilha.getId());
        return trilha;
    }

    @Transactional
    public void remover(Long trilhaId) {
        TrilhaDeEstudo trilha = buscarQualquerStatus(trilhaId);
        trilha.setAtiva(false);
        trilha.setAtualizadaEm(Instant.now());
        trilhaRepository.save(trilha);
        log.info("Trilha removida (desativada) por administrador: trilhaId={}", trilhaId);
    }

    private List<Modulo> paraModulos(List<ModuloRequest> requests, TrilhaDeEstudo trilha) {
        List<Modulo> modulos = new ArrayList<>();
        for (ModuloRequest m : requests) {
            modulos.add(
                    Modulo.builder()
                            .trilha(trilha)
                            .ordem(m.ordem())
                            .titulo(m.titulo())
                            .xpConcedido(m.xpConcedido())
                            .build());
        }
        return modulos;
    }

    private TrilhaDeEstudo buscarQualquerStatus(Long trilhaId) {
        return trilhaRepository
                .findById(trilhaId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Trilha não encontrada"));
    }
}
