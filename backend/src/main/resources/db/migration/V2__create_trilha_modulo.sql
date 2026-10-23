CREATE TABLE trilha_de_estudo (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo        VARCHAR(255) NOT NULL,
    area          VARCHAR(100) NOT NULL,
    nivel         VARCHAR(20)  NOT NULL,
    ativa         BOOLEAN      NOT NULL DEFAULT TRUE,
    criada_em     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizada_em TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modulo (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    trilha_id     BIGINT       NOT NULL,
    ordem         INT          NOT NULL,
    titulo        VARCHAR(255) NOT NULL,
    conteudo      TEXT         NULL,
    xp_concedido  INT          NOT NULL,
    CONSTRAINT fk_modulo_trilha FOREIGN KEY (trilha_id) REFERENCES trilha_de_estudo (id),
    CONSTRAINT uk_modulo_trilha_ordem UNIQUE (trilha_id, ordem)
);

CREATE INDEX idx_trilha_area_nivel ON trilha_de_estudo (area, nivel);
