import { minBulletSpeed, newAsteroidEveryNSeconds, body } from "./consts";

export const screen = {
  width: body.clientWidth,
  height: body.clientHeight
};

export const state = {
  input: {
    left: false,
    up: false,
    right: false,
    space: false
  },
  ship: {
    angle: 0,
    thrust: { x: 0, y: 0 },
    velocity: { x: 12, y: 0 },
    position: {
      x: 0,
      y: screen.height / 2
    },
    bulletDelay: 0,
    bulletSpeed: minBulletSpeed,
    radius: 5
  },
  bullets: [],
  asteroids: [],
  newAsteroidIn: 60 * newAsteroidEveryNSeconds,
  upgrades: {},
  bonuses: { shotgun: 0 },
  asteroidVelocity: 1,
  shield: 4,
  points: 0
};
