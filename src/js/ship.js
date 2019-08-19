import { state, screen } from "./state";
import { context } from "./consts";
import { add, multiply, portalize, setLength } from "./utils";
import { generateBullets } from "./bullets";

export const updateShip = () => {
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

export const renderShip = () => {
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
