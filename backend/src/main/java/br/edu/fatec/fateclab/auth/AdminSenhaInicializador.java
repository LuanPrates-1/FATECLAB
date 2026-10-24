package br.edu.fatec.fateclab.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Troca a senha da conta de administrador dos dados de demonstração (admin1234, publicada no
 * repositório) ao iniciar a aplicação, quando {@code FATECLAB_ADMIN_SENHA} está definida. Sem a
 * variável, nada muda; assim o modo local e os testes continuam com a senha conhecida.
 */
@Component
public class AdminSenhaInicializador implements ApplicationRunner {

    static final int TAMANHO_MINIMO = 12;

    private static final Logger log = LoggerFactory.getLogger(AdminSenhaInicializador.class);

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final String email;
    private final String novaSenha;

    public AdminSenhaInicializador(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            @Value("${fateclab.auth.admin-email:admin@fatec.sp.gov.br}") String email,
            @Value("${fateclab.auth.admin-senha:}") String novaSenha) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.email = email;
        this.novaSenha = novaSenha;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (novaSenha.isBlank()) {
            return;
        }
        if (novaSenha.length() < TAMANHO_MINIMO) {
            throw new IllegalStateException(
                    "FATECLAB_ADMIN_SENHA precisa ter pelo menos " + TAMANHO_MINIMO + " caracteres");
        }
        usuarioRepository
                .findByEmail(email)
                .filter(usuario -> usuario.getPapel() == PapelUsuario.ADMINISTRADOR)
                .ifPresentOrElse(
                        admin -> {
                            if (!passwordEncoder.matches(novaSenha, admin.getSenhaHash())) {
                                admin.setSenhaHash(passwordEncoder.encode(novaSenha));
                                usuarioRepository.save(admin);
                                log.info("Senha do administrador {} atualizada", email);
                            }
                        },
                        () -> log.warn("Administrador {} não encontrado; senha não alterada", email));
    }
}
