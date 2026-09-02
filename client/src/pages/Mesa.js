import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { garcom } from '../services/api';

export default function Mesa() {
    const { numero } = useParams();
    const [chamando, setChamando] = useState(false);

    const chamar = async (tipo) => {
        setChamando(true);
        try {
            await garcom.chamar(numero, tipo);
            alert(`${tipo === 'pedir_conta' ? 'Conta solicitada' : 'Garçom a caminho'}!`);
        } finally {
            setChamando(false);
        }
    };

    return (
        <div style={{ padding: 24, textAlign: 'center' }}>
            <h1>Mesa {numero}</h1>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
                <button disabled={chamando} onClick={() => chamar('chamar_garcom')} style={btnStyle}>🔔 Chamar garçom</button>
                <button disabled={chamando} onClick={() => chamar('pedir_conta')} style={btnStyle}>🧾 Pedir a conta</button>
                <button disabled={chamando} onClick={() => chamar('pagar')} style={btnStyle}>💳 Pagar</button>
            </div>
        </div>
    );
}

const btnStyle = {
    background: '#ff8a00',
    color: '#1a0f00',
    border: 0,
    padding: '14px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 16
};
