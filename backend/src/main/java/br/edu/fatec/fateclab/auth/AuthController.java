package br.edu.fatec.fateclab.auth;

import br.edu.fatec.fateclab.auth.dto.CadastroAlunoRequest;
import br.edu.fatec.fateclab.auth.dto.LoginRequest;
import br.edu.fatec.fateclab.auth.dto.SessaoResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** POST /auth/cadastro e POST /auth/login, per contracts/openapi.yaml. */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<SessaoResponse> cadastrar(@Valid @RequestBody CadastroAlunoRequest request) {
        SessaoResponse sessao = authService.cadastrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(sessao);
    }

    @PostMapping("/login")
    public ResponseEntity<SessaoResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
