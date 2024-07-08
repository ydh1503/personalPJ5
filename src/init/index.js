import { createGameSession } from '../session/game.session.js';
import { loadProtos } from './loadProtos.js';

const initServer = async () => {
  try {
    await loadProtos();
    createGameSession();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
