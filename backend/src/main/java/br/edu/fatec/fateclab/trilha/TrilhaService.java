package br.edu.fatec.fateclab.trilha;

import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import java.util.List;
import org.springframework.stereotype.Service;

/** Listagem/filtro (FR-006) e detalhe (FR-007) de trilhas ativas. */
@Service
public class TrilhaService {

    private final TrilhaRepository trilhaRepository;

    public TrilhaService(TrilhaRepository trilhaRepository) {
        this.trilhaRepository = trilhaRepository;
    }

    public List<TrilhaDeEstudo> listar(String area, NivelTrilha nivel) {
        boolean temArea = area != null && !area.isBlank();
        boolean temNivel = nivel != null;

        if (temArea && temNivel) {
            return trilhaRepository.findByAtivaTrueAndAreaAndNivel(area, nivel);
        }
        if (temArea) {
            return trilhaRepository.findByAtivaTrueAndArea(area);
        }
        if (temNivel) {
            return trilhaRepository.findByAtivaTrueAndNivel(nivel);
        }
        return trilhaRepository.findByAtivaTrue();
    }

    public TrilhaDeEstudo buscarPorId(Long id) {
        return trilhaRepository
                .findByIdAndAtivaTrue(id)
                .orElseThrow(
                        () -> new RecursoNaoEncontradoException("Trilha não encontrada ou inativa"));
    }
}
