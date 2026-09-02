const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    numero: { type: Number, required: true, unique: true },
    capacidade: Number,
    status: { type: String, enum: ['livre', 'ocupada', 'reservada', 'limpeza'], default: 'livre' },
    pedidoAtual: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mesa', MesaSchema);
