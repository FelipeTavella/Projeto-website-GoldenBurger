import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ padding: 24 }}>
            <h1>🍔 Golden Burger</h1>
            <nav style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                <Link to="/cardapio">Ver cardápio</Link>
                <Link to="/mesa/1">Simular mesa 1</Link>
                <Link to="/admin">Painel admin</Link>
            </nav>
        </div>
    );
}