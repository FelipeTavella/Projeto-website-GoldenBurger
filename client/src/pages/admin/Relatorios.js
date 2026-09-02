import { useEffect, useState } from 'react';
import { admin } from '../../services/api';

export default function AdminRelatorios() {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        admin.relatorios.maisVendidos().then(setRanking);
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h1>Relatórios</h1>
            <h2 style={{ marginTop: 24 }}>Mais vendidos</h2>
            <ol style={{ marginTop: 12 }}>
                {ranking.map((r, i) => (
                    <li key={r.nome} style={{ padding: 8, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                        {r.nome} — <strong style={{ color: '#ff8a00' }}>{r.qtd} vendas</strong>
                    </li>
                ))}
            </ol>
        </div>
    );
}