// routes/web.js
const express = require('express');
const router = express.Router();

// Página principal (Visão Semanal)
router.get('/tarefas', (req, res) => {
  res.render('tarefas'); // procura views/tarefas.ejs
});

// Se você tiver uma view dedicada para “Nova Tarefa”:
// router.get('/tarefas/nova', (req, res) => {
//   res.render('nova-tarefa');
// });

module.exports = router;
