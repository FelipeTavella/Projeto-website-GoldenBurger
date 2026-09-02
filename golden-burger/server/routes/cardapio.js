const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cardapio.controller');

router.get('/', ctrl.listar);
router.post('/', ctrl.criar);
router.put('/:id', ctrl.atualizar);
router.delete('/:id', ctrl.remover);

module.exports = router;
