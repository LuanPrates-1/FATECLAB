package br.edu.fatec.fateclab.progresso;

import br.edu.fatec.fateclab.trilha.Modulo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
 * docs/modelo-de-dados.md, "ProgressoModulo": registra quais módulos específicos um aluno já concluiu
 * (par progressoAlunoId+moduloId único), suportando a regra de não pular etapas.
 */
@Entity
@Table(
        name = "progresso_modulo",
        uniqueConstraints = @UniqueConstraint(columnNames = {"progresso_aluno_id", "modulo_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressoModulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progresso_aluno_id", nullable = false)
    private ProgressoAluno progressoAluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modulo_id", nullable = false)
    private Modulo modulo;

    @Column(name = "concluido_em", nullable = false)
    @Builder.Default
    private Instant concluidoEm = Instant.now();

    /** Acertos no quiz que concluiu o módulo; nulo quando o módulo não tem quiz. */
    private Integer acertos;

    @Column(name = "total_questoes")
    private Integer totalQuestoes;
}
