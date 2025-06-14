// routes/api.js
const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

// CRUD de tarefas (JSON)
router.post('/tarefas',    TarefaController.criarTarefa);
router.get('/tarefas',     TarefaController.listarTarefas);
router.get('/tarefas/:id', TarefaController.buscarTarefa);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;
