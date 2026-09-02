import { useEffect, useState } from 'react';
import { admin } from '../../services/api';

export default function AdminDashboard() {
    const [vendas, setVendas] = useState(null);

    useEffect(() => {
        admin.relatorios.vendas().then(setVendas).catch(() => setVendas({ pedidosHoje: 0, faturamento: 0, ticketMedio: 0 }));
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h1>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
                <Card titulo="Pedidos hoje" valor={vendas?.pedidosHoje ?? '—'} />
                <Card titulo="Faturamento" valor={vendas ? `R$ ${vendas.faturamento.toFixed(2)}` : '—'} />
                <Card titulo="Ticket médio" valor={vendas ? `R$ ${vendas.ticketMedio.toFixed(2)}` : '—'} />
            </div>
        </div>
    );
}

function Card({ titulo, valor }) {
    return (
        <div style={{ background: '#161616', padding: 24, borderRadius: 12, border: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ color: '#a3a3a3', fontSize: 14 }}>{titulo}</div>
            <div style={{ color: '#ff8a00', fontSize: 28, fontWeight: 700, marginTop: 8 }}>{valor}</div>
        </div>
    );
}
