import { screen, state } from "./state";
import { setLength, add, portalize } from "./utils";
import { context, newAsteroidEveryNSeconds, chanceOfUpgrade } from "./consts";
import { generateUpgrade } from "./upgrades";

export const generateAsteroid = (x, y, radius, size) => {
  state.asteroids.push({
    position: {
      x,
      y
    },
    radius: radius + (Math.random() * radius) / 2,
    velocity: setLength(state.asteroidVelocity, Math.random() * (Math.PI * 2)),
    angle: Math.random() * (Math.PI * 2),
    sides: 7,
    size,
    rotation: ((Math.random() - 0.5) / (radius / 2) ** 3) * 25
  });
  state.asteroidVelocity += 0.0025;
};

export const updateAsteroids = () => {
  state.asteroids.forEach(asteroid => {
    add(asteroid.position, asteroid.velocity);
    portalize(asteroid, screen.width, screen.height);
    // eslint-disable-next-line
    asteroid.angle = asteroid.angle + asteroid.rotation;
  });

  if (
    state.asteroids.filter(asteroid =>
      ["big", "medium"].includes(asteroid.size)
    ).length < 5
  ) {
    generateAsteroid(0, 0, 50, "big");
  }

  state.newAsteroidIn -= 1;
  if (state.newAsteroidIn < 1) {
    state.newAsteroidIn = 60 * newAsteroidEveryNSeconds;
    generateAsteroid(0, 0, 50, "big");
  }
};

export const renderAsteroids = () => {
  state.asteroids.forEach(asteroid => {
    context.beginPath();
    context.lineWidth = Math.random() > 0.2 ? 2 : 1;
    context.strokeStyle = "cyan";

    let j = asteroid.sides;

    context.moveTo(
      asteroid.position.x +
        Math.cos(Math.PI * 2 * (j / asteroid.sides) + asteroid.angle) *
          asteroid.radius,
      asteroid.position.y +
        Math.sin(Math.PI * 2 * (j / asteroid.sides) + asteroid.angle) *
          asteroid.radius
    );

    for (j; j > -1; j -= 1) {
      context.lineTo(
        asteroid.position.x +
          Math.cos(Math.PI * 2 * (j / asteroid.sides) + asteroid.angle) *
            asteroid.radius,
        asteroid.position.y +
          Math.sin(Math.PI * 2 * (j / asteroid.sides) + asteroid.angle) *
            asteroid.radius
      );
    }

    context.stroke();

    context.closePath();
  });
};

export const destroyAsteroid = asteroid => {
  const chance = Math.random();
  if (asteroid.size === "big") {
    generateAsteroid(asteroid.position.x, asteroid.position.y, 35, "medium");
    generateAsteroid(asteroid.position.x, asteroid.position.y, 35, "medium");
    if (chance > 0.75) {
      generateAsteroid(asteroid.position.x, asteroid.position.y, 35, "medium");
    }
  }
  if (asteroid.size === "medium") {
    generateAsteroid(asteroid.position.x, asteroid.position.y, 20, "small");
    generateAsteroid(asteroid.position.x, asteroid.position.y, 20, "small");
    if (chance > 0.75) {
      generateAsteroid(asteroid.position.x, asteroid.position.y, 20, "small");
    }
  }
  if (asteroid.size === "small") {
    state.points += 100;
    if (Math.random() > 1 - chanceOfUpgrade) {
      generateUpgrade(asteroid);
    }
  }
};
