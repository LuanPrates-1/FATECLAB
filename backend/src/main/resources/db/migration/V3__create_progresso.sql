CREATE TABLE progresso_aluno (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    aluno_id            BIGINT      NOT NULL,
    trilha_id           BIGINT      NOT NULL,
    status              VARCHAR(20) NOT NULL,
    modulo_atual_id     BIGINT      NULL,
    xp_obtido_na_trilha INT         NOT NULL DEFAULT 0,
    atualizado_em       TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_progresso_aluno_usuario FOREIGN KEY (aluno_id) REFERENCES usuario (id),
    CONSTRAINT fk_progresso_aluno_trilha FOREIGN KEY (trilha_id) REFERENCES trilha_de_estudo (id),
    CONSTRAINT fk_progresso_aluno_modulo_atual FOREIGN KEY (modulo_atual_id) REFERENCES modulo (id),
    CONSTRAINT uk_progresso_aluno_trilha UNIQUE (aluno_id, trilha_id)
);

CREATE TABLE progresso_modulo (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    progresso_aluno_id  BIGINT    NOT NULL,
    modulo_id           BIGINT    NOT NULL,
    concluido_em        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_progresso_modulo_progresso FOREIGN KEY (progresso_aluno_id) REFERENCES progresso_aluno (id),
    CONSTRAINT fk_progresso_modulo_modulo FOREIGN KEY (modulo_id) REFERENCES modulo (id),
    CONSTRAINT uk_progresso_modulo_par UNIQUE (progresso_aluno_id, modulo_id)
);
