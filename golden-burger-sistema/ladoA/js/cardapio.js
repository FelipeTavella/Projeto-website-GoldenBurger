/* cardápio — listagem, carrinho, drawer */
(function () {
    'use strict';

    // ===== Mesa =====
    const params = new URLSearchParams(window.location.search);
    const mesa = params.get('mesa') || 'XX';
    const mesaEl = document.getElementById('mesa-num');
    if (mesaEl) mesaEl.textContent = mesa;

    // ===== Cardápio (mock — substituir por fetch da API depois) =====
    const itens = [
        { id: 1, nome: 'Golden Clássico', cat: 'hamburguer', preco: 32.90, desc: 'Blend 180g, cheddar, alface, tomate.', emoji: '🍔' },
        { id: 2, nome: 'Bacon Lover', cat: 'hamburguer', preco: 38.90, desc: 'Dobro de bacon, cheddar, cebola caramelizada.', emoji: '🥓' },
        { id: 3, nome: 'Smash Duplo', cat: 'hamburguer', preco: 36.90, desc: 'Dois blends, queijo prato, cebola roxa.', emoji: '🍔' },
        { id: 4, nome: 'Veggie', cat: 'hamburguer', preco: 34.90, desc: 'Grão-de-bico, queijo branco, rúcula.', emoji: '🥬' },
        { id: 5, nome: 'Combo Individual', cat: 'combo', preco: 49.90, desc: '1 hambúrguer + batata + refri.', emoji: '🎁' },
        { id: 6, nome: 'Combo Casal', cat: 'combo', preco: 89.90, desc: '2 hambúrgueres + batata grande + 2 refris.', emoji: '🎁' },
        { id: 7, nome: 'Batata Frita', cat: 'porcao', preco: 18.90, desc: 'Crocante por fora, macia por dentro.', emoji: '🍟' },
        { id: 8, nome: 'Onion Rings', cat: 'porcao', preco: 22.90, desc: 'Anéis de cebola empanados.', emoji: '🧅' },
        { id: 9, nome: 'Coca-Cola 350ml', cat: 'bebida', preco: 7.90, desc: 'Lata gelada.', emoji: '🥤' },
        { id: 10, nome: 'Suco Natural', cat: 'bebida', preco: 9.90, desc: 'Laranja, abacaxi ou maracujá.', emoji: '🧃' }
    ];

    const catalogoEl = document.getElementById('cardapio');
    let categoriaAtual = 'all';

    function brl(v) {
        return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function render() {
        catalogoEl.innerHTML = '';
        const lista = categoriaAtual === 'all' ? itens : itens.filter(i => i.cat === categoriaAtual);

        if (lista.length === 0) {
            catalogoEl.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1;padding:40px;">Nenhum item nessa categoria.</p>';
            return;
        }

        lista.forEach(item => {
            const card = document.createElement('article');
            card.className = 'card-item';
            card.innerHTML = `
                <div class="img">${item.emoji}</div>
                <div class="body">
                    <h3>${item.nome}</h3>
                    <div class="desc">${item.desc}</div>
                    <div class="footer">
                        <span class="preco">${brl(item.preco)}</span>
                        <button class="btn-add" data-id="${item.id}">Adicionar</button>
                    </div>
                </div>
            `;
            catalogoEl.appendChild(card);
        });

        catalogoEl.querySelectorAll('.btn-add').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = itens.find(i => i.id === Number(btn.dataset.id));
                adicionar(item);
            });
        });
    }

    // ===== Categorias =====
    document.querySelectorAll('.cat').forEach(c => {
        c.addEventListener('click', () => {
            document.querySelectorAll('.cat').forEach(x => x.classList.remove('ativo'));
            c.classList.add('ativo');
            categoriaAtual = c.dataset.cat;
            render();
        });
    });

    // ===== Carrinho =====
    const cart = [];
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartTotalLabel = document.getElementById('cart-total-label');
    const cartFab = document.getElementById('cart-fab');
    const drawer = document.getElementById('cart-drawer');
    const drawerBg = document.getElementById('drawer-bg');

    function adicionar(item) {
        cart.push({ ...item, uid: Date.now() + Math.random() });
        renderCart();
        toast(`✓ ${item.nome} adicionado`);
    }

    function renderCart() {
        const total = cart.reduce((s, i) => s + i.preco, 0);

        if (cart.length === 0) {
            cartList.innerHTML = '<p class="cart-empty">Nenhum item adicionado ainda.</p>';
        } else {
            cartList.innerHTML = '';
            cart.forEach(i => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div class="info">
                        <div class="name">${i.emoji} ${i.nome}</div>
                        <div class="meta">${i.cat}</div>
                    </div>
                    <span class="price">${brl(i.preco)}</span>
                    <button class="remove" data-uid="${i.uid}">✕</button>
                `;
                cartList.appendChild(div);
            });
            cartList.querySelectorAll('.remove').forEach(b => {
                b.addEventListener('click', () => {
                    const uid = Number(b.dataset.uid);
                    const idx = cart.findIndex(x => x.uid === uid);
                    if (idx >= 0) cart.splice(idx, 1);
                    renderCart();
                });
            });
        }

        cartCount.textContent = cart.length;
        cartTotal.textContent = brl(total);
        cartTotalLabel.textContent = brl(total);
        cartFab.style.display = cart.length > 0 ? 'flex' : 'none';
    }

    window.toggleCart = function () {
        const open = drawer.classList.toggle('open');
        drawerBg.classList.toggle('show', open);
    };

    window.finalizar = function () {
        if (cart.length === 0) {
            toast('Adicione itens antes de finalizar.');
            return;
        }
        const total = cart.reduce((s, i) => s + i.preco, 0);
        const resumo = cart.map(i => `${i.nome} (${brl(i.preco)})`).join(', ');
        toast(`✅ Pedido enviado! Total ${brl(total)}`);

        // Aqui você chamaria: POST /api/pedidos { mesa, itens, total }
        console.log('Pedido da mesa', mesa, ':', { itens: cart, total });

        cart.length = 0;
        renderCart();
        toggleCart();
    };

    window.chamarGarcom = function () {
        // POST /api/chamar-garcom { mesa, tipo }
        toast('🔔 Garçom chamado para a mesa ' + mesa);
    };

    // ===== Toast =====
    const toastEl = document.getElementById('toast');
    function toast(msg) {
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        clearTimeout(toastEl._t);
        toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 3000);
    }

    render();
    renderCart();
})();
