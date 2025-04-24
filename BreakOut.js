let paddle, ball;
let blocks = [];
let score = 0;
let lives = 3;
let level = 3;
let gameStarted = false;
let rowsPerLevel = [4, 5, 6];
let speedPerLevel = [5, 6.5, 8];

function setup() {
  createCanvas(800, 600);
  paddle = new Paddle();
  ball = new Ball();
  setupLevel(level);
}

function draw() {
  background(0);

  paddle.update();
  paddle.show();

  if (gameStarted) {
    ball.update();
  }
  ball.show();

  let remainingBlocks = 0;
  let ballHit = false; // NUEVO: para detener múltiples rebotes

  for (let block of blocks) {
    block.show();
    if (!block.destroyed) {
      remainingBlocks++;

      // Solo permitir un rebote por frame
      if (!ballHit && block.hit(ball)) {
        score += 1;
        ballHit = true;
      }
    }
  }

  if (remainingBlocks === 0) {
    level++;
    if (level > 3) {
      noLoop();
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(255);
      text("¡Has ganado el juego!", width / 2, height / 2);
      return;
    } else {
      setupLevel(level);
      gameStarted = false;
    }
  }

  if (ball.y - ball.r > height) {
    lives--;
    if (lives <= 0) {
      noLoop();
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(255);
      text("Game Over", width / 2, height / 2);
    } else {
      ball.reset();
      gameStarted = false;
    }
  }

  displayInfo();

  // línea separadora
  stroke(255);
  line(0, 40, width, 40);
  noStroke();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) paddle.move(-1);
  else if (keyCode === RIGHT_ARROW) paddle.move(1);
  else if (key === " " && !gameStarted) gameStarted = true;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) paddle.move(0);
}

function displayInfo() {
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Vidas: ${lives}`, 10, 10);
  textAlign(RIGHT, TOP);
  text(`Puntaje: ${score}`, width - 10, 10);
}

function setupLevel(lvl) {
  blocks = [];
  let cols = 10;
  let rows = rowsPerLevel[lvl - 1];
  let w = width / cols;
  let h = 20;
  let topMargin = 50;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * w;
      let y = row * h + topMargin;

      let tipo = 1;
      if (lvl === 2 && row === 2 && col === 5) tipo = 2; // 3 golpes
      if (lvl === 3) {
        if ((row === 1 && col === 3) || (row === 3 && col === 7)) tipo = 2;
        if (row === 0 && col === 5) tipo = 3; // irrompible
      }

      blocks.push(new Block(x, y, w, h, tipo));
    }
  }

  ball.reset(speedPerLevel[lvl - 1]);
}
