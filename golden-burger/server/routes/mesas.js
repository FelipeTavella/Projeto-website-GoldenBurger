const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

router.get('/', async (req, res) => {
    const mesas = await Mesa.find().sort({ numero: 1 });
    res.json(mesas);
});

router.patch('/:id', async (req, res) => {
    const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(mesa);
});

module.exports = router;
