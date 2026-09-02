/**
 * Golden Burger — API server (Express + MongoDB)
 * Rotas separadas para Lado A (cliente) e Lado B (ERP / gestão)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ===== Rotas Lado A (cliente) =====
app.use('/api/cardapio', require('./routes/cardapio'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/mesas', require('./routes/mesas'));
app.use('/api/chamar-garcom', require('./routes/garcom'));

// ===== Rotas Lado B (ERP / gestão) =====
app.use('/api/admin/auth', require('./routes/admin.auth'));
app.use('/api/admin/relatorios', require('./routes/admin.relatorios'));
app.use('/api/admin/funcionarios', require('./routes/admin.funcionarios'));

// ===== Conexão MongoDB =====
const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/goldenburger';

mongoose.connect(MONGO)
    .then(() => {
        console.log('✅ MongoDB conectado');
        app.listen(PORT, () => console.log(`🚀 API rodando em http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Erro MongoDB:', err));
