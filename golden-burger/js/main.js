/* ===========================
   Golden Burger — main.js
   =========================== */

(function () {
    'use strict';

    // ===== Header scroll state =====
    const header = document.getElementById('site-header');
    const fab = document.getElementById('fab');

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 30);
        if (fab) fab.classList.toggle('visible', y > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ===== Mobile menu =====
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.primary-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        nav.querySelectorAll('a').forEach(a =>
            a.addEventListener('click', () => {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    // ===== FAB (back to top) =====
    if (fab) {
        fab.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Cart state (cliente) =====
    const cart = [];
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    function brl(v) {
        return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function renderCart() {
        if (!cartList) return;
        cartList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartList.innerHTML = '<li class="cart-empty">Nenhum item adicionado ainda.</li>';
        } else {
            cart.forEach((item, i) => {
                total += item.price;
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name}</span>
                    <span>
                        <strong style="color:var(--accent);margin-right:12px">${brl(item.price)}</strong>
                        <button class="remove-item" data-i="${i}" aria-label="Remover">✕</button>
                    </span>
                `;
                cartList.appendChild(li);
            });
        }

        if (cartCount) cartCount.textContent = cart.length;
        if (cartTotal) cartTotal.textContent = brl(total);

        cartList.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart.splice(Number(e.target.dataset.i), 1);
                renderCart();
            });
        });
    }

    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product');
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);
            cart.push({ name, price });
            renderCart();
            toast(`${name} adicionado!`);
        });
    });

    // ===== Reveal on scroll =====
    const revealEls = document.querySelectorAll(
        '.section-head, .card, .product, .stats-row > div, .about-text, .about-image, .image-placeholder, .booking-form, .cart-summary, .hours-card, .location-card'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // ===== Toast =====
    function toast(msg) {
        let t = document.querySelector('.toast');
        if (!t) {
            t = document.createElement('div');
            t.className = 'toast';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add('show');
        clearTimeout(t._timer);
        t._timer = setTimeout(() => t.classList.remove('show'), 3500);
    }

    // ===== Order form =====
    const form = document.getElementById('order-form');
    if (form) {
        const telefone = form.querySelector('#telefone');
        if (telefone) {
            telefone.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 11);
                if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
                if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
                else if (v.length > 9) v = v.slice(0, 9) + '-' + v.slice(9);
                e.target.value = v;
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const dados = Object.fromEntries(new FormData(form).entries());

            if (!dados.nome || !dados.telefone || !dados.endereco || !dados.tipo) {
                toast('Preencha todos os campos obrigatórios.');
                return;
            }

            const itens = cart.map(i => `${i.name} (${brl(i.price)})`).join(', ') || 'Nenhum item do cardápio';
            toast(`Pedido de ${dados.nome} recebido! Em preparo...`);
            console.log('Pedido:', { ...dados, itens, cart });
            cart.length = 0;
            renderCart();
            form.reset();
        });
    }

    // ===== Smooth scroll with header offset =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    renderCart();
})();
