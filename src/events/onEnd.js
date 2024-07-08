import { updateLastLocation } from '../db/user/user.db.js';
import { getGameSession } from '../session/game.session.js';
import { removeUser, userSessions } from '../session/user.session.js';

const onEnd = (socket) => () => {
  console.log(`클라이언트 연결 종료: ${socket.remoteAddress}:${socket.remotePort}`);

  console.log(userSessions);
  console.log(getGameSession());

  const user = removeUser(socket);

  const gameSession = getGameSession();
  gameSession.removeUser(user.id);

  updateLastLocation(user.id, user.x, user.y);
};

export default onEnd;
