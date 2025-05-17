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
    const values = [titulo, descricao, data_limite, status, prioridade, disciplina_id, tipo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAll() {
    const { rows } = await pool.query(`
      SELECT * 
      FROM atividades 
      ORDER BY data_limite ASC
    `);
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM atividades WHERE id = $1`, 
      [id]
    );
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
        tipo_id = $7,
        updated_at = NOW()
      WHERE id = $8
      RETURNING *
    `;
    const values = [titulo, descricao, data_limite, status, prioridade, disciplina_id, tipo_id, id];
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
