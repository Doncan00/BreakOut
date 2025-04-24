class Ball {
  constructor() {
    this.r = 10;
    this.reset();
  }

  reset(speed = 5) {
    this.x = width / 2;
    this.y = height / 2;
    this.vel = createVector(random([-1, 1]) * speed, -speed);
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    // Rebote con paredes
    if (this.x < this.r || this.x > width - this.r) this.vel.x *= -1;
    if (this.y < 40 + this.r) this.vel.y *= -1;

    // Paddle
    if (
      this.y + this.r > paddle.y &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.w
    ) {
      this.vel.y *= -1;
      this.y = paddle.y - this.r;
    }
  }

  show() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.r * 2);
  }
}
