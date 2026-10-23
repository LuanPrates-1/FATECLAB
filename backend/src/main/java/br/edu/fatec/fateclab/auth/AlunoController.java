package br.edu.fatec.fateclab.auth;

import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.auth.dto.AtualizarApelidoRequest;
import br.edu.fatec.fateclab.config.AuthenticatedUser;
import br.edu.fatec.fateclab.perfil.PerfilService;
import br.edu.fatec.fateclab.perfil.dto.ResumoAlunoResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** GET/PATCH /alunos/me e GET /alunos/me/resumo (RF18, RF23). */
@RestController
@RequestMapping("/api/alunos/me")
public class AlunoController {

    private final AuthService authService;
    private final PerfilService perfilService;

    public AlunoController(AuthService authService, PerfilService perfilService) {
        this.authService = authService;
        this.perfilService = perfilService;
    }

    @GetMapping("/resumo")
    public ResumoAlunoResponse resumo(@AuthenticationPrincipal AuthenticatedUser usuario) {
        return perfilService.resumo(usuario.id());
    }

    @GetMapping
    public AlunoPerfilResponse meuPerfil(@AuthenticationPrincipal AuthenticatedUser usuario) {
        return authService.buscarPerfil(usuario.id());
    }

    @PatchMapping
    public AlunoPerfilResponse atualizarApelido(
            @AuthenticationPrincipal AuthenticatedUser usuario,
            @Valid @RequestBody AtualizarApelidoRequest request) {
        return authService.atualizarApelido(usuario.id(), request);
    }
}
