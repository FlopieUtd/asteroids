import { handleKeyDown, handleKeyUp } from "./js/keyBindings";
import { screen, state } from "./js/state";
import { detectCollisions } from "./js/collisions";
import { canvas, context, scoreSpan, body } from "./js/consts";
import { updateBullets, renderBullets } from "./js/bullets";
import { updateAsteroids, renderAsteroids } from "./js/asteroids";
import { updateUpgrades, renderUpgrades } from "./js/upgrades";
import { updateShip, renderShip } from "./js/ship";
import { notify } from "./js/utils";

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("resize", () => {
  screen.width = body.clientWidth;
  screen.height = body.clientHeight;
  canvas.width = screen.width;
  canvas.height = screen.height;
});

const update = () => {
  scoreSpan.innerHTML = state.score;
  updateShip();
  updateBullets();
  updateAsteroids();
  updateUpgrades();
};

const render = () => {
  context.fillStyle = "#111111";
  context.globalAlpha = 0.7;
  context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.globalAlpha = 1;

  renderShip();
  renderBullets();
  renderAsteroids();
  renderUpgrades();
};

const loop = () => {
  update();
  detectCollisions();
  render();
  if (state.shield <= 0) {
    notify(`game over! score: ${state.score}`, false);
  } else {
    window.requestAnimationFrame(loop);
  }
};

loop();
