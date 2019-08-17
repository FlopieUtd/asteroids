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
  receiver.x = receiver.x * value;
  receiver.y = receiver.y * value;
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

export const isColliding = (a, b) => {
  const vector = {
    x: a.position.x - b.position.x,
    y: a.position.y - b.position.y
  };

  return getLength(vector) < a.radius + b.radius;
};
