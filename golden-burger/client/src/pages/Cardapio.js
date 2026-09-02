import { useState } from 'react';
import { cardapio } from '../services/api';

const itensMock = [
    { _id: '1', nome: 'Golden Clássico', preco: 32.9, descricao: 'Blend 180g, cheddar, alface, tomate, picles.', categoria: 'hamburguer' },
    { _id: '2', nome: 'Bacon Lover', preco: 38.9, descricao: 'Dobro de bacon, cheddar, cebola caramelizada.', categoria: 'hamburguer', destaque: true },
    { _id: '3', nome: 'Smash Duplo', preco: 36.9, descricao: 'Dois blends, queijo prato, cebola roxa.', categoria: 'hamburguer' },
    { _id: '4', nome: 'Veggie', preco: 34.9, descricao: 'Grão-de-bico, queijo branco, rúcula.', categoria: 'hamburguer' }
];

export default function Cardapio() {
    const [itens, setItens] = useState(itensMock);
    const [carrinho, setCarrinho] = useState([]);

    // Descomentar quando API estiver pronta:
    // useEffect(() => { cardapio.listar().then(setItens); }, []);

    const adicionar = (item) => {
        setCarrinho(c => [...c, item]);
    };

    const total = carrinho.reduce((s, i) => s + i.preco, 0);

    return (
        <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
            <h1>Cardápio</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                {itens.map(item => (
                    <div key={item._id} style={{ background: '#161616', padding: 20, borderRadius: 12, border: '1px solid rgba(255,255,255,.08)' }}>
                        <h3>{item.nome}</h3>
                        <p style={{ color: '#a3a3a3', fontSize: 14 }}>{item.descricao}</p>
                        <strong style={{ color: '#ff8a00' }}>R$ {item.preco.toFixed(2)}</strong>
                        <button onClick={() => adicionar(item)} style={{ marginTop: 12, display: 'block', background: '#ff8a00', color: '#1a0f00', border: 0, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                            Adicionar
                        </button>
                    </div>
                ))}
            </div>
            {carrinho.length > 0 && (
                <div style={{ marginTop: 32, padding: 20, background: '#161616', borderRadius: 12 }}>
                    <h3>Carrinho ({carrinho.length})</h3>
                    <p>Total: <strong style={{ color: '#ff8a00' }}>R$ {total.toFixed(2)}</strong></p>
                </div>
            )}
        </div>
    );
}
