package br.edu.fatec.fateclab.quiz;

import br.edu.fatec.fateclab.trilha.Modulo;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Questão de múltipla escolha do quiz de um módulo; exatamente uma alternativa é correta. */
@Entity
@Table(name = "questao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Questao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "modulo_id", nullable = false)
    private Modulo modulo;

    @Column(nullable = false)
    private Integer ordem;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String enunciado;

    /** Mostrada ao aluno depois que ele responde, certo ou errado. */
    @Column(columnDefinition = "TEXT")
    private String explicacao;

    @OneToMany(mappedBy = "questao", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("ordem ASC")
    @Builder.Default
    private List<Alternativa> alternativas = new ArrayList<>();

    public Optional<Alternativa> alternativaCorreta() {
        return alternativas.stream().filter(Alternativa::isCorreta).findFirst();
    }
}
