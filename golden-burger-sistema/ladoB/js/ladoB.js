/* ladoB — ERP / Gestão da hamburgueria */
(function () {
    'use strict';

    // ===== Mock data (substituir por fetch da API) =====
    const state = {
        pedidos: [
            { id: 'P001', mesa: 5, itens: [{ nome: 'Bacon Lover', qtd: 2 }, { nome: 'Coca-Cola', qtd: 2 }], total: 93.6, status: 'recebido', criadoEm: Date.now() - 120000 },
            { id: 'P002', mesa: 12, itens: [{ nome: 'Combo Casal', qtd: 1 }, { nome: 'Batata', qtd: 1 }], total: 108.8, status: 'em_preparo', criadoEm: Date.now() - 300000 },
            { id: 'P003', mesa: 3, itens: [{ nome: 'Smash Duplo', qtd: 1 }], total: 36.9, status: 'em_preparo', criadoEm: Date.now() - 240000 },
            { id: 'P004', mesa: 8, itens: [{ nome: 'Golden Clássico', qtd: 3 }], total: 98.7, status: 'pronto', criadoEm: Date.now() - 420000 },
            { id: 'P005', mesa: 1, itens: [{ nome: 'Veggie', qtd: 1 }, { nome: 'Suco', qtd: 1 }], total: 44.8, status: 'entregue', criadoEm: Date.now() - 1800000 }
        ],
        mesas: Array.from({ length: 12 }, (_, i) => ({
            numero: i + 1,
            status: ['ocupada', 'ocupada', 'ocupada', 'livre', 'livre', 'reservada'][Math.floor(Math.random() * 6)] || 'livre'
        })),
        cardapio: [
            { id: 1, nome: 'Golden Clássico', cat: 'hamburguer', preco: 32.9, disponivel: true },
            { id: 2, nome: 'Bacon Lover', cat: 'hamburguer', preco: 38.9, disponivel: true },
            { id: 3, nome: 'Smash Duplo', cat: 'hamburguer', preco: 36.9, disponivel: true },
            { id: 4, nome: 'Veggie', cat: 'hamburguer', preco: 34.9, disponivel: false },
            { id: 5, nome: 'Combo Individual', cat: 'combo', preco: 49.9, disponivel: true },
            { id: 6, nome: 'Combo Casal', cat: 'combo', preco: 89.9, disponivel: true },
            { id: 7, nome: 'Batata Frita', cat: 'porcao', preco: 18.9, disponivel: true }
        ],
        funcionarios: [
            { nome: 'João Silva', cargo: 'Cozinha', turno: 'Noite' },
            { nome: 'Maria Souza', cargo: 'Caixa', turno: 'Tarde' },
            { nome: 'Pedro Lima', cargo: 'Garçom', turno: 'Noite' },
            { nome: 'Ana Costa', cargo: 'Gerente', turno: 'Integral' }
        ],
        notificacoes: []
    };

    // ===== Helpers =====
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    function brl(v) {
        return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // ===== Clock =====
    function tickClock() {
        const c = $('#clock');
        if (c) c.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(tickClock, 1000);
    tickClock();

    // ===== Navegação entre módulos =====
    $$('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.nav-item').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            const mod = btn.dataset.mod;
            $$('.modulo').forEach(m => m.classList.remove('ativo'));
            $('#mod-' + mod).classList.add('ativo');
        });
    });

    // ===== Dashboard =====
    function renderDashboard() {
        const faturamento = state.pedidos.reduce((s, p) => s + p.total, 0);
        $('#stat-faturamento').textContent = brl(faturamento);
        $('#stat-pedidos').textContent = state.pedidos.length;
        $('#stat-ticket').textContent = brl(state.pedidos.length ? faturamento / state.pedidos.length : 0);
        $('#stat-ocupadas').textContent = state.mesas.filter(m => m.status === 'ocupada').length;
        $('#stat-total-mesas').textContent = state.mesas.length;

        const emAndamento = state.pedidos.filter(p => p.status !== 'entregue' && p.status !== 'cancelado');
        const el = $('#dash-pedidos');
        el.innerHTML = emAndamento.length ? '' : '<p class="empty">Nenhum pedido em andamento.</p>';
        emAndamento.forEach(p => el.appendChild(pedidoCard(p)));
    }

    // ===== Card de pedido =====
    function pedidoCard(p) {
        const div = document.createElement('div');
        div.className = `pedido-card status-${p.status}`;
        const statusLabel = { recebido: 'Recebido', em_preparo: 'Em preparo', pronto: 'Pronto', entregue: 'Entregue' };
        div.innerHTML = `
            <div class="mesa-tag">Mesa ${p.mesa}</div>
            <div class="itens">
                <strong>Pedido #${p.id}</strong>
                ${p.itens.map(i => `${i.qtd}x ${i.nome}`).join(' · ')}
            </div>
            <div class="total">${brl(p.total)}</div>
            <select>
                <option value="recebido" ${p.status === 'recebido' ? 'selected' : ''}>📥 Recebido</option>
                <option value="em_preparo" ${p.status === 'em_preparo' ? 'selected' : ''}>🍳 Preparando</option>
                <option value="pronto" ${p.status === 'pronto' ? 'selected' : ''}>✅ Pronto</option>
                <option value="entregue" ${p.status === 'entregue' ? 'selected' : ''}>🚚 Entregue</option>
            </select>
            <button class="btn btn-ghost btn-sm" title="Ver detalhes">👁</button>
        `;
        div.querySelector('select').addEventListener('change', (e) => {
            p.status = e.target.value;
            renderAll();
        });
        return div;
    }

    // ===== Lista de pedidos =====
    let filtroAtual = 'todos';
    function renderPedidos() {
        const lista = filtroAtual === 'todos' ? state.pedidos : state.pedidos.filter(p => p.status === filtroAtual);
        const el = $('#lista-pedidos');
        el.innerHTML = lista.length ? '' : '<p class="empty">Nenhum pedido nessa categoria.</p>';
        lista.forEach(p => el.appendChild(pedidoCard(p)));
    }

    $$('.filtro').forEach(f => {
        f.addEventListener('click', () => {
            $$('.filtro').forEach(x => x.classList.remove('ativo'));
            f.classList.add('ativo');
            filtroAtual = f.dataset.status;
            renderPedidos();
        });
    });

    // ===== KDS (Cozinha) =====
    function renderKDS() {
        const el = $('#kds-grid');
        const lista = state.pedidos.filter(p => p.status === 'em_preparo' || p.status === 'recebido');
        el.innerHTML = lista.length ? '' : '<p class="empty">Cozinha livre! Nenhum pedido para preparar.</p>';
        lista.forEach(p => {
            const card = document.createElement('div');
            card.className = 'kds-card';
            const minutos = Math.floor((Date.now() - p.criadoEm) / 60000);
            card.innerHTML = `
                <div class="head">
                    <strong>Mesa ${p.mesa}</strong>
                    <span class="timer">${minutos}min</span>
                </div>
                ${p.itens.map(i => `<div class="item"><span class="qtd">${i.qtd}x</span>${i.nome}</div>`).join('')}
                <button onclick="window._avancarStatus('${p.id}')">✅ Marcar como pronto</button>
            `;
            el.appendChild(card);
        });
    }

    window._avancarStatus = function (id) {
        const p = state.pedidos.find(x => x.id === id);
        if (!p) return;
        if (p.status === 'recebido') p.status = 'em_preparo';
        else if (p.status === 'em_preparo') p.status = 'pronto';
        renderAll();
        toast(`✅ Pedido ${id} marcado como pronto`);
    };

    // ===== Mesas =====
    function renderMesas() {
        const el = $('#mesas-grid');
        el.innerHTML = '';
        state.mesas.forEach(m => {
            const div = document.createElement('div');
            div.className = `mesa-card ${m.status}`;
            div.innerHTML = `
                <div class="num">${m.numero}</div>
                <div class="status">● ${m.status}</div>
            `;
            div.onclick = () => {
                const ordem = ['livre', 'ocupada', 'reservada', 'limpeza'];
                m.status = ordem[(ordem.indexOf(m.status) + 1) % ordem.length];
                renderMesas();
            };
            el.appendChild(div);
        });
    }

    // ===== Cardápio =====
    function renderCardapio() {
        const el = $('#tabela-cardapio');
        el.innerHTML = '';
        state.cardapio.forEach(i => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${i.nome}</td>
                <td>${i.cat}</td>
                <td style="color:var(--accent);font-weight:600">${brl(i.preco)}</td>
                <td>${i.disponivel ? '✅ Disponível' : '❌ Indisponível'}</td>
                <td><button class="btn btn-ghost btn-sm">Editar</button></td>
            `;
            el.appendChild(tr);
        });
    }

    // ===== Funcionários =====
    function renderFuncionarios() {
        const el = $('#tabela-funcionarios');
        el.innerHTML = '';
        state.funcionarios.forEach(f => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${f.nome}</td>
                <td>${f.cargo}</td>
                <td>${f.turno}</td>
                <td><span style="color:var(--success)">● Ativo</span></td>
            `;
            el.appendChild(tr);
        });
    }

    // ===== Relatórios =====
    function renderRelatorios() {
        // Mais vendidos
        const contagem = {};
        state.pedidos.forEach(p => p.itens.forEach(i => {
            contagem[i.nome] = (contagem[i.nome] || 0) + i.qtd;
        }));
        const ranking = Object.entries(contagem).sort((a, b) => b[1] - a[1]).slice(0, 5);
        $('#mais-vendidos').innerHTML = ranking.map(([nome, qtd]) =>
            `<li><span>${nome}</span><strong>${qtd} vendas</strong></li>`
        ).join('');

        // Vendas por hora (mock)
        const horas = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        const max = Math.max(...horas.map(() => Math.random() * 100));
        $('#grafico-barras').innerHTML = horas.map(h => {
            const valor = Math.random() * 100;
            return `<div class="barra" style="height:${(valor / max) * 100}%" data-h="${h}h"></div>`;
        }).join('');

        // Resumo
        const fat = state.pedidos.reduce((s, p) => s + p.total, 0);
        $('#r-pedidos').textContent = state.pedidos.length;
        $('#r-fat').textContent = brl(fat);
        $('#r-ticket').textContent = brl(state.pedidos.length ? fat / state.pedidos.length : 0);
        $('#r-cancel').textContent = 0;
    }

    // ===== Notificações =====
    function renderNotificacoes() {
        const el = $('#lista-notificacoes');
        if (!state.notificacoes.length) {
            el.innerHTML = '<p class="empty">Nenhuma notificação no momento.</p>';
        } else {
            el.innerHTML = '';
            state.notificacoes.forEach(n => {
                const div = document.createElement('div');
                div.className = `notif ${n.tipo || ''}`;
                div.innerHTML = `<div><strong>Mesa ${n.mesa}</strong>${n.tipo}<small>${n.hora}</small></div>`;
                el.appendChild(div);
            });
        }
        $('#notif-count').textContent = state.notificacoes.length;
    }

    // ===== Toasts =====
    function toast(msg) {
        const c = $('#toasts');
        const t = document.createElement('div');
        t.className = 'toast-box';
        t.innerHTML = `<button onclick="this.parentElement.remove()">✕</button><strong>${msg}</strong><small>${new Date().toLocaleTimeString('pt-BR')}</small>`;
        c.appendChild(t);
        setTimeout(() => t.remove(), 5000);
    }

    // ===== Simulação de notificação do Lado A =====
    window.simularNotificacao = function (mesa = 7, tipo = 'chamou o garçom') {
        const hora = new Date().toLocaleTimeString('pt-BR');
        state.notificacoes.unshift({ mesa, tipo, hora });
        renderNotificacoes();
        toast(`🔔 Mesa ${mesa} ${tipo}`);
    };

    // ===== Render all =====
    function renderAll() {
        renderDashboard();
        renderPedidos();
        renderKDS();
        renderMesas();
        renderCardapio();
        renderFuncionarios();
        renderRelatorios();
        renderNotificacoes();
    }

    renderAll();

    // ===== Simulação periódica (apenas para demo) =====
    setInterval(() => {
        // Avança timers no KDS
        renderKDS();
    }, 60000);

    // Atalho para testar: chamar simulador via console
    window.demoChamada = () => window.simularNotificacao(Math.floor(Math.random() * 12) + 1, 'chamou o garçom');
})();
