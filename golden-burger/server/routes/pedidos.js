const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pedidos.controller');

router.post('/', ctrl.criar);
router.get('/', ctrl.listar);
router.patch('/:id/status', ctrl.atualizarStatus);

module.exports = router;
