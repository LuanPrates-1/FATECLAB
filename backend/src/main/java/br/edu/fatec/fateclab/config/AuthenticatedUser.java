package br.edu.fatec.fateclab.config;

import br.edu.fatec.fateclab.auth.PapelUsuario;

/** Principal autenticado extraído do JWT (id, e-mail, papel) — usável via {@code @AuthenticationPrincipal}. */
public record AuthenticatedUser(Long id, String email, PapelUsuario papel) {}
