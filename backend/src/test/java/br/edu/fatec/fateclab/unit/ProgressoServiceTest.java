package br.edu.fatec.fateclab.unit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.progresso.ProgressoAluno;
import br.edu.fatec.fateclab.progresso.ProgressoAlunoRepository;
import br.edu.fatec.fateclab.progresso.ProgressoModuloRepository;
import br.edu.fatec.fateclab.progresso.ProgressoService;
import br.edu.fatec.fateclab.progresso.StatusProgresso;
import br.edu.fatec.fateclab.shared.ConflitoException;
import br.edu.fatec.fateclab.trilha.Modulo;
import br.edu.fatec.fateclab.trilha.ModuloRepository;
import br.edu.fatec.fateclab.trilha.TrilhaDeEstudo;
import br.edu.fatec.fateclab.trilha.TrilhaRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 * Testes unitários (sem contexto Spring) da regra de crédito de XP e da liberação sequencial de
 * módulos — a parte mais sensível do domínio (docs/arquitetura.md, "Qualidade").
 */
@ExtendWith(MockitoExtension.class)
class ProgressoServiceTest {

    @Mock private ProgressoAlunoRepository progressoAlunoRepository;
    @Mock private ProgressoModuloRepository progressoModuloRepository;
    @Mock private ModuloRepository moduloRepository;
    @Mock private TrilhaRepository trilhaRepository;
    @Mock private UsuarioRepository usuarioRepository;

    private ProgressoService progressoService;

    @BeforeEach
    void setUp() {
        progressoService =
                new ProgressoService(
                        progressoAlunoRepository,
                        progressoModuloRepository,
                        moduloRepository,
                        trilhaRepository,
                        usuarioRepository);
    }

    @Test
    void concluirModuloCreditaXpNaTrilhaENoTotalDoAluno() {
        Usuario aluno = Usuario.builder().id(1L).papel(PapelUsuario.ALUNO).xpTotal(5).build();
        TrilhaDeEstudo trilha = TrilhaDeEstudo.builder().id(10L).build();
        Modulo moduloAtual = Modulo.builder().id(100L).ordem(1).xpConcedido(15).trilha(trilha).build();
        ProgressoAluno progresso =
                ProgressoAluno.builder()
                        .aluno(aluno)
                        .trilha(trilha)
                        .status(StatusProgresso.EM_ANDAMENTO)
                        .moduloAtual(moduloAtual)
                        .xpObtidoNaTrilha(0)
                        .build();

        when(progressoAlunoRepository.findByAlunoIdAndTrilhaId(1L, 10L)).thenReturn(Optional.of(progresso));
        when(moduloRepository.findFirstByTrilhaIdAndOrdemGreaterThanOrderByOrdemAsc(10L, 1)).thenReturn(Optional.empty());
        when(progressoAlunoRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        ProgressoAluno resultado = progressoService.concluirModulo(1L, 10L, 100L);

        assertThat(resultado.getXpObtidoNaTrilha()).isEqualTo(15);
        assertThat(aluno.getXpTotal()).isEqualTo(20);
        assertThat(resultado.getStatus()).isEqualTo(StatusProgresso.CONCLUIDA);
        assertThat(resultado.getModuloAtual()).isNull();
    }

    @Test
    void concluirModuloLiberaOProximoQuandoHaMaisModulosNaTrilha() {
        Usuario aluno = Usuario.builder().id(2L).papel(PapelUsuario.ALUNO).xpTotal(0).build();
        TrilhaDeEstudo trilha = TrilhaDeEstudo.builder().id(20L).build();
        Modulo moduloAtual = Modulo.builder().id(200L).ordem(1).xpConcedido(10).trilha(trilha).build();
        Modulo proximoModulo = Modulo.builder().id(201L).ordem(2).xpConcedido(10).trilha(trilha).build();
        ProgressoAluno progresso =
                ProgressoAluno.builder()
                        .aluno(aluno)
                        .trilha(trilha)
                        .status(StatusProgresso.EM_ANDAMENTO)
                        .moduloAtual(moduloAtual)
                        .xpObtidoNaTrilha(0)
                        .build();

        when(progressoAlunoRepository.findByAlunoIdAndTrilhaId(2L, 20L)).thenReturn(Optional.of(progresso));
        when(moduloRepository.findFirstByTrilhaIdAndOrdemGreaterThanOrderByOrdemAsc(20L, 1)).thenReturn(Optional.of(proximoModulo));
        when(progressoAlunoRepository.save(any())).thenAnswer(invocation -> invocation.getArgument(0));

        ProgressoAluno resultado = progressoService.concluirModulo(2L, 20L, 200L);

        assertThat(resultado.getStatus()).isEqualTo(StatusProgresso.EM_ANDAMENTO);
        assertThat(resultado.getModuloAtual()).isEqualTo(proximoModulo);
    }

    @Test
    void rejeitaConclusaoDeModuloQueNaoEODoAtual() {
        Usuario aluno = Usuario.builder().id(3L).papel(PapelUsuario.ALUNO).xpTotal(0).build();
        TrilhaDeEstudo trilha = TrilhaDeEstudo.builder().id(30L).build();
        Modulo moduloAtual = Modulo.builder().id(300L).ordem(1).xpConcedido(10).trilha(trilha).build();
        ProgressoAluno progresso =
                ProgressoAluno.builder()
                        .aluno(aluno)
                        .trilha(trilha)
                        .status(StatusProgresso.EM_ANDAMENTO)
                        .moduloAtual(moduloAtual)
                        .xpObtidoNaTrilha(0)
                        .build();

        when(progressoAlunoRepository.findByAlunoIdAndTrilhaId(3L, 30L)).thenReturn(Optional.of(progresso));

        assertThatThrownBy(() -> progressoService.concluirModulo(3L, 30L, 999L))
                .isInstanceOf(ConflitoException.class);
    }
}
