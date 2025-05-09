// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const inputElement = document.getElementById('inputText');
const scoreElement = document.getElementById('score');
const wordDisplay = document.getElementById('wordDisplay');
const restartButton = document.getElementById('restartButton');
const submitButton = document.getElementById('submitBtn');

let balloons = [];
let score = 0;
let gameInterval;
let isGameOver = false;
let currentWord = "";
const wordList = ["apple", "banana", "cherry", "grape", "orange", "watermelon", "strawberry", "pineapple"];

// Balloon class
class Balloon {
  constructor(word) {
    this.x = Math.random() * (canvas.width - 100);
    this.y = canvas.height;
    this.word = word;
    this.speed = Math.random() * 1 + 0.5;  // Slower speed for easier play
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

  // Check if the balloon is out of bounds
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
  submitButton.disabled = false;
  inputElement.disabled = false;
  balloons = [];
  generateBalloon();
  scoreElement.textContent = `Score: ${score}`;
  wordDisplay.textContent = `Type this word: ${currentWord}`;
  inputElement.value = '';
  inputElement.focus();
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
}

// Generate a new balloon with a random word
function generateBalloon() {
  if (isGameOver) return;
  currentWord = generateWord();
  balloons.push(new Balloon(currentWord));
}

// Game over function
function gameOver() {
  clearInterval(gameInterval);
  isGameOver = true;
  inputElement.disabled = true;
  submitButton.disabled = true;
  restartButton.disabled = false;
  alert('Game Over! Your final score: ' + score);
}

// Submit button click event
submitButton.addEventListener('click', function() {
  if (inputElement.value.toLowerCase() === currentWord.toLowerCase()) {
    score++;
    balloons.shift(); // Remove popped balloon
    scoreElement.textContent = `Score: ${score}`;
    generateBalloon();
    inputElement.value = '';
    wordDisplay.textContent = `Type this word: ${currentWord}`;
  }
});

// Restart the game
restartButton.addEventListener('click', function() {
  startGame();
});

// Start the game when the page loads
startGame();
