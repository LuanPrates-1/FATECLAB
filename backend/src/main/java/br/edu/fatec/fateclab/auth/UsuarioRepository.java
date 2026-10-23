package br.edu.fatec.fateclab.auth;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    /** Ranking geral (FR-011): XP decrescente, desempate por apelido em ordem alfabética. */
    List<Usuario> findByPapelOrderByXpTotalDescApelidoAsc(PapelUsuario papel);
}
