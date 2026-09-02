import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
});

export const cardapio = {
    listar: (categoria) => api.get('/cardapio', { params: { categoria } }).then(r => r.data)
};

export const pedidos = {
    criar: (dados) => api.post('/pedidos', dados).then(r => r.data),
    listar: (status) => api.get('/pedidos', { params: { status } }).then(r => r.data),
    atualizarStatus: (id, status) => api.patch(`/pedidos/${id}/status`, { status }).then(r => r.data)
};

export const mesas = {
    listar: () => api.get('/mesas').then(r => r.data),
    atualizar: (id, dados) => api.patch(`/mesas/${id}`, dados).then(r => r.data)
};

export const garcom = {
    chamar: (mesa, tipo) => api.post('/chamar-garcom', { mesa, tipo }).then(r => r.data)
};

export const admin = {
    login: (email, senha) => api.post('/admin/auth/login', { email, senha }).then(r => r.data),
    relatorios: {
        vendas: () => api.get('/admin/relatorios/vendas').then(r => r.data),
        maisVendidos: () => api.get('/admin/relatorios/mais-vendidos').then(r => r.data)
    }
};
