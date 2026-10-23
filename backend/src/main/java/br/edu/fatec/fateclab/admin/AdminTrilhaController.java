package br.edu.fatec.fateclab.admin;

import br.edu.fatec.fateclab.admin.dto.CriarTrilhaRequest;
import br.edu.fatec.fateclab.trilha.dto.TrilhaDetalheResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * POST/PUT/DELETE /admin/trilhas, per contracts/openapi.yaml. Acesso restrito a
 * ROLE_ADMINISTRADOR pelo SecurityConfig (FR-015).
 */
@RestController
@RequestMapping("/api/admin/trilhas")
public class AdminTrilhaController {

    private final AdminTrilhaService adminTrilhaService;

    public AdminTrilhaController(AdminTrilhaService adminTrilhaService) {
        this.adminTrilhaService = adminTrilhaService;
    }

    @PostMapping
    public ResponseEntity<TrilhaDetalheResponse> criar(@Valid @RequestBody CriarTrilhaRequest request) {
        var trilha = adminTrilhaService.criar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(TrilhaDetalheResponse.de(trilha));
    }

    @PutMapping("/{trilhaId}")
    public TrilhaDetalheResponse editar(
            @PathVariable Long trilhaId, @Valid @RequestBody CriarTrilhaRequest request) {
        return TrilhaDetalheResponse.de(adminTrilhaService.editar(trilhaId, request));
    }

    @DeleteMapping("/{trilhaId}")
    public ResponseEntity<Void> remover(@PathVariable Long trilhaId) {
        adminTrilhaService.remover(trilhaId);
        return ResponseEntity.noContent().build();
    }
}
