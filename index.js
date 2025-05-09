
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game Variables
let keys = {};
let fruits = [];
let score = 0;
let lives = 3;
let gameOver = false;

// Assets and classes
class Basket {
  constructor() {
    this.width = 100;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.speed = 6;
  }

  draw() {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
    if (keys['ArrowRight'] && this.x + this.width < canvas.width) this.x += this.speed;
  }
}

class Fruit {
  constructor() {
    this.radius = 20;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = -this.radius;
    this.speed = 2 + Math.random() * 4;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y += this.speed;
  }
}

const basket = new Basket();

function spawnFruit() {
  if (!gameOver) {
    fruits.push(new Fruit());
    setTimeout(spawnFruit, 700 + Math.random() * 800);
  }
}

function detectCatch(fruit) {
  return fruit.y + fruit.radius >= basket.y &&
         fruit.x > basket.x &&
         fruit.x < basket.x + basket.width;
}

function update() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  basket.move();
  basket.draw();

  for (let i = fruits.length - 1; i >= 0; i--) {
    const fruit = fruits[i];
    fruit.update();
    fruit.draw();

    if (detectCatch(fruit)) {
      fruits.splice(i, 1);
      score += 10;
    } else if (fruit.y - fruit.radius > canvas.height) {
      fruits.splice(i, 1);
      lives--;
      if (lives <= 0) gameOver = true;
    }
  }

  drawHUD();
  requestAnimationFrame(update);
}

function drawHUD() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Lives: ${lives}`, 10, 60);
  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 140, canvas.height / 2);
  }
}

// Controls (keyboard and touch)
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

// Touch support
let touchX = null;
canvas.addEventListener('touchstart', (e) => {
  touchX = e.touches[0].clientX;
});

canvas.addEventListener('touchmove', (e) => {
  const dx = e.touches[0].clientX - touchX;
  basket.x += dx * 0.5;
  if (basket.x < 0) basket.x = 0;
  if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
  touchX = e.touches[0].clientX;
});

spawnFruit();
update();
