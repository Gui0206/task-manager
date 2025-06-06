-- scripts/init.sql

-- (0) Remover as tabelas na ordem inversa para evitar problemas de FK
DROP TABLE IF EXISTS atividades;
DROP TABLE IF EXISTS tipos_atividade;
DROP TABLE IF EXISTS disciplinas;

-- (1) Cria a tabela de disciplinas
CREATE TABLE disciplinas (
  id            SERIAL PRIMARY KEY,
  nome          VARCHAR(100) NOT NULL
);

-- Insere uma disciplina “Geral” para servir de default (id = 1)
INSERT INTO disciplinas (nome) VALUES
  ('Geral');

-- (2) Cria a tabela de tipos de atividade
CREATE TABLE tipos_atividade (
  id            SERIAL PRIMARY KEY,
  nome          VARCHAR(50) NOT NULL
);

-- Insere alguns tipos básicos para que exista tipo_id = 1, 2, 3, 4
INSERT INTO tipos_atividade (nome) VALUES
  ('Autoestudo'),
  ('Revisão'),
  ('Trabalho'),
  ('Prova');

-- (3) Cria a tabela de atividades (que exige disciplina_id e tipo_id)
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
