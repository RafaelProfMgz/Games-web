const palavrasPorGenero = {
  programacao: [
    { palavra: "javascript", dica: "Linguagem de programação" },
    { palavra: "programacao", dica: "Processo de escrever código" },
    { palavra: "desenvolvedor", dica: "Profissional que cria software" },
    { palavra: "web", dica: "Rede mundial de informações" },
  ],
  jogos: [
    { palavra: "jogo", dica: "Atividade recreativa" },
    { palavra: "videojogo", dica: "Forma de entretenimento interativo" },
    { palavra: "console", dica: "Dispositivo para jogar" },
    { palavra: "plataforma", dica: "Sistema de jogos online" },
  ],
  tecnologia: [
    { palavra: "computador", dica: "Máquina que processa dados" },
    { palavra: "internet", dica: "Rede mundial de computadores" },
    { palavra: "tecnologia", dica: "Aplicação de conhecimento técnico" },
    { palavra: "software", dica: "Conjunto de programas" },
  ],
  filmes: [
    { palavra: "drama", dica: "Gênero cinematográfico sério" },
    { palavra: "ação", dica: "Gênero cheio de adrenalina" },
    { palavra: "comédia", dica: "Gênero humorístico" },
    { palavra: "documentário", dica: "Filme informativo" },
  ],
};

let palavraEscolhida = {};
let letrasAdivinhadas = [];
let erros = 0;

const elements = {
  forcaCanvas: document.getElementById("forcaCanvas"),
  ctx: document.getElementById("forcaCanvas").getContext("2d"),
  palavraDiv: document.getElementById("palavra"),
  resultadoDiv: document.getElementById("resultado"),
  dicaDiv: document.getElementById("dica"),
  modalVitoria: document.getElementById("modalVitoria"),
  fecharModal: document.getElementById("fecharModal"),
  modalPerda: document.getElementById("modalPerda"),
  palavraPerdidaSpan: document.getElementById("palavraPerdida"),
};

function iniciarJogo(genre) {
  const palavras = palavrasPorGenero[genre];
  palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];
  letrasAdivinhadas = [];
  erros = 0;

  elements.resultadoDiv.innerHTML = "";
  desenharForca();
  mostrarPalavra();
  mostrarDica();
}

document.querySelectorAll(".genre").forEach((genero) => {
  genero.addEventListener("click", () => {
    const selectedGenre = genero.getAttribute("data-value");
    document.querySelector(".container2").style.display = "none";
    document.querySelector(".game-content").style.display = "block";
    iniciarJogo(selectedGenre);
  });
});

function desenharForca() {
  const { ctx } = elements;
  ctx.clearRect(0, 0, elements.forcaCanvas.width, elements.forcaCanvas.height);
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

  // Desenhar partes do corpo
  const partes = [
    () => ctx.arc(130, 50, 10, 0, Math.PI * 2), // Cabeça
    () => ctx.moveTo(130, 60) && ctx.lineTo(130, 110), // Corpo
    () => ctx.moveTo(130, 70) && ctx.lineTo(110, 90), // Braço esquerdo
    () => ctx.moveTo(130, 70) && ctx.lineTo(150, 90), // Braço direito
    () => ctx.moveTo(130, 110) && ctx.lineTo(110, 130), // Perna esquerda
    () => ctx.moveTo(130, 110) && ctx.lineTo(150, 130), // Perna direita
  ];

  for (let i = 0; i < erros; i++) {
    ctx.beginPath();
    partes[i]();
    ctx.stroke();
  }
}

function mostrarPalavra() {
  elements.palavraDiv.innerHTML = palavraEscolhida.palavra
    .split("")
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : "_"))
    .join(" ");
}

function mostrarDica() {
  elements.dicaDiv.innerHTML = `Dica: ${palavraEscolhida.dica}`;
}

function verificarResultado() {
  if (letrasAdivinhadas.length === new Set(palavraEscolhida.palavra).size) {
    elements.resultadoDiv.innerHTML = "Você ganhou!";
    abrirModalVitoria();
  } else if (erros >= 6) {
    elements.resultadoDiv.innerHTML = `Você perdeu! A palavra era: ${palavraEscolhida.palavra}`;
    abrirModalPerda();
  }
}

function processarInput(letraInput) {
  if (letraInput && !letrasAdivinhadas.includes(letraInput)) {
    letrasAdivinhadas.push(letraInput);
    if (!palavraEscolhida.palavra.includes(letraInput)) {
      erros++;
    }
    desenharForca();
    mostrarPalavra();
    verificarResultado();
  }
}

document.getElementById("adivinharBtn").addEventListener("click", () => {
  const letraInput = document.getElementById("letraInput").value;
  processarInput(letraInput);
  document.getElementById("letraInput").value = "";
});

document.getElementById("adivinharPalavraBtn").addEventListener("click", () => {
  const palavraCompletaInput = document.getElementById("palavraCompleta").value;
  if (palavraCompletaInput === palavraEscolhida.palavra) {
    elements.resultadoDiv.innerHTML = "Você ganhou!";
    abrirModalVitoria();
  } else {
    erros = 6; // Força a perda do jogo
    desenharForca();
    elements.resultadoDiv.innerHTML = `Você perdeu! A palavra era: ${palavraEscolhida.palavra}`;
    abrirModalPerda();
  }
});

function abrirModalVitoria() {
  elements.modalVitoria.style.display = "block";
  const trofeuCanvas = document.getElementById("trofeuCanvas");
  const ctxTrofeu = trofeuCanvas.getContext("2d");
  drawTrophy(ctxTrofeu); // Desenhe o troféu no canvas do modal
}

function abrirModalPerda() {
  elements.modalPerda.style.display = "block";
  elements.palavraPerdidaSpan.textContent = palavraEscolhida.palavra; // Exibe a palavra perdida
}

function drawTrophy(ctx) {
  ctx.clearRect(0, 0, 200, 300); // Limpa o canvas
  ctx.fillStyle = "#b8860b"; // Ouro
  ctx.fillRect(70, 220, 60, 10); // Base
  ctx.beginPath();
  ctx.moveTo(100, 180);
  ctx.lineTo(60, 220);
  ctx.lineTo(140, 220);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ffcc00"; // Dourado
  ctx.fillRect(50, 190, 10, 20); // Alça esquerda
  ctx.fillRect(140, 190, 10, 20); // Alça direita
  ctx.beginPath();
  ctx.arc(100, 150, 30, 0, Math.PI, true);
  ctx.lineTo(70, 180);
  ctx.lineTo(130, 180);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#f0e68c";
  ctx.fillRect(90, 170, 20, 10);
}

// Eventos de fechamento dos modais
elements.fecharModal.addEventListener("click", () => {
  elements.modalVitoria.style.display = "none";
});

elements.fecharModalPerda.addEventListener("click", () => {
  elements.modalPerda.style.display = "none";
});

// Inicializa o jogo ao carregar a página
function inicializarJogo() {
  letrasAdivinhadas = [];
  erros = 0;
  elements.resultadoDiv.innerHTML = "";
  desenharForca();
  mostrarPalavra();
  mostrarDica();
}

inicializarJogo();
