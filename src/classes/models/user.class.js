class User {
  constructor(id, playerId, socket) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.lastUpdateTime = Date.now();
    this.latency = 0;
  }

  updatePosition(x, y) {
    this.dx = x - this.x;
    this.dy = y - this.y;
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  setLatency(latency) {
    this.latency = latency;
  }

  calculatePosition(latency) {
    const timeDiff = latency / 1000; // 초 단위
    const speed = 3;
    const distance = speed * timeDiff;
    const theta = Math.atan2(this.dy, this.dx);

    return {
      x: this.x + Math.cos(theta) * distance,
      y: this.y + Math.sin(theta) * distance,
    };
  }
}

export default User;
