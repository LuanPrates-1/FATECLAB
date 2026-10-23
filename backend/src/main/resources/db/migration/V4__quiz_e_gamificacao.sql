-- Lições com quiz (questões de múltipla escolha) e elementos de gamificação:
-- ofensiva (dias seguidos de estudo), descrição de trilha e desempenho por módulo.

ALTER TABLE usuario ADD COLUMN ofensiva_atual INT NOT NULL DEFAULT 0;
ALTER TABLE usuario ADD COLUMN maior_ofensiva INT NOT NULL DEFAULT 0;
ALTER TABLE usuario ADD COLUMN ultima_atividade DATE NULL;

ALTER TABLE trilha_de_estudo ADD COLUMN descricao VARCHAR(500) NULL;

ALTER TABLE progresso_modulo ADD COLUMN acertos INT NULL;
ALTER TABLE progresso_modulo ADD COLUMN total_questoes INT NULL;

CREATE TABLE questao (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    modulo_id   BIGINT NOT NULL,
    ordem       INT    NOT NULL,
    enunciado   TEXT   NOT NULL,
    explicacao  TEXT   NULL,
    CONSTRAINT fk_questao_modulo FOREIGN KEY (modulo_id) REFERENCES modulo (id)
);

CREATE TABLE alternativa (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    questao_id  BIGINT       NOT NULL,
    ordem       INT          NOT NULL,
    texto       VARCHAR(500) NOT NULL,
    correta     BOOLEAN      NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_alternativa_questao FOREIGN KEY (questao_id) REFERENCES questao (id)
);

CREATE INDEX idx_questao_modulo ON questao (modulo_id);
CREATE INDEX idx_alternativa_questao ON alternativa (questao_id);
CREATE INDEX idx_usuario_papel_xp ON usuario (papel, xp_total);
