-- Tabela de disciplinas
CREATE TABLE disciplinas (
  id            SERIAL PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL
);

-- Tabela de tipos de atividade
CREATE TABLE tipos_atividade (
  id            SERIAL PRIMARY KEY,
  nome          VARCHAR(50) NOT NULL
);

-- Tabela de atividades
CREATE TABLE atividades (
  id              SERIAL PRIMARY KEY,
  titulo          VARCHAR(255) NOT NULL,
  descricao       TEXT,
  data_criacao    TIMESTAMP NOT NULL DEFAULT NOW(),
  data_limite     DATE NOT NULL,
  status          VARCHAR(20) NOT NULL,
  prioridade      VARCHAR(10) NOT NULL,
  disciplina_id   INTEGER NOT NULL REFERENCES disciplinas(id)
                   ON UPDATE CASCADE
                   ON DELETE RESTRICT,
  tipo_id         INTEGER NOT NULL REFERENCES tipos_atividade(id)
                   ON UPDATE CASCADE
                   ON DELETE RESTRICT
);
