const express = require('express');
const router = express.Router();

// CRUD de funcionários (garçons, cozinha, gerência)
router.get('/', (req, res) => res.json([]));
router.post('/', (req, res) => res.status(201).json(req.body));
router.put('/:id', (req, res) => res.json({ ...req.body, id: req.params.id }));
router.delete('/:id', (req, res) => res.json({ ok: true }));

module.exports = router;
