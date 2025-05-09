const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Game Variables
let balloons = [];
let score = 0;
let gameOver = false;

// Balloon class
class Balloon {
  constructor() {
    this.radius = 30 + Math.random() * 40;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = canvas.height + this.radius;
    this.speed = 1 + Math.random() * 3;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.y -= this.speed;
  }
}

// Start the game
function spawnBalloon() {
  if (!gameOver) {
    balloons.push(new Balloon());
    setTimeout(spawnBalloon, 800);  // spawn a new balloon every 0.8 seconds
  }
}

// Detect balloon click or touch
function detectPop(x, y) {
  for (let i = balloons.length - 1; i >= 0; i--) {
    const balloon = balloons[i];
    const dist = Math.sqrt((balloon.x - x) ** 2 + (balloon.y - y) ** 2);
    if (dist <= balloon.radius) {
      balloons.splice(i, 1);  // remove the popped balloon
      score += 10;            // increase score
      break;
    }
  }
}

// Draw the score
function drawScore() {
  ctx.fillStyle = '#333';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 40);
}

// Update the game
function update() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update balloons
  for (let i = balloons.length - 1; i >= 0; i--) {
    const balloon = balloons[i];
    balloon.update();
    balloon.draw();

    if (balloon.y + balloon.radius < 0) {
      balloons.splice(i, 1);
      gameOver = true;
    }
  }

  // Draw the score
  drawScore();

  // Request the next animation frame
  requestAnimationFrame(update);
}

// Mouse and touch event listeners
canvas.addEventListener('mousedown', (e) => {
  if (!gameOver) {
    detectPop(e.clientX, e.clientY);
  }
});

canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!gameOver) {
    const touch = e.touches[0];
    detectPop(touch.clientX, touch.clientY);
  }
});

// Start the game loop
spawnBalloon();
update();
