package br.edu.fatec.fateclab.gamificacao;

import java.time.LocalDate;
import java.time.ZoneId;

/** Data de referência da ofensiva, sempre no fuso de Campinas (America/Sao_Paulo). */
public final class Relogio {

    public static final ZoneId FUSO = ZoneId.of("America/Sao_Paulo");

    private Relogio() {}

    public static LocalDate hoje() {
        return LocalDate.now(FUSO);
    }
}
