package br.edu.fatec.fateclab.auth.dto;

import br.edu.fatec.fateclab.auth.PapelUsuario;
import br.edu.fatec.fateclab.auth.Usuario;

public record AlunoPerfilResponse(
        Long id, String nome, PapelUsuario papel, String apelido, Integer xpTotal) {

    public static AlunoPerfilResponse de(Usuario usuario) {
        return new AlunoPerfilResponse(
                usuario.getId(),
                usuario.getNome(),
                usuario.getPapel(),
                usuario.getApelido(),
                usuario.getXpTotal());
    }
}
