class Block {
  constructor(x, y, w, h, tipo = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = tipo;
    this.hits = 0;
    this.maxHits = tipo === 2 ? 3 : 1;
    this.destroyed = false;
  }

  show() {
    if (this.destroyed) return;

    stroke(255);
    strokeWeight(1);

    if (this.type === 3) {
      fill(100); // Irrompible
    } else if (this.type === 2) {
      // Colores según daño recibido
      if (this.hits === 3) fill(255, 0, 0); // Rojo
      else if (this.hits === 2) fill(255, 140, 0); // Naranja
      else fill(255, 255, 0); // Amarillo
    } else {
      fill(0, 200, 255); // Normal
    }

    rect(this.x, this.y, this.w, this.h);
    noStroke();
  }

  hit(ball) {
    if (this.destroyed || this.type === 3) return false;

    let ballLeft = ball.x - ball.r;
    let ballRight = ball.x + ball.r;
    let ballTop = ball.y - ball.r;
    let ballBottom = ball.y + ball.r;

    let blockLeft = this.x;
    let blockRight = this.x + this.w;
    let blockTop = this.y;
    let blockBottom = this.y + this.h;

    if (
      ballRight > blockLeft &&
      ballLeft < blockRight &&
      ballBottom > blockTop &&
      ballTop < blockBottom
    ) {
      // Colisión: dirección del rebote
      let overlapX = Math.min(ballRight - blockLeft, blockRight - ballLeft);
      let overlapY = Math.min(ballBottom - blockTop, blockBottom - ballTop);

      if (overlapX < overlapY) {
        ball.vel.x *= -1;
      } else {
        ball.vel.y *= -1;
      }

      this.hits++;
      if (this.hits >= this.maxHits) this.destroyed = true;
      return true;
    }

    return false;
  }
}
