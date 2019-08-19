import { screen, state } from "./state";
import { setLength, add } from "./utils";
import { context } from "./consts";

export const generateBullets = () => {
  if (state.bonuses.shotgun > 0) {
    state.bonuses.shotgun -= 1;
    for (let i = 0; i < 3; i += 1) {
      state.bullets.push({
        position: {
          x: state.ship.position.x,
          y: state.ship.position.y
        },
        velocity: setLength(12, state.ship.angle + (-1 + i) / 15),
        radius: 1
      });
    }
  } else {
    state.bullets.push({
      position: {
        x: state.ship.position.x,
        y: state.ship.position.y
      },
      velocity: setLength(14, state.ship.angle),
      radius: 1
    });
  }
};

export const updateBullets = () => {
  state.bullets.forEach((bullet, index) => {
    add(bullet.position, bullet.velocity);

    if (
      bullet.position.x > screen.width ||
      bullet.position.x < 0 ||
      bullet.position.y > screen.height ||
      bullet.position.y < 0
    ) {
      state.bullets.splice(index, 1);
    }
  });
};

export const renderBullets = () => {
  state.bullets.forEach(bullet => {
    context.beginPath();
    context.strokeStyle = "white";
    context.arc(
      Math.floor(bullet.position.x),
      Math.floor(bullet.position.y),
      1,
      0,
      Math.PI * 2
    );
    if (Math.random() > 0.2) context.stroke();
    context.closePath();
  });
};
