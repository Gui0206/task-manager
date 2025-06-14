// routes/web.js
const express = require('express');
const router = express.Router();

// Página principal (Visão Semanal)
router.get('/tarefas', (req, res) => {
  res.render('tarefas'); // procura views/tarefas.ejs
});

module.exports = router;
