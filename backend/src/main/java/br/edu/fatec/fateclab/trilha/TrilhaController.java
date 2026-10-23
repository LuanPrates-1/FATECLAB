package br.edu.fatec.fateclab.trilha;

import br.edu.fatec.fateclab.trilha.dto.TrilhaDetalheResponse;
import br.edu.fatec.fateclab.trilha.dto.TrilhaResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** GET /trilhas e GET /trilhas/{trilhaId}, per contracts/openapi.yaml. Exige autenticação (FR-004). */
@RestController
@RequestMapping("/api/trilhas")
public class TrilhaController {

    private final TrilhaService trilhaService;

    public TrilhaController(TrilhaService trilhaService) {
        this.trilhaService = trilhaService;
    }

    @GetMapping
    public List<TrilhaResponse> listar(
            @RequestParam(required = false) String area,
            @RequestParam(required = false) NivelTrilha nivel) {
        return trilhaService.listar(area, nivel).stream().map(TrilhaResponse::de).toList();
    }

    @GetMapping("/{trilhaId}")
    public TrilhaDetalheResponse detalhar(@PathVariable Long trilhaId) {
        return TrilhaDetalheResponse.de(trilhaService.buscarPorId(trilhaId));
    }
}
