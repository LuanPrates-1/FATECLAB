CREATE TABLE usuario (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    NOT NULL,
    senha_hash  VARCHAR(255)    NOT NULL,
    papel       VARCHAR(20)     NOT NULL,
    apelido     VARCHAR(100)    NULL,
    xp_total    INT             NOT NULL DEFAULT 0,
    criado_em   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_usuario_email UNIQUE (email)
);
