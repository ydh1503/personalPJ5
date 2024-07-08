import { createLocationPacket } from '../../utils/notification/game.notification.js';

class Game {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getAllLocation(userId) {
    const latency = this.getUser(userId).latency;

    const users = this.users.filter((user) => user.id !== userId);
    const locationData = users.map((user) => {
      const { x, y } = user.calculatePosition(latency);
      return { id: user.id, playerId: user.playerId, x, y };
    });
    if (!locationData) return;
    return createLocationPacket(locationData);
  }
}

export default Game;
