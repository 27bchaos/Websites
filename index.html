<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Word Challenge Balloon Pop Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
    }

    canvas {
      border: 2px solid #000;
      background-color: #e0f7fa;
    }

    #wordInput {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px;
      font-size: 18px;
    }

    #submitBtn {
      position: fixed;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <canvas id="gameCanvas" width="800" height="600"></canvas>
  <input type="text" id="wordInput" placeholder="Type the word" />
  <button id="submitBtn">Submit</button>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const wordInput = document.getElementById('wordInput');
    const submitBtn = document.getElementById('submitBtn');

    // Array of words for the game
    const words = [
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

    let balloons = [];
    let score = 0;
    let gameOver = false;
    let currentWord = '';
    let wordInputValue = '';

    class Balloon {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.speed = Math.random() * 1.5 + 1;
        this.word = words[Math.floor(Math.random() * words.length)];
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          gameOver = true;
        }
      }

      checkHit(inputWord) {
        if (this.word === inputWord) {
          score += 10;
          return true;
        }
        return false;
      }
    }

    function spawnBalloon() {
      if (!gameOver) {
        balloons.push(new Balloon());
        setTimeout(spawnBalloon, 1000);
      }
    }

    function updateGame() {
      if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 80, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balloons.forEach((balloon, index) => {
        balloon.update();
        balloon.draw();

        if (balloon.checkHit(wordInputValue)) {
          balloons.splice(index, 1);
          wordInputValue = '';
        }
      });

      requestAnimationFrame(updateGame);
    }

    submitBtn.addEventListener('click', () => {
      wordInputValue = wordInput.value.toLowerCase().trim();
      wordInput.value = '';
    });

    spawnBalloon();
    updateGame();
  </script>

</body>
</html>
