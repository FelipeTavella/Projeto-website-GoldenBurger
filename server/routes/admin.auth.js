const express = require('express');
const router = express.Router();

// Auth do painel admin — JWT + bcrypt (implementar)
router.post('/login', (req, res) => {
    // TODO: validar usuário no banco e gerar JWT
    res.json({ token: 'fake-token-aqui' });
});

module.exports = router;
