import { useEffect, useState } from 'react';
import { cardapio } from '../../services/api';

export default function AdminCardapio() {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        cardapio.listar().then(setItens);
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <h1>Gerenciar Cardápio</h1>
            <button style={{ marginTop: 12, background: '#ff8a00', color: '#1a0f00', border: 0, padding: '10px 18px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                + Novo item
            </button>
            <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', color: '#a3a3a3', fontSize: 14 }}>
                        <th style={{ padding: 12 }}>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map(i => (
                        <tr key={i._id} style={{ borderTop: '1px solid rgba(255,255,255,.08)' }}>
                            <td style={{ padding: 12 }}>{i.nome}</td>
                            <td>{i.categoria}</td>
                            <td style={{ color: '#ff8a00', fontWeight: 600 }}>R$ {i.preco?.toFixed(2)}</td>
                            <td>{i.disponivel ? '✅ Disponível' : '❌ Indisponível'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}