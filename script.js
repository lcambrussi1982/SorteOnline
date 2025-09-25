const mesa = document.getElementById("mesa");
const resultado = document.getElementById("resultado");
const btnReiniciar = document.getElementById("btn-reiniciar");

let cartasEscolhidas = [];
let baralhoAtual = [];

/* Fisher–Yates: embaralha sem viés */
function embaralhar(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Anuncia mensagens em aria-live */
function anunciar(msg) {
  // limpar para forçar re-leitura
  resultado.setAttribute("aria-live", "polite");
  resultado.setAttribute("aria-atomic", "true");
  const div = document.createElement("div");
  div.className = "visually-hidden";
  div.textContent = msg;
  resultado.appendChild(div);
  setTimeout(() => div.remove(), 50);
}

/* Cria a mesa */
function criarMesa() {
  mesa.innerHTML = "";
  resultado.innerHTML = "";
  cartasEscolhidas = [];
  btnReiniciar.hidden = true;
  btnReiniciar.style.display = "none";

  baralhoAtual = embaralhar([...baralho]);

  baralhoAtual.forEach((carta, index) => {
    const cartaContainer = document.createElement("div");
    cartaContainer.className = "carta";
    cartaContainer.dataset.index = String(index);
    cartaContainer.tabIndex = 0; // acessível
    cartaContainer.setAttribute("role", "button");
    cartaContainer.setAttribute("aria-pressed", "false");
    cartaContainer.setAttribute("aria-label", `Carta ${index + 1}, virada`); // atualizado ao virar

    const cartaInner = document.createElement("div");
    cartaInner.className = "carta-inner";

    const frente = document.createElement("div");
    frente.className = "carta-frente";
    frente.innerHTML = `<strong>${carta.nome}</strong>`;

    const verso = document.createElement("div");
    verso.className = "carta-verso";
    verso.innerText = "🂠";

    cartaInner.appendChild(frente);
    cartaInner.appendChild(verso);
    cartaContainer.appendChild(cartaInner);

    function toggleSelecao() {
      const jaVirada = cartaContainer.classList.contains("virada");

      // Se já terminou (3 cartas), ignore
      if (cartasEscolhidas.length === 3 && !jaVirada) return;

      if (!jaVirada) {
        // selecionar
        cartaContainer.classList.add("virada", "selecionada");
        cartaContainer.setAttribute("aria-pressed", "true");
        cartaContainer.setAttribute("aria-label", `${carta.nome}, revelada`);
        cartasEscolhidas.push({ ...carta, idx: index });
        anunciar(`Carta selecionada: ${carta.nome}`);
      } else {
        // permitir DESSELECIONAR enquanto < 3
        if (cartasEscolhidas.length < 3) {
          cartaContainer.classList.remove("virada", "selecionada");
          cartaContainer.setAttribute("aria-pressed", "false");
          cartaContainer.setAttribute("aria-label", `Carta ${index + 1}, virada`);
          const pos = cartasEscolhidas.findIndex(c => c.idx === index);
          if (pos > -1) cartasEscolhidas.splice(pos, 1);
          anunciar(`Carta desselecionada`);
        }
      }

      if (cartasEscolhidas.length === 3) {
        mostrarResultado();
        bloquearNaoSelecionadas();
        btnReiniciar.hidden = false;
        btnReiniciar.style.display = "inline-block";
        btnReiniciar.setAttribute("aria-hidden", "false");
        btnReiniciar.focus({ preventScroll: true });
      }
    }

    cartaContainer.addEventListener("click", toggleSelecao);
    cartaContainer.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleSelecao();
      }
      // Navegação com setinhas (opcional)
      if (["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"].includes(ev.key)) {
        ev.preventDefault();
        moverFoco(ev.key, cartaContainer);
      }
    });

    mesa.appendChild(cartaContainer);
  });
}

/* Move o foco entre cartas em grid */
function moverFoco(key, el){
  const cards = Array.from(mesa.querySelectorAll(".carta"));
  const cols = getComputedStyle(mesa).gridTemplateColumns.split(" ").length;
  const i = cards.indexOf(el);
  let j = i;
  if (key === "ArrowRight") j = (i + 1) % cards.length;
  if (key === "ArrowLeft")  j = (i - 1 + cards.length) % cards.length;
  if (key === "ArrowDown")  j = Math.min(i + cols, cards.length - 1);
  if (key === "ArrowUp")    j = Math.max(i - cols, 0);
  cards[j]?.focus({preventScroll:true});
}

/* Mostra o resultado */
function mostrarResultado() {
  const parts = cartasEscolhidas.map((c, idx) =>
    `<p><strong>Carta ${idx + 1} — ${c.nome}:</strong> ${c.significado}</p>`
  ).join("");
  resultado.innerHTML = `<h3>Sua Leitura:</h3>${parts}`;
  // Acessibilidade: força leitura do bloco
  resultado.tabIndex = -1;
  resultado.focus({ preventScroll: true });
}

/* Desabilita cartas não selecionadas por classe (CSS cuida do estilo) */
function bloquearNaoSelecionadas() {
  const cards = document.querySelectorAll(".carta");
  cards.forEach(card => {
    if (!card.classList.contains("selecionada")) {
      card.classList.add("desabilitada");
      card.setAttribute("aria-disabled", "true");
      card.removeAttribute("tabindex");
    } else {
      card.setAttribute("aria-pressed", "true");
    }
  });
}

/* Reiniciar */
btnReiniciar.addEventListener("click", criarMesa);

/* Boot */
document.addEventListener("DOMContentLoaded", criarMesa);
