/* montar hambúrguer */
(function () {
    'use strict';

    const ingredientes = [
        { tipo: 'carne', nome: 'Carne', emoji: '🥩', preco: 5 },
        { tipo: 'queijo', nome: 'Queijo', emoji: '🧀', preco: 2 },
        { tipo: 'bacon', nome: 'Bacon', emoji: '🥓', preco: 3 },
        { tipo: 'alface', nome: 'Alface', emoji: '🥬', preco: 1 },
        { tipo: 'tomate', nome: 'Tomate', emoji: '🍅', preco: 1.5 },
        { tipo: 'cebola', nome: 'Cebola', emoji: '🧅', preco: 1 }
    ];

    let burgerData = { ingredientes: [], total: 5 };
    let finalizado = false;
    let carrinho = [];

    function brl(v) {
        return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // ===== Render ingredientes =====
    const ingEl = document.getElementById('ingredientes');
    ingredientes.forEach(i => {
        const div = document.createElement('div');
        div.className = 'ingrediente';
        div.innerHTML = `
            <span class="emoji">${i.emoji}</span>
            <div class="nome">${i.nome}</div>
            <div class="valor">+ R$ ${i.preco.toFixed(2)}</div>
        `;
        div.onclick = () => addIngrediente(i);
        ingEl.appendChild(div);
    });

    // ===== Adicionar ingrediente =====
    function addIngrediente(ing) {
        if (finalizado) return;

        const burger = document.getElementById('burger');
        const camada = document.createElement('div');
        camada.classList.add('camada', ing.tipo);
        burger.appendChild(camada);

        burgerData.ingredientes.push(ing);
        burgerData.total += ing.preco;
        document.getElementById('valor').innerText = burgerData.total.toFixed(2).replace('.', ',');
        document.getElementById('btnRefazer').style.display = 'inline-flex';
    }

    window.refazerBurger = function () {
        if (finalizado) return;
        burgerData = { ingredientes: [], total: 5 };
        document.getElementById('valor').innerText = '5';
        document.getElementById('burger').innerHTML = '<div class="camada pao base"></div>';
        document.getElementById('btnRefazer').style.display = 'none';
    };

    window.finalizar = function () {
        if (finalizado) {
            toast('Finalize ou refaça o hambúrguer atual primeiro.');
            return;
        }
        if (burgerData.ingredientes.length === 0) {
            toast('Adicione pelo menos um ingrediente.');
            return;
        }

        finalizado = true;
        document.getElementById('btnRefazer').style.display = 'none';

        const burger = document.getElementById('burger');
        const paoTopo = document.createElement('div');
        paoTopo.classList.add('camada', 'pao', 'pao-topo');
        burger.appendChild(paoTopo);
        setTimeout(() => paoTopo.classList.add('cair'), 50);

        const novo = {
            uid: Date.now() + Math.random(),
            nome: '🍔 Hambúrguer personalizado',
            preco: burgerData.total,
            ingredientes: burgerData.ingredientes.map(i => i.nome).join(', '),
            custom: true
        };
        carrinho.push(novo);
        renderCarrinho();
        toast(`✓ Hambúrguer adicionado (${brl(novo.preco)})`);

        document.getElementById('prato').innerHTML = `
            <button onclick="novoBurger()">➕ Montar outro</button>
        `;
    };

    window.novoBurger = function () {
        finalizado = false;
        burgerData = { ingredientes: [], total: 5 };
        document.getElementById('valor').innerText = '5';
        document.getElementById('burger').innerHTML = '<div class="camada pao base"></div>';
        document.getElementById('prato').innerHTML = '<span>👇 Seu hambúrguer aparece aqui</span>';
    };

    // ===== Carrinho =====
    const drawer = document.getElementById('cart-drawer');
    const drawerBg = document.getElementById('drawer-bg');
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    window.toggleCart = function () {
        const open = drawer.classList.toggle('open');
        drawerBg.classList.toggle('show', open);
    };

    function renderCarrinho() {
        const total = carrinho.reduce((s, i) => s + i.preco, 0);

        if (carrinho.length === 0) {
            cartList.innerHTML = '<p class="cart-empty">Nenhum item adicionado ainda.</p>';
        } else {
            cartList.innerHTML = '';
            carrinho.forEach(i => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div>
                        <div class="name">${i.nome}</div>
                        <div class="meta">${i.ingredientes || ''}</div>
                    </div>
                    <span class="price">${brl(i.preco)}</span>
                    <button class="remove" data-uid="${i.uid}">✕</button>
                `;
                cartList.appendChild(div);
            });
            cartList.querySelectorAll('.remove').forEach(b => {
                b.onclick = () => {
                    const idx = carrinho.findIndex(x => x.uid === Number(b.dataset.uid));
                    if (idx >= 0) carrinho.splice(idx, 1);
                    renderCarrinho();
                };
            });
        }

        cartCount.textContent = carrinho.length;
        cartTotal.textContent = brl(total);
    }

    window.finalizarPedido = function () {
        if (carrinho.length === 0) {
            toast('Adicione itens antes de finalizar.');
            return;
        }
        const total = carrinho.reduce((s, i) => s + i.preco, 0);
        toast(`✅ Pedido enviado! Total ${brl(total)}`);
        console.log('Pedido enviado:', carrinho);
        carrinho.length = 0;
        renderCarrinho();
        toggleCart();
    };

    // ===== Toast =====
    const toastEl = document.getElementById('toast');
    function toast(msg) {
        toastEl.textContent = msg;
        toastEl.classList.add('show');
        clearTimeout(toastEl._t);
        toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 3000);
    }

    renderCarrinho();
})();
