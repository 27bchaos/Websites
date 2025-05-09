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
const wordList = ["alphabet", "astronaut", "bicycle", "camera", "planet", "rocket", "school", "library", "notebook", "pencil",
      "computer", "keyboard", "monitor", "screen", "website", "internet", "email", "printer", "scissors", "ruler",
      "calculator", "backpack", "chalkboard", "teacher", "student", "classroom", "desk", "chair", "book", "pen",
      "marker", "paper", "eraser", "stapler", "binder", "folder", "calendar", "vacation", "holiday", "beach",
      "mountain", "forest", "desert", "park", "playground", "lake", "river", "ocean", "city", "village", "town",
      "skyscraper", "building", "street", "road", "car", "motorcycle", "truck", "bus", "bicycle", "subway", "airplane",
      "helicopter", "ship", "boat", "taxi", "traffic", "construction", "bridge", "tunnel", "subway", "train", "airport",
      "station", "museum", "gallery", "theater", "cinema", "stadium", "concert", "festival", "park", "zoo", "aquarium",
      "circus", "carnival", "library", "bookstore", "coffee", "restaurant", "kitchen", "table", "chair", "sofa", "bed",
      "lamp", "window", "door", "refrigerator", "microwave", "oven", "dishwasher", "cooking", "eating", "drinking",
      "breakfast", "lunch", "dinner", "dessert", "snack", "sandwich", "salad", "pizza", "pasta", "soup", "cheese",
      "cake", "chocolate", "ice cream", "cookie", "fruit", "vegetable", "tomato", "cucumber", "lettuce", "carrot",
      "broccoli", "spinach", "peas", "eggplant", "zucchini", "potatoes", "onions", "garlic", "herbs", "spices", "salt",
      "pepper", "vinegar", "mustard", "honey", "sugar", "syrup", "jam", "sauce", "curry", "fried", "grilled", "baked",
      "boiled", "steamed", "raw", "roasted", "mashed", "whipped", "smoothie", "juice", "milk", "tea", "coffee", "soda",
      "beer", "wine", "cocktail", "whiskey", "vodka", "rum", "gin", "tequila", "champagne", "cider", "cocktail", "drink",
      "glass", "mug", "cup", "plate", "bowl", "spoon", "fork", "knife", "napkin", "tray", "chef", "recipe", "meal",
      "snacks", "appetizer", "entree", "dessert", "barista", "bakery", "pastry", "donut", "muffin", "croissant", "toast",
      "bagel", "pancake", "waffle", "crepe", "omelet", "bacon", "eggs", "sausage", "toast", "butter", "jam", "jelly",
      "peanut butter", "nutella", "honey", "syrup", "brown sugar", "granulated sugar", "powdered sugar", "molasses", "vanilla",
      "cinnamon", "cloves", "nutmeg", "allspice", "ginger", "cardamom", "curry", "turmeric", "paprika", "black pepper", "salt",
      "chili powder", "cayenne", "cumin", "mustard", "bay leaves", "vinegar", "balsamic vinegar", "white vinegar", "apple cider",
      "shoyu", "soy sauce", "worcestershire sauce", "hot sauce", "mustard", "tomato paste", "salsa", "peanut butter", "mayo"
    ];

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

function printCurrentWord() {
  const currentWord = balloons.length > 0 ? balloons[0].word : ''; // Get the current word
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  const wordWidth = ctx.measureText(currentWord).width;
  const xPosition = canvas.width / 2 - wordWidth / 2; // Center the word
  const yPosition = canvas.height - 20; // Position at the bottom of the canvas
  ctx.fillText(currentWord, xPosition, yPosition);
}
