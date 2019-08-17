import { state } from "./state";

export const handleKeyDown = e => {
  switch (e.keyCode) {
    case 65:
    case 37:
      state.input.left = true;
      break;

    case 87:
    case 38:
      state.input.up = true;
      break;

    case 68:
    case 39:
      state.input.right = true;
      break;

    case 32:
    case 75:
      state.input.space = true;
      break;
  }
};

export const handleKeyUp = e => {
  switch (e.keyCode) {
    case 65:
    case 37:
      state.input.left = false;
      break;

    case 87:
    case 38:
      state.input.up = false;
      break;

    case 68:
    case 39:
      state.input.right = false;
      break;

    case 32:
    case 75:
      state.input.space = false;
      break;
  }
};
