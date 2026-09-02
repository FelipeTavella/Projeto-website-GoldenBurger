import { useState } from 'react';

export default function Pedido() {
    const [form, setForm] = useState({ nome: '', telefone: '', endereco: '' });
    return (
        <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
            <h1>Fazer pedido</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} style={inputStyle} />
                <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} style={inputStyle} />
                <input placeholder="Endereço" value={form.endereco} onChange={e => setForm({ ...form, endereco: e.target.value })} style={inputStyle} />
                <button type="button" style={btnStyle}>Finalizar pedido</button>
            </form>
        </div>
    );
}

const inputStyle = { padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,.1)', background: '#0d0d0d', color: '#fff' };
const btnStyle = { padding: 14, background: '#ff8a00', color: '#1a0f00', border: 0, borderRadius: 8, fontWeight: 600, cursor: 'pointer' };