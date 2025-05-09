const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game Variables
let score = 0;
let square = { x: 0, y: 0, size: 100, color: 'blue' };
let gameRunning = true;

// Draw the square
function drawSquare() {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);
}

// Draw the score
function drawScore() {
  ctx.font = '30px Arial';
  ctx.fillStyle = '#333';
  ctx.clearRect(0, 0, canvas.width, 50);  // Clear score area
  ctx.fillText(`Score: ${score}`, 20, 40);
}

// Randomize square position
function randomizeSquarePosition() {
  square.x = Math.random() * (canvas.width - square.size);
  square.y = Math.random() * (canvas.height - square.size);
}

// Handle tap/click
function handleUserInteraction(event) {
  // Prevent default behavior for touch events (avoid scrolling/zooming)
  event.preventDefault();

  // Get mouse/touch position
  const mouseX = event.clientX || event.touches[0].clientX;
  const mouseY = event.clientY || event.touches[0].clientY;

  // Check if the touch or click is within the square
  if (
    mouseX > square.x &&
    mouseX < square.x + square.size &&
    mouseY > square.y &&
    mouseY < square.y + square.size
  ) {
    score++;  // Increase score if the square is tapped
    randomizeSquarePosition();  // Move square to a new position
  }
}

// Add event listeners for click and touch
canvas.addEventListener('click', handleUserInteraction);
canvas.addEventListener('touchstart', handleUserInteraction);  // Add touch support

// Game loop
function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
  drawSquare();  // Draw the square
  drawScore();   // Draw the score

  requestAnimationFrame(gameLoop);  // Keep looping
}

// Start the game
randomizeSquarePosition();
gameLoop();
