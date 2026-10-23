package br.edu.fatec.fateclab.progresso;

import br.edu.fatec.fateclab.config.AuthenticatedUser;
import br.edu.fatec.fateclab.progresso.dto.ProgressoResponse;
import java.util.List;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * POST /trilhas/{trilhaId}/iniciar, POST /trilhas/{trilhaId}/modulos/{moduloId}/concluir e
 * GET /alunos/me/progresso, per contracts/openapi.yaml.
 */
@RestController
public class ProgressoController {

    private final ProgressoService progressoService;

    public ProgressoController(ProgressoService progressoService) {
        this.progressoService = progressoService;
    }

    @PostMapping("/api/trilhas/{trilhaId}/iniciar")
    public ProgressoResponse iniciar(
            @AuthenticationPrincipal AuthenticatedUser usuario, @PathVariable Long trilhaId) {
        return ProgressoResponse.de(progressoService.iniciar(usuario.id(), trilhaId));
    }

    @PostMapping("/api/trilhas/{trilhaId}/modulos/{moduloId}/concluir")
    public ProgressoResponse concluirModulo(
            @AuthenticationPrincipal AuthenticatedUser usuario,
            @PathVariable Long trilhaId,
            @PathVariable Long moduloId) {
        return ProgressoResponse.de(progressoService.concluirModulo(usuario.id(), trilhaId, moduloId));
    }

    @GetMapping("/api/alunos/me/progresso")
    public List<ProgressoResponse> meuProgresso(@AuthenticationPrincipal AuthenticatedUser usuario) {
        return progressoService.listarProgressoDoAluno(usuario.id()).stream()
                .map(ProgressoResponse::de)
                .toList();
    }
}
