const mesa = document.getElementById("mesa");
const resultado = document.getElementById("resultado");
const btnReiniciar = document.getElementById("btn-reiniciar");

let cartasEscolhidas = [];

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function criarMesa() {
  mesa.innerHTML = ""; // limpa mesa
  resultado.innerHTML = ""; // limpa resultado
  cartasEscolhidas = [];
  btnReiniciar.style.display = "none";

  const baralhoEmbaralhado = embaralhar([...baralho]);

  baralhoEmbaralhado.forEach((carta, index) => {
    const cartaContainer = document.createElement("div");
    cartaContainer.classList.add("carta");
    cartaContainer.dataset.index = index;

    const cartaInner = document.createElement("div");
    cartaInner.classList.add("carta-inner");

    const frente = document.createElement("div");
    frente.classList.add("carta-frente");
    frente.innerHTML = `<strong>${carta.nome}</strong>`;

    const verso = document.createElement("div");
    verso.classList.add("carta-verso");
    verso.innerText = "🂠";

    cartaInner.appendChild(frente);
    cartaInner.appendChild(verso);
    cartaContainer.appendChild(cartaInner);

    cartaContainer.addEventListener("click", () => {
      if (cartasEscolhidas.length < 3 && !cartaContainer.classList.contains("virada")) {
        cartaContainer.classList.add("virada");
        cartasEscolhidas.push(carta);

        if (cartasEscolhidas.length === 3) {
          mostrarResultado();
          bloquearCartas();
          btnReiniciar.style.display = "inline-block";
        }
      }
    });

    mesa.appendChild(cartaContainer);
  });
}

function mostrarResultado() {
  resultado.innerHTML = "<h3>Sua Leitura:</h3>";
  cartasEscolhidas.forEach((carta, index) => {
    resultado.innerHTML += `
      <p><strong>Carta ${index + 1} - ${carta.nome}:</strong> ${carta.significado}</p>
    `;
  });
}

function bloquearCartas() {
  document.querySelectorAll(".carta").forEach(carta => {
    carta.style.pointerEvents = "none";
  });
}

btnReiniciar.addEventListener("click", () => {
  criarMesa();
});

// Inicia a leitura assim que a página carrega
window.onload = () => {
  criarMesa();
};
