const Pedido = require('../models/Pedido');

exports.criar = async (req, res) => {
    try {
        const total = req.body.itens.reduce((s, i) => s + (i.preco * (i.quantidade || 1)), 0);
        const pedido = await Pedido.create({ ...req.body, total });
        res.status(201).json(pedido);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const { status } = req.query;
        const filtro = status ? { status } : {};
        const pedidos = await Pedido.find(filtro).sort({ createdAt: -1 });
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

exports.atualizarStatus = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(pedido);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};
