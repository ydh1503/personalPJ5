import config from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { handlerError } from '../utils/error/errorHandler.js';
import { packetParser } from '../utils/parser/packetParser.js';

const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);
      console.log(`length: ${length}, packetType: ${packetType}`);
      console.log(`packet: ${packet}`);

      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL:
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);

            await handler({ socket, userId, payload });
            console.log(`handlerId: ${handlerId}`);
            console.log(`userId: ${userId}`);
            console.log(`payload: ${payload}`);
            break;
        }
      } catch (e) {
        handlerError(socket, e);
      }
    } else {
      // 아직 전체 패킷이 도착하지 않음
      break;
    }
  }
};

export default onData;
