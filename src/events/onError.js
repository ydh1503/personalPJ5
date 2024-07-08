import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';
import CustomError from '../utils/error/customError.js';
import { handlerError } from '../utils/error/errorHandler.js';

const onError = (socket) => (error) => {
  console.error(`소켓 에러: ${error}, ${socket.remoteAddress}:${socket.remotePort}`);
  handlerError(socket, new CustomError(500, `소켓 에러: ${err.message}`));

  const user = removeUser(socket);

  const gameSession = getGameSession();
  gameSession.removeUser(user.id);
};
export default onError;
