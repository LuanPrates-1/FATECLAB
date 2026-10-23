package br.edu.fatec.fateclab.auth.dto;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;
import br.edu.fatec.fateclab.gamificacao.Nivel;
import br.edu.fatec.fateclab.gamificacao.Relogio;

/** Dados públicos do usuário logado, incluindo nível e ofensiva calculados a partir do XP. */
public record AlunoPerfilResponse(
        Long id,
        String nome,
        PapelUsuario papel,
        String apelido,
        Integer xpTotal,
        int nivel,
        int xpInicioNivel,
        int xpProximoNivel,
        int ofensiva,
        int maiorOfensiva) {

    public static AlunoPerfilResponse de(Usuario usuario) {
        int xp = usuario.getXpTotal() == null ? 0 : usuario.getXpTotal();
        Nivel.Info nivel = Nivel.info(xp);
        return new AlunoPerfilResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getPapel(),
                usuario.getApelido(),
                xp,
                nivel.nivel(),
                nivel.xpInicioNivel(),
                nivel.xpProximoNivel(),
                usuario.ofensivaVigente(Relogio.hoje()),
                usuario.getMaiorOfensiva() == null ? 0 : usuario.getMaiorOfensiva());
    }
}
