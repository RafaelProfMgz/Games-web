const palavras = ["javascript", "programacao", "desenvolvedor", "web", "jogo"];
let palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
let letrasAdivinhadas = [];
let erros = 0;

const forcaCanvas = document.getElementById("forcaCanvas");
const ctx = forcaCanvas.getContext("2d");
const palavraDiv = document.getElementById("palavra");
const resultadoDiv = document.getElementById("resultado");

function desenharForca() {
  ctx.clearRect(0, 0, forcaCanvas.width, forcaCanvas.height); // Limpa o canvas
  ctx.beginPath();

  // Base
  ctx.moveTo(30, 150);
  ctx.lineTo(170, 150);
  ctx.stroke();

  // Poste vertical
  ctx.moveTo(50, 150);
  ctx.lineTo(50, 20);
  ctx.stroke();

  // Poste horizontal
  ctx.moveTo(50, 20);
  ctx.lineTo(130, 20);
  ctx.stroke();

  // Cordão
  ctx.moveTo(130, 20);
  ctx.lineTo(130, 40);
  ctx.stroke();

  // Cabeça
  if (erros >= 1) {
    ctx.beginPath();
    ctx.arc(130, 50, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Corpo
  if (erros >= 2) {
    ctx.moveTo(130, 60);
    ctx.lineTo(130, 110);
    ctx.stroke();
  }

  // Braço esquerdo
  if (erros >= 3) {
    ctx.moveTo(130, 70);
    ctx.lineTo(110, 90);
    ctx.stroke();
  }

  // Braço direito
  if (erros >= 4) {
    ctx.moveTo(130, 70);
    ctx.lineTo(150, 90);
    ctx.stroke();
  }

  // Perna esquerda
  if (erros >= 5) {
    ctx.moveTo(130, 110);
    ctx.lineTo(110, 130);
    ctx.stroke();
  }

  // Perna direita
  if (erros >= 6) {
    ctx.moveTo(130, 110);
    ctx.lineTo(150, 130);
    ctx.stroke();
  }
}

function mostrarPalavra() {
  palavraDiv.innerHTML = palavraEscolhida
    .split("")
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : "_"))
    .join(" ");
}

function verificarResultado() {
  if (letrasAdivinhadas.length === new Set(palavraEscolhida.split("")).size) {
    resultadoDiv.innerHTML = "Você ganhou!";
  } else if (erros >= 6) {
    resultadoDiv.innerHTML = `Você perdeu! A palavra era: ${palavraEscolhida}`;
  }
}

document.getElementById("adivinharBtn").addEventListener("click", () => {
  const letraInput = document.getElementById("letraInput").value;
  if (letraInput && !letrasAdivinhadas.includes(letraInput)) {
    letrasAdivinhadas.push(letraInput);
    if (!palavraEscolhida.includes(letraInput)) {
      erros++;
    }
    desenharForca();
    mostrarPalavra();
    verificarResultado();
  }
  document.getElementById("letraInput").value = "";
});

// Lógica para adivinhar a palavra completa
document.getElementById("adivinharPalavraBtn").addEventListener("click", () => {
  const palavraCompletaInput = document.getElementById("palavraCompleta").value;
  if (palavraCompletaInput === palavraEscolhida) {
    resultadoDiv.innerHTML = "Você ganhou!";
  } else {
    erros = 6; // Força a perda do jogo
    desenharForca();
    resultadoDiv.innerHTML = `Você perdeu! A palavra era: ${palavraEscolhida}`;
  }
});

// Lógica para próximo jogo
document.getElementById("proximoJogoBtn").addEventListener("click", () => {
  palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
  letrasAdivinhadas = [];
  erros = 0;
  resultadoDiv.innerHTML = "";
  desenharForca();
  mostrarPalavra();
});

// Inicializa o jogo
mostrarPalavra();
