package br.edu.fatec.fateclab.progresso;

import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * docs/modelo-de-dados.md, "ProgressoAluno": relação aluno×trilha (par único), com módulo atual, status e
 * XP obtido nessa trilha (RF08, RF10).
 */
@Entity
@Table(
        name = "progresso_aluno",
        uniqueConstraints = @UniqueConstraint(columnNames = {"aluno_id", "trilha_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressoAluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "aluno_id", nullable = false)
    private Usuario aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trilha_id", nullable = false)
    private TrilhaDeEstudo trilha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusProgresso status;

    /** Nulo quando a trilha ainda não foi iniciada ou já foi concluída. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modulo_atual_id")
    private Modulo moduloAtual;

    @Column(name = "xp_obtido_na_trilha", nullable = false)
    @Builder.Default
    private Integer xpObtidoNaTrilha = 0;

    @Column(name = "atualizado_em", nullable = false)
    @Builder.Default
    private Instant atualizadoEm = Instant.now();
}
