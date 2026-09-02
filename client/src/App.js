import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Pedido from './pages/Pedido';
import Mesa from './pages/Mesa';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPedidos from './pages/admin/Pedidos';
import AdminMesas from './pages/admin/Mesas';
import AdminCardapio from './pages/admin/Cardapio';
import AdminRelatorios from './pages/admin/Relatorios';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ===== LADO A — Cliente ===== */}
                <Route path="/" element={<Home />} />
                <Route path="/cardapio" element={<Cardapio />} />
                <Route path="/pedido" element={<Pedido />} />
                <Route path="/mesa/:numero" element={<Mesa />} />

                {/* ===== LADO B — ERP / Gestão ===== */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/pedidos" element={<AdminPedidos />} />
                <Route path="/admin/mesas" element={<AdminMesas />} />
                <Route path="/admin/cardapio" element={<AdminCardapio />} />
                <Route path="/admin/relatorios" element={<AdminRelatorios />} />
            </Routes>
        </BrowserRouter>
    );
}
