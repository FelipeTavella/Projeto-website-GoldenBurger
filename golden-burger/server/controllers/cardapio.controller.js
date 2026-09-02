const Item = require('../models/Item');

exports.listar = async (req, res) => {
    try {
        const { categoria } = req.query;
        const filtro = categoria ? { categoria } : {};
        const itens = await Item.find(filtro).sort({ destaque: -1, categoria: 1 });
        res.json(itens);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.remover = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};
