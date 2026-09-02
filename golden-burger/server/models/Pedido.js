const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    cliente: {
        nome: String,
        telefone: String,
        endereco: String
    },
    itens: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        nome: String,
        preco: Number,
        quantidade: { type: Number, default: 1 },
        observacao: String
    }],
    tipo: { type: String, enum: ['delivery', 'retirada', 'mesa'], required: true },
    mesa: Number,
    status: {
        type: String,
        enum: ['recebido', 'em_preparo', 'pronto', 'entregue', 'cancelado', 'pago'],
        default: 'recebido'
    },
    pagamento: {
        forma: { type: String, enum: ['dinheiro', 'pix', 'cartao_credito', 'cartao_debito'] },
        status: { type: String, enum: ['pendente', 'pago'], default: 'pendente' }
    },
    total: Number,
    observacoes: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
