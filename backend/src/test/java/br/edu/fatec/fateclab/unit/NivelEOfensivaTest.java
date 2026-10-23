package br.edu.fatec.fateclab.unit;

import static org.assertj.core.api.Assertions.assertThat;

import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.gamificacao.Nivel;
import br.edu.fatec.fateclab.quiz.QuizService;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;

/** Regras de gamificação puras: curva de níveis, ofensiva e mínimo de aprovação do quiz. */
class NivelEOfensivaTest {

    private static final LocalDate HOJE = LocalDate.of(2026, 11, 10);

    @Test
    void curvaDeNiveisCresce100XpPorNivel() {
        assertThat(Nivel.xpInicial(1)).isZero();
        assertThat(Nivel.xpInicial(2)).isEqualTo(100);
        assertThat(Nivel.xpInicial(3)).isEqualTo(300);
        assertThat(Nivel.xpInicial(5)).isEqualTo(1000);
        assertThat(Nivel.calcular(0)).isEqualTo(1);
        assertThat(Nivel.calcular(99)).isEqualTo(1);
        assertThat(Nivel.calcular(100)).isEqualTo(2);
        assertThat(Nivel.calcular(1340)).isEqualTo(5);
        assertThat(Nivel.info(140)).isEqualTo(new Nivel.Info(2, 100, 300));
    }

    @Test
    void ofensivaSomaDiasSeguidosEReiniciaAposFalta() {
        Usuario aluno = Usuario.builder().build();

        aluno.registrarAtividade(HOJE);
        assertThat(aluno.getOfensivaAtual()).isEqualTo(1);

        aluno.registrarAtividade(HOJE);
        assertThat(aluno.getOfensivaAtual()).as("mesmo dia não conta duas vezes").isEqualTo(1);

        aluno.registrarAtividade(HOJE.plusDays(1));
        aluno.registrarAtividade(HOJE.plusDays(2));
        assertThat(aluno.getOfensivaAtual()).isEqualTo(3);
        assertThat(aluno.getMaiorOfensiva()).isEqualTo(3);

        aluno.registrarAtividade(HOJE.plusDays(5));
        assertThat(aluno.getOfensivaAtual()).isEqualTo(1);
        assertThat(aluno.getMaiorOfensiva()).as("recorde é preservado").isEqualTo(3);
    }

    @Test
    void ofensivaVigenteZeraQuandoOAlunoPulaUmDia() {
        Usuario aluno = Usuario.builder().build();
        aluno.registrarAtividade(HOJE);

        assertThat(aluno.ofensivaVigente(HOJE)).isEqualTo(1);
        assertThat(aluno.ofensivaVigente(HOJE.plusDays(1))).as("ainda pode estudar hoje").isEqualTo(1);
        assertThat(aluno.ofensivaVigente(HOJE.plusDays(2))).isZero();
    }

    @Test
    void minimoParaAprovacaoEh70PorCentoArredondado() {
        assertThat(QuizService.minimoParaAprovacao(1)).isEqualTo(1);
        assertThat(QuizService.minimoParaAprovacao(3)).isEqualTo(2);
        assertThat(QuizService.minimoParaAprovacao(4)).isEqualTo(3);
        assertThat(QuizService.minimoParaAprovacao(5)).isEqualTo(4);
        assertThat(QuizService.minimoParaAprovacao(10)).isEqualTo(7);
        assertThat(QuizService.bonusGabarito(20)).isEqualTo(4);
    }
}
