package br.edu.fatec.fateclab.trilha;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** docs/modelo-de-dados.md, "TrilhaDeEstudo": conjunto de conteúdo por área/nível, com módulos ordenados. */
@Entity
@Table(name = "trilha_de_estudo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrilhaDeEstudo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String area;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private NivelTrilha nivel;

    /** Resumo exibido no cartão da trilha. */
    @Column(length = 500)
    private String descricao;

    /**
     * {@code false} quando o administrador remove a trilha (edge case: alunos podem já ter
     * progresso registrado nela) — trilhas inativas somem da listagem de alunos (RF06) mas o
     * histórico de progresso é preservado.
     */
    @Column(nullable = false)
    @Builder.Default
    private boolean ativa = true;

    @Column(name = "criada_em", nullable = false)
    @Builder.Default
    private Instant criadaEm = Instant.now();

    @Column(name = "atualizada_em", nullable = false)
    @Builder.Default
    private Instant atualizadaEm = Instant.now();

    @OneToMany(mappedBy = "trilha", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("ordem ASC")
    @Builder.Default
    private List<Modulo> modulos = new ArrayList<>();
}
