// routes/index.js
const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// rota raiz de health-check
router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API Gerenciador de Tarefas funcionando' });
});

// CRUD de tarefas
router.post('/tarefas',    TarefaController.criarTarefa);
router.get('/tarefas',     TarefaController.listarTarefas);
router.get('/tarefas/:id', TarefaController.buscarTarefa);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;
