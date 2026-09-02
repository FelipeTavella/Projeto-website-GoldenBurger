const express = require('express');
const router = express.Router();
const Pedido = require('../../models/Pedido');

router.get('/vendas', async (req, res) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const pedidos = await Pedido.find({ createdAt: { $gte: hoje } });
    const total = pedidos.reduce((s, p) => s + (p.total || 0), 0);

    res.json({
        pedidosHoje: pedidos.length,
        faturamento: total,
        ticketMedio: pedidos.length ? total / pedidos.length : 0
    });
});

router.get('/mais-vendidos', async (req, res) => {
    const pedidos = await Pedido.find();
    const contagem = {};
    pedidos.forEach(p =>
        p.itens.forEach(i => {
            contagem[i.nome] = (contagem[i.nome] || 0) + (i.quantidade || 1);
        })
    );
    const ranking = Object.entries(contagem)
        .map(([nome, qtd]) => ({ nome, qtd }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 10);
    res.json(ranking);
});

module.exports = router;
