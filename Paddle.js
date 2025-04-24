class Paddle {
  constructor() {
    this.w = 100;
    this.h = 15;
    this.x = width / 2 - this.w / 2;
    this.y = height - 40;
    this.speed = 7;
    this.dir = 0;
  }

  move(dir) {
    this.dir = dir;
  }

  update() {
    this.x += this.dir * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
