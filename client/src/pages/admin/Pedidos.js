import { useEffect, useState } from 'react';
import { pedidos } from '../../services/api';

export default function AdminPedidos() {
    const [pedidosLista, setPedidosLista] = useState([]);

    useEffect(() => {
        pedidos.listar().then(setPedidosLista);
    }, []);

    const atualizarStatus = async (id, novo) => {
        await pedidos.atualizarStatus(id, novo);
        setPedidosLista(l => l.map(p => p._id === id ? { ...p, status: novo } : p));
    };

    const statusOrdem = ['recebido', 'em_preparo', 'pronto', 'entregue'];
    const statusLabels = { recebido: '📥 Recebido', em_preparo: '🍳 Preparando', pronto: '✅ Pronto', entregue: '🚚 Entregue' };

    return (
        <div style={{ padding: 24 }}>
            <h1>Pedidos</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {pedidosLista.map(p => (
                    <div key={p._id} style={{ background: '#161616', padding: 16, borderRadius: 10, border: '1px solid rgba(255,255,255,.08)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ minWidth: 120 }}>
                            <div style={{ color: '#a3a3a3', fontSize: 12 }}>Pedido #{p._id.slice(-6)}</div>
                            <div style={{ fontWeight: 600 }}>{p.cliente?.nome || 'Mesa ' + p.mesa}</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            {p.itens.map(i => <div key={i.itemId || i.nome} style={{ fontSize: 14 }}>{i.quantidade}x {i.nome}</div>)}
                        </div>
                        <div style={{ color: '#ff8a00', fontWeight: 700, fontSize: 18 }}>R$ {p.total?.toFixed(2)}</div>
                        <select value={p.status} onChange={e => atualizarStatus(p._id, e.target.value)} style={selectStyle}>
                            {statusOrdem.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}

const selectStyle = { padding: '8px 12', borderRadius: 8, border: '1px solid rgba(255,255,255,.1)', background: '#0d0d0d', color: '#fff', fontSize: 14 };