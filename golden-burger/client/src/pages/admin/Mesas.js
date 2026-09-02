import { useEffect, useState } from 'react';
import { mesas } from '../../services/api';

export default function AdminMesas() {
    const [lista, setLista] = useState([]);

    useEffect(() => {
        mesas.listar().then(setLista);
    }, []);

    const statusCor = { livre: '#22c55e', ocupada: '#ef4444', reservada: '#f59e0b', limpeza: '#a3a3a3' };

    return (
        <div style={{ padding: 24 }}>
            <h1>Mesas</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginTop: 16 }}>
                {lista.map(m => (
                    <div key={m._id} style={{ background: '#161616', padding: 24, borderRadius: 12, textAlign: 'center', border: '1px solid rgba(255,255,255,.08)' }}>
                        <div style={{ fontSize: 32, fontWeight: 700 }}>{m.numero}</div>
                        <div style={{ color: statusCor[m.status] || '#a3a3a3', marginTop: 8, textTransform: 'capitalize' }}>● {m.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}