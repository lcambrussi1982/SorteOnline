/* ===== SorteOnline + JSON-LD (Cambrussi Systems) ===== */

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

/* Acessibilidade: anunciar mensagens */
function anunciar(msg) {
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

  // 'baralho' deve existir no escopo (ex.: vindo de baralho.js)
  baralhoAtual = embaralhar([...baralho]);

  baralhoAtual.forEach((carta, index) => {
    const cartaContainer = document.createElement("div");
    cartaContainer.className = "carta";
    cartaContainer.dataset.index = String(index);
    cartaContainer.tabIndex = 0;
    cartaContainer.setAttribute("role", "button");
    cartaContainer.setAttribute("aria-pressed", "false");
    cartaContainer.setAttribute("aria-label", `Carta ${index + 1}, virada`);

    const cartaInner = document.createElement("div");
    cartaInner.className = "carta-inner";

    const frente = document.createElement("div");
    frente.className = "carta-frente";
    frente.innerHTML = `
      <strong class="label">${carta.nome}</strong>
    `;

    const verso = document.createElement("div");
    verso.className = "carta-verso";
    verso.innerText = "🂠";

    cartaInner.appendChild(frente);
    cartaInner.appendChild(verso);
    cartaContainer.appendChild(cartaInner);

    function toggleSelecao() {
      const jaVirada = cartaContainer.classList.contains("virada");

      if (cartasEscolhidas.length === 3 && !jaVirada) return;

      if (!jaVirada) {
        cartaContainer.classList.add("virada", "selecionada");
        cartaContainer.setAttribute("aria-pressed", "true");
        cartaContainer.setAttribute("aria-label", `${carta.nome}, revelada`);
        cartasEscolhidas.push({ ...carta, idx: index });
        anunciar(`Carta selecionada: ${carta.nome}`);
      } else {
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
  resultado.tabIndex = -1;
  resultado.focus({ preventScroll: true });
}

/* Desabilita cartas não selecionadas */
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

/* ===== JSON-LD (Schema.org) ===== */
function injetarJsonLd() {
  // Monte URLs automaticamente a partir da página atual
  const pageUrl = location.href.split("#")[0];
  const siteUrl = location.origin;
  const logoUrl = new URL("logo.png", pageUrl).toString();

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Cambrussi Systems — Leitura do Baralho Cigano",
        "url": pageUrl,
        "inLanguage": "pt-BR",
        "publisher": { "@id": "#org" }
      },
      {
        "@type": "Organization",
        "@id": "#org",
        "name": "Cambrussi Systems",
        "logo": { "@type": "ImageObject", "url": logoUrl },
        "url": siteUrl
      },
      {
        "@type": "Person",
        "name": "Astrólogo Leandro",
        "jobTitle": "Astrólogo",
        "image": logoUrl,
        "url": siteUrl + "/astrologo-leandro"
      }
    ]
  };

  const tag = document.createElement("script");
  tag.type = "application/ld+json";
  tag.text = JSON.stringify(jsonld);
  document.head.appendChild(tag);
}

/* Reiniciar */
btnReiniciar.addEventListener("click", criarMesa);

/* Boot */
document.addEventListener("DOMContentLoaded", () => {
  criarMesa();
  injetarJsonLd();
});
