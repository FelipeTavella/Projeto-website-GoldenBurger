/* ladoA — index (mesa inicial) */
(function () {
    'use strict';

    // ===== Mesa (virá do QR code futuramente) =====
    const params = new URLSearchParams(window.location.search);
    const mesa = params.get('mesa') || 'XX';
    document.getElementById('mesa-num').textContent = mesa;

    // ===== Modal / Toast =====
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalConfirm = document.getElementById('modal-confirm');
    const toast = document.getElementById('toast');

    let acaoAtual = null;

    function mostrarToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    window.fecharModal = function (e) {
        if (e && e.target !== modal) return;
        modal.classList.remove('show');
        acaoAtual = null;
    };

    function abrirModal(titulo, texto, acao) {
        modalTitle.textContent = titulo;
        modalText.textContent = texto;
        acaoAtual = acao;
        modal.classList.add('show');
    }

    window.confirmarAcao = function () {
        if (acaoAtual) acaoAtual();
        modal.classList.remove('show');
        acaoAtual = null;
    };

    // ===== Ações =====
    window.chamarGarcom = function () {
        abrirModal(
            'Chamar Garçom?',
            'Nossa equipe será avisada e virá até a sua mesa.',
            () => {
                // Aqui você chama a API do Lado B futuramente
                mostrarToast(`🔔 Garçom a caminho da mesa ${mesa}!`);
            }
        );
    };

    window.verPedidos = function () {
        // Aqui navega para tela de pedidos da mesa
        alert('Pedidos da mesa ' + mesa + ' (em breve)');
    };
})();
