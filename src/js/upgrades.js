import { screen, state } from "./state";
import { bulletIcon, atomIcon, shieldIcon, context } from "./consts";
import { add, multiply, portalize } from "./utils";

export const generateUpgrade = asteroid => {
  const chance = Math.random();
  const id = Date.now();

  const upgrade = {
    id,
    position: {
      x: asteroid.position.x,
      y: asteroid.position.y
    },
    velocity: asteroid.velocity,
    angle: asteroid.angle,
    radius: 15
  };

  if (chance < 0.25) {
    upgrade.type = "bullet";
    upgrade.icon = bulletIcon;
  }
  if (chance > 0.25 && chance < 0.5) {
    upgrade.type = "atom";
    upgrade.icon = atomIcon;
  }
  if (chance > 0.5 && chance < 0.75) {
    upgrade.type = "shield";
    upgrade.icon = shieldIcon;
  }
  if (chance > 0.75) {
    upgrade.type = "shotgun";
    upgrade.icon = shieldIcon;
  }

  state.upgrades[id] = upgrade;
  setTimeout(() => {
    delete state.upgrades[id];
  }, 5000);
};

export const updateUpgrades = () => {
  Object.values(state.upgrades).forEach(upgrade => {
    add(upgrade.position, upgrade.velocity);
    multiply(upgrade.velocity, 0.98);
    portalize(upgrade, screen.width, screen.height);
  });
};

export const renderUpgrades = () => {
  Object.values(state.upgrades).forEach(upgrade => {
    context.save();
    context.drawImage(
      upgrade.icon,
      upgrade.position.x - 10,
      upgrade.position.y - 10
    );
    context.restore();
  });
};
