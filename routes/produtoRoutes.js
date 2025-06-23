const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

router.post('/', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;

  if (!nome || !descricao || !cor || !peso || !tipo || !preco) {
    return res.status(422).json({ erro: 'Todos os campos devem ser preenchidos' });
  }

  const produto = { nome, descricao, cor, peso, tipo, preco };

  try {
    await Produto.create(produto);
    res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/nome/:nome', async (req, res) => {
  try {
    const produto = await Produto.findOne({ nome: req.params.nome });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', async (req, res) => {
  const { nome, descricao, cor, peso, tipo, preco } = req.body;
  const produto = { nome, descricao, cor, peso, tipo, preco };

  try {
    const updated = await Produto.updateOne({ _id: req.params.id }, produto);
    if (updated.matchedCount === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await Produto.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
