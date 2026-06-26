const STORAGE_KEY = "carrinhoPequenaFlor";

function obterCarrinho() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function adicionarAoCarrinho(produto) {
    const carrinho = obterCarrinho();

    carrinho.push(produto);

    salvarCarrinho(carrinho);

    mostrarToast("Produto adicionado ao carrinho!");
}

function removerDoCarrinho(index) {
    const carrinho = obterCarrinho();

    carrinho.splice(index, 1);

    salvarCarrinho(carrinho);

    renderizarCarrinho();
}

function atualizarContadorCarrinho() {
    const badge = document.getElementById("cart-badge");

    if (!badge) return;

    badge.textContent = obterCarrinho().length;
}

function renderizarCarrinho() {

    const carrinho = obterCarrinho();

    const area = document.getElementById("cart-items");

    let total = 0;

    area.innerHTML = "";

    carrinho.forEach((item,index)=>{

        total += item.preco * item.quantidade;

        area.innerHTML += `
        <div class="cart-card">

            <img src="${item.imagem}" class="cart-img">

            <div class="cart-info">
                <strong>${item.nome}</strong>

                <small>${item.tipo}</small>

                <small>Tam: ${item.tamanho}</small>

                <small>R$ ${item.preco}</small>
            </div>

            <button
                class="cart-remove"
                onclick="removerDoCarrinho(${index})">
                ✕
            </button>

        </div>
        `;
    });

    document.getElementById("cart-total").innerHTML =
        `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

function enviarPedido(){

    const carrinho = obterCarrinho();

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio.");
        return;
    }

    let total = 0;

    let mensagem =
`*ATELIÊ PEQUENA FLOR*

Olá! Gostaria de fazer o seguinte pedido:

`;

    carrinho.forEach((item,index)=>{

        total += item.preco;

        mensagem +=
`${index+1}. *${item.tipo}*
${item.nome}
Tamanho: ${item.tamanho}
Cor: ${item.cor}
R$ ${item.preco}

`;

        if(item.medalha){
            mensagem += `Medalha: ${item.medalha}\n\n`;
        }
    });

    mensagem +=
`━━━━━━━━━━━━━━
*TOTAL: R$ ${total.toFixed(2)}*`;

    window.open(
        `https://wa.me/5534988940245?text=${encodeURIComponent(mensagem)}`
    );
}