// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const inputElement = document.getElementById('inputText');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartButton');

let balloons = [];
let score = 0;
let gameInterval;
let isGameOver = false;
const wordList = ["apple", "banana", "cherry", "grape", "orange", "watermelon", "strawberry", "pineapple"];

// Balloon class
class Balloon {
  constructor(word) {
    this.x = Math.random() * (canvas.width - 100);
    this.y = canvas.height;
    this.word = word;
    this.speed = Math.random() * 2 + 1;  // Speed of balloon rising
  }

  // Draw balloon
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'lightblue';
    ctx.fill();
    ctx.closePath();
    
    // Draw the word on the balloon
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(this.word, this.x - ctx.measureText(this.word).width / 2, this.y);
  }

  // Update balloon position
  update() {
    this.y -= this.speed;
  }

  // Check if the balloon is off the screen
  isOutOfBounds() {
    return this.y < -30;
  }
}

// Function to generate a random word from the list
function generateWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Start a new game
function startGame() {
  score = 0;
  isGameOver = false;
  restartButton.disabled = true;
  balloons = [];
  generateBalloon();
  scoreElement.textContent = `Score: ${score}`;
  inputElement.value = '';
  inputElement.focus();
  inputElement.disabled = false;
  gameInterval = setInterval(gameLoop, 16); // Run game loop every 16ms
}

// Game loop to update the game
function gameLoop() {
  if (isGameOver) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Update and draw all balloons
  balloons.forEach((balloon, index) => {
    balloon.update();
    balloon.draw();

    // Check if the balloon is out of bounds
    if (balloon.isOutOfBounds()) {
      balloons.splice(index, 1); // Remove balloon if out of bounds
      gameOver();
    }
  });

  // Check if the user typed the correct word
  if (inputElement.value.toLowerCase() === balloons[0]?.word.toLowerCase()) {
    score++;
    balloons.shift(); // Remove popped balloon
    scoreElement.textContent = `Score: ${score}`;
    generateBalloon();
    inputElement.value = '';
  }
}

// Generate a new balloon with a random word
function generateBalloon() {
  if (isGameOver) return;
  const word = generateWord();
  balloons.push(new Balloon(word));
}

// Game over function
function gameOver() {
  clearInterval(gameInterval);
  isGameOver = true;
  inputElement.disabled = true;
  restartButton.disabled = false;
  alert('Game Over! Your final score: ' + score);
}

// Restart the game
restartButton.addEventListener('click', function() {
  startGame();
});

// Start the game when the page loads
startGame();
