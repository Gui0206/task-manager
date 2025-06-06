// models/Tarefa.js
const pool = require('../config/database');

module.exports = {
  async create({ titulo, descricao, data_limite, status, prioridade, disciplina_id, tipo_id }) {
    const query = `
      INSERT INTO atividades
        (titulo, descricao, data_criacao, data_limite, status, prioridade, disciplina_id, tipo_id)
      VALUES
        ($1, $2, NOW(), $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      titulo,
      descricao,
      data_limite,
      status,
      prioridade,
      disciplina_id,
      tipo_id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAll() {
    const query = `
      SELECT
        a.id,
        a.titulo,
        a.descricao,
        a.data_criacao,
        a.data_limite,
        a.status,
        a.prioridade,
        a.disciplina_id,
        a.tipo_id,
        t.nome AS tipo_nome
      FROM atividades a
      JOIN tipos_atividade t
        ON a.tipo_id = t.id
      ORDER BY a.data_limite ASC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  async findById(id) {
    const query = `
      SELECT
        a.id,
        a.titulo,
        a.descricao,
        a.data_criacao,
        a.data_limite,
        a.status,
        a.prioridade,
        a.disciplina_id,
        a.tipo_id,
        t.nome AS tipo_nome
      FROM atividades a
      JOIN tipos_atividade t
        ON a.tipo_id = t.id
      WHERE a.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async update(id, { titulo, descricao, data_limite, status, prioridade, disciplina_id, tipo_id }) {
    const query = `
      UPDATE atividades SET
        titulo = $1,
        descricao = $2,
        data_limite = $3,
        status = $4,
        prioridade = $5,
        disciplina_id = $6,
        tipo_id = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [
      titulo,
      descricao,
      data_limite,
      status,
      prioridade,
      disciplina_id,
      tipo_id,
      id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async remove(id) {
    const { rows } = await pool.query(
      `DELETE FROM atividades WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  }
};
