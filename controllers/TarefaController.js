// controllers/TarefaController.js
const Tarefa = require('../models/Tarefa');

exports.criarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.create(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.status(200).json(tarefas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.update(req.params.id, req.body);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.remove(req.params.id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
