package br.edu.fatec.fateclab.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Base de autenticação para Aluno e Administrador (data-model.md "Usuario"). O campo {@code
 * papel} distingue o comportamento; {@code apelido} e {@code xpTotal} só têm significado quando
 * {@code papel == ALUNO} (FR-018, research.md §8).
 */
@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    /** Nunca é serializado em resposta de API (constituição, "Stack e Restrições Técnicas"). */
    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PapelUsuario papel;

    /** Apenas para papel=ALUNO; não precisa ser único (edge case do spec). */
    private String apelido;

    /** Apenas para papel=ALUNO; denormalizado para leitura rápida do ranking (research.md §8). */
    @Column(name = "xp_total")
    @Builder.Default
    private Integer xpTotal = 0;

    @Column(name = "criado_em", nullable = false)
    @Builder.Default
    private Instant criadoEm = Instant.now();
}
