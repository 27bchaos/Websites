const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let keys = {};
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 20;
    this.speed = 5;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keys['ArrowLeft'] && this.x > 0) this.x -= this.speed;
    if (keys['ArrowRight'] && this.x + this.width < canvas.width) this.x += this.speed;
    if (keys['ArrowUp'] && this.y > 0) this.y -= this.speed;
    if (keys['ArrowDown'] && this.y + this.height < canvas.height) this.y += this.speed;
  }

  shoot() {
    bullets.push(new Bullet(this.x + this.width / 2, this.y));
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 7;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y -= this.speed;
  }
}

class Enemy {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = -this.height;
    this.speed = 2 + Math.random() * 3;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      gameOver = true;
    }
  }
}

const player = new Player();

function spawnEnemy() {
  if (!gameOver) {
    enemies.push(new Enemy());
    setTimeout(spawnEnemy, 1000);
  }
}

function detectCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function detectBulletCollision(bullet, enemy) {
  return bullet.x > enemy.x &&
         bullet.x < enemy.x + enemy.width &&
         bullet.y > enemy.y &&
         bullet.y < enemy.y + enemy.height;
}

function updateGame() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.move();
  player.draw();

  bullets.forEach((bullet, bIndex) => {
    bullet.update();
    bullet.draw();
    enemies.forEach((enemy, eIndex) => {
      if (detectBulletCollision(bullet, enemy)) {
        enemies.splice(eIndex, 1);
        bullets.splice(bIndex, 1);
        score += 100;
      }
    });
  });

  enemies.forEach((enemy, index) => {
    enemy.update();
    enemy.draw();
    if (detectCollision(player, enemy)) {
      gameOver = true;
    }
  });

  drawHUD();
  requestAnimationFrame(updateGame);
}

function drawHUD() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  if (gameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '40px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 140, canvas.height / 2);
  }
}

// ======== INPUT: KEYBOARD ========
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === ' ') player.shoot();
});
document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// ======== INPUT: TOUCH CONTROLS ========
const btns = document.querySelectorAll('.button');
btns.forEach(btn => {
  const dir = btn.dataset.dir;
  btn.addEventListener('touchstart', () => keys[dir] = true);
  btn.addEventListener('touchend', () => keys[dir] = false);
});

document.getElementById('shootBtn').addEventListener('touchstart', () => {
  player.shoot();
});

// ================== START ==================
spawnEnemy();
updateGame();
