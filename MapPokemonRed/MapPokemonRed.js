const mapaElement = document.getElementById("mapa");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

// Define a estrutura do mapa (0: grama, 1: água, 2: montanha, 3: cidade, 4: rua, 5: casa)
const mapaLayout = Array.from({ length: 160 }, () => Array(240).fill(0)); // Inicializa o mapa com grama (0)

// Exemplo: definir algumas áreas específicas
mapaLayout[10][10] = 1; // Lago
mapaLayout[15][15] = 2; // Montanha
mapaLayout[20][20] = 3; // Cidade

// Adicionando ruas
for (let i = 0; i < 240; i++) {
  mapaLayout[80][i] = 4; // Rua horizontal na linha 80
}
for (let i = 0; i < 160; i++) {
  mapaLayout[i][120] = 4; // Rua vertical na coluna 120
}

mapaLayout[50][50] = 5; // Casa
mapaLayout[50][51] = 5; // Casa
mapaLayout[51][50] = 5; // Casa
mapaLayout[51][51] = 5; // Casa
mapaLayout[60][60] = 5; // Outra casa
mapaLayout[60][61] = 5; // Outra casa
mapaLayout[61][60] = 5; // Outra casa
mapaLayout[61][61] = 5; // Outra casa

let scale = 1; // Escala inicial

// Função para criar o mapa
function criarMapa() {
  mapaLayout.forEach((linha) => {
    linha.forEach((tile) => {
      const tileElement = document.createElement("div");
      tileElement.classList.add("tile");

      switch (tile) {
        case 0:
          tileElement.classList.add("grass");
          break;
        case 1:
          tileElement.classList.add("water");
          break;
        case 2:
          tileElement.classList.add("mountain");
          break;
        case 3:
          tileElement.classList.add("city");
          break;
        case 4:
          tileElement.classList.add("road"); // Classe para ruas
          break;
        case 5:
          tileElement.classList.add("house"); // Classe para casas
          break;
      }

      mapaElement.appendChild(tileElement);
    });
  });
}

// Funções de zoom
zoomInButton.addEventListener("click", () => {
  scale += 0.1; // Aumenta a escala
  aplicarZoom();
});

zoomOutButton.addEventListener("click", () => {
  scale = Math.max(1, scale - 0.1); // Diminui a escala, mas não permite que fique menor que 1
  aplicarZoom();
});

function aplicarZoom() {
  mapaElement.style.transform = `scale(${scale})`; // Aplica a transformação de escala
}

// Chama a função para criar o mapa
criarMapa();
