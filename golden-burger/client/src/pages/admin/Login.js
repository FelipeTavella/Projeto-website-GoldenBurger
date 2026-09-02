import { useState } from 'react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        // await admin.login(email, senha);
        alert('Login (mock)');
    };

    return (
        <div style={{ maxWidth: 380, margin: '80px auto', padding: 32, background: '#161616', borderRadius: 14 }}>
            <h2>Painel Admin</h2>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />
                <button type="submit" style={btnStyle}>Entrar</button>
            </form>
        </div>
    );
}

const inputStyle = { padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,.1)', background: '#0d0d0d', color: '#fff' };
const btnStyle = { padding: 12, background: '#ff8a00', color: '#1a0f00', border: 0, borderRadius: 8, fontWeight: 600, cursor: 'pointer' };
