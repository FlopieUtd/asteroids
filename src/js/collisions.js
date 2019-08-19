import { state } from "./state";
import { getLength, multiply, notify } from "./utils";
import { shieldTrack, shieldBar, maxBulletSpeed } from "./consts";
import { destroyAsteroid } from "./asteroids";

export const isColliding = (a, b) => {
  const vector = {
    x: a.position.x - b.position.x,
    y: a.position.y - b.position.y
  };

  return getLength(vector) < a.radius + b.radius;
};

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
    }
  });
};

const detectUpgradeCollisions = () => {
  Object.values(state.upgrades).forEach(upgrade => {
    if (isColliding(state.ship, upgrade)) {
      delete state.upgrades[upgrade.id];

      if (upgrade.type === "bullet") {
        if (state.ship.bulletSpeed >= maxBulletSpeed) {
          notify("bullet speed increased!");
          state.ship.bulletSpeed -= 0.75;
        } else {
          notify("max bullet speed!");
        }
      }
      if (upgrade.type === "atom") {
        notify("time dilated!", state.asteroidVelocity);
        state.asteroidVelocity -= 0.15;
        if (state.asteroidVelocity < 1) {
          state.asteroidVelocity = 1;
        }
        state.asteroids.forEach(asteroid => {
          multiply(asteroid.velocity, 0.6);
          asteroid.rotation *= 0.6;
        });
      }
      if (upgrade.type === "shield") {
        if (state.shield === 100) {
          notify("shield fully charged");
        } else {
          state.shield += 1;
          if (state.shield > 4) {
            state.shield = 4;
          }
          shieldBar.style.width = `${state.shield * 25}%`;
          notify("shield recharged!");
        }
      }
      if (upgrade.type === "shotgun") {
        notify("shotgun activated!");
        state.bonuses.shotgun = 20;
      }
    }
  });
};

export const detectCollisions = () => {
  detectBulletCollisions();
  detectShipCollisions();
  detectUpgradeCollisions();
};
