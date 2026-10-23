package br.edu.fatec.fateclab.auth;

import br.edu.fatec.fateclab.auth.dto.AlunoPerfilResponse;
import br.edu.fatec.fateclab.auth.dto.AtualizarApelidoRequest;
import br.edu.fatec.fateclab.auth.dto.CadastroAlunoRequest;
import br.edu.fatec.fateclab.auth.dto.LoginRequest;
import br.edu.fatec.fateclab.auth.dto.SessaoResponse;
import br.edu.fatec.fateclab.config.JwtTokenProvider;
import br.edu.fatec.fateclab.shared.ConflitoException;
import br.edu.fatec.fateclab.shared.EntradaInvalidaException;
import br.edu.fatec.fateclab.shared.RecursoNaoEncontradoException;
import java.util.List;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Cadastro (FR-001, FR-002, FR-017) e login (FR-003) de alunos. A validação do domínio
 * institucional é feita aqui, no back-end, nunca apenas no cliente (constituição, "Stack e
 * Restrições Técnicas").
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final List<String> dominiosInstitucionais;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider,
            @Value("${fateclab.auth.dominios-institucionais}") String dominiosInstitucionaisCsv) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.dominiosInstitucionais =
                List.of(dominiosInstitucionaisCsv.toLowerCase(Locale.ROOT).split("\\s*,\\s*"));
    }

    public SessaoResponse cadastrar(CadastroAlunoRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new ConflitoException("E-mail já cadastrado");
        }
        validarDominioInstitucional(request.email());

        Usuario usuario =
                Usuario.builder()
                        .nome(request.nome())
                        .email(request.email())
                        .senhaHash(passwordEncoder.encode(request.senha()))
                        .papel(PapelUsuario.ALUNO)
                        .apelido(gerarApelidoPadrao(request.nome()))
                        .build();
        usuario = usuarioRepository.save(usuario);

        log.info("Novo aluno cadastrado: usuarioId={}", usuario.getId());
        return gerarSessao(usuario);
    }

    public SessaoResponse login(LoginRequest request) {
        Usuario usuario =
                usuarioRepository
                        .findByEmail(request.email())
                        .orElseThrow(() -> new BadCredentialsException("E-mail ou senha inválidos"));

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new BadCredentialsException("E-mail ou senha inválidos");
        }

        log.info("Login efetuado: usuarioId={}", usuario.getId());
        return gerarSessao(usuario);
    }

    private void validarDominioInstitucional(String email) {
        String dominioDoEmail = email.substring(email.indexOf('@') + 1).toLowerCase(Locale.ROOT);
        boolean valido = dominiosInstitucionais.contains(dominioDoEmail);
        if (!valido) {
            throw new EntradaInvalidaException(
                    "E-mail deve pertencer ao domínio institucional da Fatec");
        }
    }

    private SessaoResponse gerarSessao(Usuario usuario) {
        String token = jwtTokenProvider.gerarToken(usuario);
        return new SessaoResponse(token, AlunoPerfilResponse.de(usuario));
    }

    /**
     * FR-018: gera um apelido padrão a partir do primeiro nome quando o aluno ainda não escolheu
     * um; não precisa ser único entre alunos (edge case do spec).
     */
    private String gerarApelidoPadrao(String nomeCompleto) {
        String primeiroNome = nomeCompleto.trim().split("\\s+")[0];
        return primeiroNome.isEmpty() ? "Aluno" : primeiroNome;
    }

    public AlunoPerfilResponse buscarPerfil(Long usuarioId) {
        return AlunoPerfilResponse.de(buscarUsuario(usuarioId));
    }

    public AlunoPerfilResponse atualizarApelido(Long usuarioId, AtualizarApelidoRequest request) {
        Usuario usuario = buscarUsuario(usuarioId);
        usuario.setApelido(request.apelido());
        usuario = usuarioRepository.save(usuario);
        log.info("Apelido atualizado: usuarioId={}", usuarioId);
        return AlunoPerfilResponse.de(usuario);
    }

    private Usuario buscarUsuario(Long usuarioId) {
        return usuarioRepository
                .findById(usuarioId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado"));
    }
}
