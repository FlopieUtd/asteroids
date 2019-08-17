import { setLength, add, multiply, portalize, isColliding } from "./js/utils";
import { handleKeyDown, handleKeyUp } from "./js/keyBindings";
import { screen, state } from "./js/state";
import {
  maxBulletSpeed,
  canvas,
  context,
  shieldBar,
  shieldTrack,
  pointsSpan,
  body
} from "./js/consts";
import { generateBullets, updateBullets, renderBullets } from "./js/bullets";
import {
  updateAsteroids,
  renderAsteroids,
  destroyAsteroid
} from "./js/asteroids";
import { updateUpgrades, renderUpgrades } from "./js/upgrades";

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("resize", () => {
  screen.width = body.clientWidth;
  screen.height = body.clientHeight;
  canvas.width = screen.width;
  canvas.height = screen.height;
});
const detectBulletCollisions = () => {
  state.bullets.forEach((bullet, bulletIndex) => {
    state.asteroids.forEach((asteroid, asteroidIndex) => {
      if (isColliding(bullet, asteroid)) {
        destroyAsteroid(asteroid);
        state.asteroids.splice(asteroidIndex, 1);
        state.bullets.splice(bulletIndex, 1);
      }
    });
  });
};

const detectShipCollisions = () => {
  state.asteroids.forEach((asteroid, index) => {
    if (isColliding(state.ship, asteroid)) {
      destroyAsteroid(asteroid);
      state.asteroids.splice(index, 1);
      state.shield -= 1;
      shieldTrack.style.opacity = 1;
      shieldBar.style.width = `${state.shield * 25}%`;
      if (state.shield <= 0) {
        setTimeout(() => {
          alert("game over!");
        }, 200);
      }
    }
  });
};

const detectUpgradeCollisions = () => {
  Object.values(state.upgrades).forEach(upgrade => {
    if (isColliding(state.ship, upgrade)) {
      delete state.upgrades[upgrade.id];

      if (upgrade.type === "bullet") {
        if (state.ship.bulletSpeed >= maxBulletSpeed) {
          console.log("bullet speed increased!");
          state.ship.bulletSpeed -= 0.5;
        } else {
          console.log("max bullet speed!");
        }
      }
      if (upgrade.type === "atom") {
        console.log("time dilated!", state.asteroidVelocity);
        state.asteroidVelocity -= 0.15;
        if (state.asteroidVelocity < 1) {
          state.asteroidVelocity = 1;
        }
        state.asteroids.forEach(asteroid => {
          multiply(asteroid.velocity, 0.6);
          // eslint-disable-next-line
          asteroid.rotation = asteroid.rotation * 0.6;
        });
      }
      if (upgrade.type === "shield") {
        if (state.shield === 100) {
          console.log("shield fully charged");
        } else {
          state.shield += 1;
          if (state.shield > 4) {
            state.shield = 4;
          }
          shieldBar.style.width = `${state.shield * 25}%`;
          console.log("shield recharged!");
        }
      }
      if (upgrade.type === "shotgun") {
        console.log("shotgun activated!");
        state.bonuses.shotgun = 20;
      }
    }
  });
};

const detectCollisions = () => {
  detectBulletCollisions();
  detectShipCollisions();
  detectUpgradeCollisions();
};

const updateShip = () => {
  const { left, right, up, space } = state.input;
  if (left) {
    state.ship.angle -= 0.1;
  }
  if (right) {
    state.ship.angle += 0.1;
  }
  if (up) {
    state.ship.thrust = setLength(0.08, state.ship.angle);
  } else {
    state.ship.thrust = setLength(0, state.ship.angle);
    multiply(state.ship.velocity, 0.98);
  }

  add(state.ship.velocity, state.ship.thrust);
  add(state.ship.position, state.ship.velocity);

  portalize(state.ship, screen.width, screen.height);

  state.ship.bulletDelay += 1;

  if (space && state.ship.bulletDelay > state.ship.bulletSpeed) {
    generateBullets();
    state.ship.bulletDelay = 0;
  }
};

const renderShip = () => {
  const { x, y } = state.ship.position;

  context.save();
  context.translate(x, y);
  context.rotate(state.ship.angle);

  context.strokeStyle = "magenta";
  context.lineWidth = Math.random() > 0.9 ? 2 : 1;
  context.beginPath();
  context.moveTo(10, 0);
  context.lineTo(-10, -8);
  context.lineTo(-10, 8);
  context.lineTo(10, 0);
  context.stroke();
  context.closePath();

  context.restore();
};

const update = () => {
  pointsSpan.innerHTML = state.points;
  updateShip();
  updateBullets();
  updateAsteroids();
  updateUpgrades();
};

const render = () => {
  context.fillStyle = "#111";
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

  window.requestAnimationFrame(loop);
};

loop();
