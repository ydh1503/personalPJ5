import Game from '../classes/models/game.class.js';

let gameSession;

export const createGameSession = () => {
  gameSession = new Game();
};

export const getGameSession = () => {
  return gameSession;
};
