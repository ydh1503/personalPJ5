import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import {
  createUser,
  findLastLocationById,
  findUserById,
  updateUserLogin,
} from '../../db/user/user.db.js';
import { getGameSession } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handlerError } from '../../utils/error/errorHandler.js';
import { createResponse } from '../../utils/response/create.Response.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;

    let user = await findUserById(deviceId);
    let lastLocation;

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
      lastLocation = await findLastLocationById(user.id);
    }

    user = addUser(socket, deviceId, playerId);
    user.setLatency(latency);
    if (lastLocation) {
      user.updatePosition(lastLocation.x, lastLocation.y);
    }

    const gameSession = getGameSession();

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const existUser = gameSession.getUser(user.id);
    if (!existUser) {
      gameSession.addUser(user);
    }

    const initialResponse = createResponse(
      HANDLER_IDS.INIT,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId,
    );

    socket.write(initialResponse);
  } catch (e) {
    handlerError(socket, e);
  }
};

export default initialHandler;
