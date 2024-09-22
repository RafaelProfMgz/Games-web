let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Função para lidar com a tentativa do usuário
document.getElementById("submit").onclick = function () {
  const guess = Number(document.getElementById("guess").value);
  attempts++;

  const messageElement = document.getElementById("message");

  if (guess === randomNumber) {
    messageElement.textContent = `Parabéns! Você acertou o número ${randomNumber} em ${attempts} tentativas.`;
    document.getElementById("restart").style.display = "inline-block";
    disableInput(); // Desativa os campos de entrada
  } else if (guess < randomNumber) {
    messageElement.textContent = "Muito baixo! Tente novamente.";
  } else if (guess > randomNumber) {
    messageElement.textContent = "Muito alto! Tente novamente.";
  }

  // Limpa o campo de entrada após a tentativa
  document.getElementById("guess").value = "";
};

// Função para reiniciar o jogo
document.getElementById("restart").onclick = function () {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  document.getElementById("message").textContent = "";
  this.style.display = "none";
  enableInput(); // Habilita os campos de entrada
};

// Funções para habilitar e desabilitar o input
function disableInput() {
  document.getElementById("guess").disabled = true;
  document.getElementById("submit").disabled = true;
}

function enableInput() {
  document.getElementById("guess").disabled = false;
  document.getElementById("submit").disabled = false;
}

// Código para o menu responsivo
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

mobileMenu.addEventListener("click", () => {
  navList.classList.toggle("active"); // Alterna a classe 'active' para mostrar/esconder o menu
});
