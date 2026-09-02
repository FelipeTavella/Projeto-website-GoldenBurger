const express = require('express');
const router = express.Router();

// Chamada de garçom — registra evento e emite via socket (futuro)
let chamadas = [];

router.post('/', (req, res) => {
    const evento = {
        id: Date.now(),
        mesa: req.body.mesa,
        tipo: req.body.tipo || 'chamar_garcom',
        createdAt: new Date()
    };
    chamadas.unshift(evento);
    res.status(201).json(evento);
});

router.get('/', (req, res) => res.json(chamadas));

module.exports = router;
