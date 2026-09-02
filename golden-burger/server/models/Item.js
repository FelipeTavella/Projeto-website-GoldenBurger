const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: String,
    categoria: { type: String, enum: ['hamburguer', 'combo', 'bebida', 'porcao', 'sobremesa'], required: true },
    preco: { type: Number, required: true },
    imagem: String,
    disponivel: { type: Boolean, default: true },
    destaque: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
