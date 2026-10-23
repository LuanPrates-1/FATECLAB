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
import java.time.LocalDate;
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

    /** Dias seguidos com pelo menos um módulo concluído (ofensiva). */
    @Column(name = "ofensiva_atual", nullable = false)
    @Builder.Default
    private Integer ofensivaAtual = 0;

    @Column(name = "maior_ofensiva", nullable = false)
    @Builder.Default
    private Integer maiorOfensiva = 0;

    /** Último dia (fuso America/Sao_Paulo) em que o aluno concluiu um módulo. */
    @Column(name = "ultima_atividade")
    private LocalDate ultimaAtividade;

    /**
     * Registra estudo no dia informado: mantém a ofensiva se já estudou hoje, soma um dia se
     * estudou ontem e reinicia em 1 se ficou um ou mais dias sem estudar.
     */
    public void registrarAtividade(LocalDate hoje) {
        int atual = ofensivaAtual == null ? 0 : ofensivaAtual;
        if (hoje.equals(ultimaAtividade)) {
            return;
        }
        if (ultimaAtividade != null && ultimaAtividade.plusDays(1).equals(hoje)) {
            atual++;
        } else {
            atual = 1;
        }
        ofensivaAtual = atual;
        maiorOfensiva = Math.max(maiorOfensiva == null ? 0 : maiorOfensiva, atual);
        ultimaAtividade = hoje;
    }

    /** Ofensiva válida hoje: zera se o aluno não estudou nem hoje nem ontem. */
    public int ofensivaVigente(LocalDate hoje) {
        if (ultimaAtividade == null || ofensivaAtual == null) {
            return 0;
        }
        boolean ativa = !ultimaAtividade.isBefore(hoje.minusDays(1));
        return ativa ? ofensivaAtual : 0;
    }
}
