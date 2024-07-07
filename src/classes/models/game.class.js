import {
  createLocationPacket,
  gameStartNotification,
} from '../../utils/notification/game.notification.js';
import IntervalManager from '../managers/interval.manager.js';

const MAX_PLAYERS = 2;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManger = new IntervalManager();
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);

    this.intervalManger.addPlayer(user.id, user.ping.bind(user), 1000);
    if (this.users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.intervalManger.removePlayer(userId);

    if (this.users.length < MAX_PLAYERS) {
      this.state = 'waiting';
    }
  }

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });
    return maxLatency;
  }

  startGame() {
    this.state = 'inProgress';
    const startPacket = gameStartNotification(this.id, Date.now());
    console.log(this.getMaxLatency());

    this.users.forEach((user) => {
      user.socket.write(startPacket);
    });
  }

  getAllLocation() {
    const maxLatency = this.getMaxLatency();

    const locationData = this.users.map((user) => {
      const { x, y } = user.calculatePosition(maxLatency);
      return { id: user.id, x, y };
    });
    return createLocationPacket(locationData);
  }
}

export default Game;
