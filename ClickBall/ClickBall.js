const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Função para gerar uma posição aleatória na tela
function randomPosition() {
  const x = Math.random() * (window.innerWidth - ball.offsetWidth);
  const y = Math.random() * (window.innerHeight - ball.offsetHeight);
  return { x, y };
}

// Função para mover a bolinha
function moveBall() {
  const { x, y } = randomPosition();
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

// Quando o jogador clica na bolinha
ball.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBall();
});

// Menu responsivo
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

mobileMenu.addEventListener("click", () => {
  navList.classList.toggle("active"); // Alterna a classe 'active' para mostrar/esconder o menu
});
// Move a bolinha quando a página carrega
moveBall();
