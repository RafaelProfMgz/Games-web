const pacman = document.getElementById("pacman");
let posX = 180;
let posY = 180;
let speed = 10;

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      posY = Math.max(0, posY - speed);
      break;
    case "ArrowDown":
      posY = Math.min(360, posY + speed);
      break;
    case "ArrowLeft":
      posX = Math.max(0, posX - speed);
      pacman.style.transform = "rotate(180deg)";
      break;
    case "ArrowRight":
      posX = Math.min(360, posX + speed);
      pacman.style.transform = "rotate(0deg)";
      break;
  }
  pacman.style.top = `${posY}px`;
  pacman.style.left = `${posX}px`;
});
