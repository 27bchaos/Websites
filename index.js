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
const wordList = const wordList = [
  "alphabet", "astronaut", "bicycle", "camera", "planet", "rocket", "school", "library", "notebook", "pencil",
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
  "peanut butter", "nutella", "honey", "syrup", "bacon", "sausage", "ham", "turkey", "chicken", "steak", "beef",
  "lamb", "pork", "tofu", "fish", "shrimp", "lobster", "scallops", "crab", "tuna", "salmon", "cod", "halibut", "trout",
  "sardines", "anchovies", "squid", "octopus", "lobster", "clams", "mussels", "oysters", "sushi", "sashimi", "fried rice",
  "stir fry", "sushi", "soup", "stew", "salad", "pasta", "ravioli", "spaghetti", "lasagna", "penne", "tortellini",
  "gnocchi", "macaroni", "fusilli", "farfalle", "spaghetti", "penne", "tagliatelle", "fusilli", "linguine", "ravioli",
  "pizza", "pepperoni", "vegetarian", "cheese", "margarita", "crust", "topping", "sauce", "parmesan", "mozzarella",
  "cheddar", "mozzarella", "cheddar", "feta", "gouda", "brie", "camembert", "blue cheese", "parmesan", "asiago", "provolone",
  "cheese", "pizza", "topping", "pepperoni", "olives", "mushrooms", "peppers", "onions", "tomatoes", "sausage", "bacon",
  "pineapple", "seafood", "vegetarian", "vegan", "gluten-free", "dairy-free", "sugar-free", "nut-free", "healthy", "organic",
  "natural", "junk food", "fast food", "snack", "chips", "crisps", "fries", "burgers", "sandwiches", "hot dog", "wrap",
  "kebab", "falafel", "tacos", "burrito", "quesadilla", "nachos", "guacamole", "salsa", "chili", "hummus", "pita", "samosas",
  "spring rolls", "fried chicken", "nuggets", "wings", "popcorn", "ice cream", "cake", "cookie", "brownie", "pie", "tart",
  "donuts", "cupcakes", "cheesecake", "brownies", "chocolate", "candy", "lollipop", "bubblegum", "mint", "lemon", "lime",
  "strawberry", "raspberry", "cherry", "watermelon", "pineapple", "orange", "apple", "banana", "pear", "plum", "kiwi",
  "fig", "apricot", "peach", "grape", "tangerine", "apricot", "coconut", "jackfruit", "dragonfruit", "papaya", "blueberry",
  "cranberry", "mulberry", "blackberry", "strawberry", "fruit", "vegetables", "spinach", "peas", "broccoli", "carrots",
  "tomato", "cucumber", "celery", "lettuce", "zucchini", "eggplant", "mushrooms", "onions", "garlic", "ginger", "parsley",
  "basil", "thyme", "oregano", "rosemary", "mint", "cilantro", "dill", "tarragon", "sage", "chives", "rosemary", "thyme",
  "oregano", "parsley", "basil", "honey", "syrup", "vanilla", "cinnamon", "chocolate", "caramel", "nuts", "almonds",
  "hazelnuts", "walnuts", "cashews", "peanuts", "pistachios", "macadamia", "peanuts", "sunflower", "pumpkin", "chia",
  "flax", "sesame", "melon", "cantaloupe", "watermelon", "pineapple", "pear", "peach", "apple", "nectarine", "grapefruit",
  "pomegranate", "kiwi", "mango", "passionfruit", "apricot", "plum", "grape", "lime", "lemon", "orange", "banana",
  "apple", "peach", "nectarine", "plum", "apricot", "tangerine", "watermelon", "honeydew", "blueberry", "blackberry",
  "raspberry", "strawberry", "redcurrant", "gooseberry", "elderberry", "loganberry", "dewberry", "jujube", "corn",
  "cornfield", "maize", "cornflour", "maize flour", "maize meal", "kernels", "cob", "popcorn", "popcorn kernel",
  "barley", "wheat", "rice", "quinoa", "buckwheat", "oats", "millet", "sorghum", "rye", "teff", "amaranth", "lentils",
  "beans", "peas", "chickpeas", "soybeans", "tofu", "tempeh", "seitan", "natto", "miso", "soy sauce", "tamari",
  "tofu", "veggie burger", "quinoa salad", "chickpea stew"
];

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
