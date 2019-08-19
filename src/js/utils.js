import { notice } from "./consts";

export const getLength = vector =>
  Math.sqrt(vector.x * vector.x + vector.y * vector.y);

export const setLength = (length, angle) => ({
  x: Math.cos(angle) * length,
  y: Math.sin(angle) * length
});

export const add = (receiver, vector) => {
  receiver.x += vector.x;
  receiver.y += vector.y;
};

export const multiply = (receiver, value) => {
  receiver.x *= value;
  receiver.y *= value;
};

export const portalize = (entity, screenWidth, screenHeight) => {
  if (entity.position.x > screenWidth) {
    entity.position.x = 0;
  }
  if (entity.position.x < 0) {
    entity.position.x = screenWidth;
  }
  if (entity.position.y > screenHeight) {
    entity.position.y = 0;
  }
  if (entity.position.y < 0) {
    entity.position.y = screenHeight;
  }
};

export const notify = message => {
  notice.innerHTML = message;
  notice.style.opacity = 1;
  notice.style.transform = "translateY(-10px)";

  setTimeout(() => {
    notice.style.opacity = 0;
    notice.style.transform = "translateY(0px)";
  }, 2500);
};
