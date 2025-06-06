// controllers/TarefaController.js
const Tarefa = require('../models/Tarefa');

exports.criarTarefa = async (req, res) => {
  try {
    // Força status = 'pendente' e disciplina_id = 1 (padrão) no create
    const novoBody = {
      ...req.body,
      status: 'pendente',
      disciplina_id: 1
    };

    const tarefa = await Tarefa.create(novoBody);
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
    // 1) Buscamos a tarefa atual para obter status e disciplina_id originais
    const tarefaAntiga = await Tarefa.findById(req.params.id);
    if (!tarefaAntiga) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // 2) Mesclamos os campos enviados (req.body) com status e disciplina_id atuais
    const updatedBody = {
      ...req.body,
      status: tarefaAntiga.status,
      disciplina_id: tarefaAntiga.disciplina_id
    };

    // 3) Executamos o update
    const tarefaAtualizada = await Tarefa.update(req.params.id, updatedBody);
    res.status(200).json(tarefaAtualizada);
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
