package br.edu.fatec.fateclab.unit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.auth.UsuarioRepository;
import br.edu.fatec.fateclab.ranking.RankingService;
import br.edu.fatec.fateclab.ranking.dto.RankingResponse;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

/** Testes unitários do critério de desempate e da posição/destaque do ranking (FR-011, FR-012). */
@ExtendWith(MockitoExtension.class)
class RankingServiceTest {

    @Mock private UsuarioRepository usuarioRepository;

    @Test
    void atribuiPosicoesSequenciaisEDestacaOAlunoAutenticado() {
        Usuario primeiro = Usuario.builder().id(1L).apelido("bravo").xpTotal(100).papel(PapelUsuario.ALUNO).build();
        Usuario segundo = Usuario.builder().id(2L).apelido("charlie").xpTotal(50).papel(PapelUsuario.ALUNO).build();

        // O repositório já entrega ordenado (findByPapelOrderByXpTotalDescApelidoAsc); o service
        // não reordena — este teste garante que ele apenas numera e marca ehVoce corretamente.
        when(usuarioRepository.findByPapelOrderByXpTotalDescApelidoAsc(PapelUsuario.ALUNO))
                .thenReturn(List.of(primeiro, segundo));

        RankingService rankingService = new RankingService(usuarioRepository);
        RankingResponse resposta = rankingService.obterRanking(2L);

        assertThat(resposta.entradas()).hasSize(2);
        assertThat(resposta.entradas().get(0).posicao()).isEqualTo(1);
        assertThat(resposta.entradas().get(0).apelido()).isEqualTo("bravo");
        assertThat(resposta.entradas().get(0).ehVoce()).isFalse();
        assertThat(resposta.entradas().get(1).posicao()).isEqualTo(2);
        assertThat(resposta.entradas().get(1).ehVoce()).isTrue();
    }
}
