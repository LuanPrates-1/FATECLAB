package br.edu.fatec.fateclab.trilha;

import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import br.edu.fatec.fateclab.trilha.dto.TrilhaDetalheResponse;
import br.edu.fatec.fateclab.trilha.dto.TrilhaResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Listagem/filtro e detalhe de trilhas ativas. A conversão para DTO acontece dentro da transação
 * porque módulos e questões são carregados sob demanda (LAZY) e {@code open-in-view} está
 * desligado.
 */
@Service
public class TrilhaService {

    private final TrilhaRepository trilhaRepository;

    public TrilhaService(TrilhaRepository trilhaRepository) {
        this.trilhaRepository = trilhaRepository;
    }

    @Transactional(readOnly = true)
    public List<TrilhaResponse> listar(String area, NivelTrilha nivel) {
        return buscarAtivas(area, nivel).stream().map(TrilhaResponse::de).toList();
    }

    @Transactional(readOnly = true)
    public TrilhaDetalheResponse detalhar(Long id) {
        return TrilhaDetalheResponse.de(buscarPorId(id));
    }

    public TrilhaDeEstudo buscarPorId(Long id) {
        return trilhaRepository
                .findByIdAndAtivaTrue(id)
                .orElseThrow(
                        () -> new RecursoNaoEncontradoException("Trilha não encontrada ou inativa"));
    }

    private List<TrilhaDeEstudo> buscarAtivas(String area, NivelTrilha nivel) {
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
}
