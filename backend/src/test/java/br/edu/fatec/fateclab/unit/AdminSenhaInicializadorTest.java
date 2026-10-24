package br.edu.fatec.fateclab.unit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import br.edu.fatec.fateclab.auth.AdminSenhaInicializador;
import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

/** A senha pública do administrador de demonstração é trocada pela variável de ambiente. */
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AdminSenhaInicializadorTest {

    private static final String EMAIL = "admin.inicial@fatec.sp.gov.br";

    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    private void criarAdmin() {
        usuarioRepository.save(
                Usuario.builder()
                        .nome("Admin")
                        .email(EMAIL)
                        .senhaHash(passwordEncoder.encode("admin1234"))
                        .papel(PapelUsuario.ADMINISTRADOR)
                        .build());
    }

    private String senhaHashAtual() {
        return usuarioRepository.findByEmail(EMAIL).orElseThrow().getSenhaHash();
    }

    @Test
    void deveTrocarASenhaQuandoAVariavelEstaDefinida() {
        criarAdmin();

        new AdminSenhaInicializador(usuarioRepository, passwordEncoder, EMAIL, "senha-forte-de-producao")
                .run(null);

        assertThat(passwordEncoder.matches("senha-forte-de-producao", senhaHashAtual())).isTrue();
        assertThat(passwordEncoder.matches("admin1234", senhaHashAtual())).isFalse();
    }

    @Test
    void naoDeveMudarNadaSemAVariavel() {
        criarAdmin();

        new AdminSenhaInicializador(usuarioRepository, passwordEncoder, EMAIL, "").run(null);

        assertThat(passwordEncoder.matches("admin1234", senhaHashAtual())).isTrue();
    }

    @Test
    void deveRecusarSenhaCurta() {
        criarAdmin();
        var inicializador = new AdminSenhaInicializador(usuarioRepository, passwordEncoder, EMAIL, "curta");

        assertThatThrownBy(() -> inicializador.run(null)).isInstanceOf(IllegalStateException.class);
    }
}
