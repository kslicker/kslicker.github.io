const board = document.getElementById('game-board'); // Game board element
const score = document.getElementById('score'); // Score element
const gridSize = 10; // Size of the game grid
let snakeParts = [{ x: 2, y: 5 }]; // Initial snake position
let foodX = 7, foodY = 7; // Initial food position
let direction = 'right'; // Initial direction
let scoreVariable = 0; // Score counter
let isGameOver = false;

// Draw food on the board
function drawFood() {
    const food = document.createElement('div');
    food.classList.add('food');
    food.style.gridColumnStart = foodX;
    food.style.gridRowStart = foodY;
    board.appendChild(food);
}

// Draw the snake on the board
function drawSnake() {
    board.innerHTML = '';
    for (let i = 0; i < snakeParts.length; i++) {
        const snake = document.createElement('div');
        snake.classList.add('snake');
        snake.style.gridColumnStart = snakeParts[i].x;
        snake.style.gridRowStart = snakeParts[i].y;
        board.appendChild(snake);
    }
}

// Move the snake
function moveSnake() {
    // Move the body of the snake
    for (let i = snakeParts.length - 1; i > 0; i--) {
        snakeParts[i] = { ...snakeParts[i - 1] };
    }

    // Update the head position
    switch (direction) {
        case 'up':
            snakeParts[0].y = snakeParts[0].y > 1 ? snakeParts[0].y - 1 : gridSize; // Wrap-around
            break;
        case 'down':
            snakeParts[0].y = snakeParts[0].y < gridSize ? snakeParts[0].y + 1 : 1; // Wrap-around
            break;
        case 'left':
            snakeParts[0].x = snakeParts[0].x > 1 ? snakeParts[0].x - 1 : gridSize; // Wrap-around
            break;
        case 'right':
            snakeParts[0].x = snakeParts[0].x < gridSize ? snakeParts[0].x + 1 : 1; // Wrap-around
            break;
    }

    // Detect collision with food
    if (snakeParts[0].x === foodX && snakeParts[0].y === foodY) {
        // Generate new food position
        do {
            foodX = Math.floor(Math.random() * gridSize) + 1;
            foodY = Math.floor(Math.random() * gridSize) + 1;
        } while (snakeParts.some(part => part.x === foodX && part.y === foodY));

        // Increase score and lengthen the snake
        scoreVariable++;
        score.textContent = `Score: ${scoreVariable}`;
        snakeParts.push({ ...snakeParts[snakeParts.length - 1] });
    }

    // Draw updated snake and food
    drawSnake();
    drawFood();
}

// Check for collisions (self-collision)
function checkGameOver() {

    for (let i = 2; i < snakeParts.length; i++) {
        if (snakeParts[0].x === snakeParts[i].x && snakeParts[0].y === snakeParts[i].y) {
            isGameOver = true;
            displayGameOver();
            return;
        }
    }
}

// Display Game Over screen
function displayGameOver() {
    const gameOverScreen = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');
    finalScore.textContent = scoreVariable;
    gameOverScreen.style.display = 'block';
    clearInterval(gameInterval);
}

// Restart the game
function restartGame() {
    const gameOverScreen = document.getElementById('game-over');
    gameOverScreen.style.display = 'none';
    isGameOver = false;
    snakeParts = [{ x: 2, y: 5 }];
    foodX = Math.floor(Math.random() * gridSize) + 1;
    foodY = Math.floor(Math.random() * gridSize) + 1;
    direction = 'right';
    scoreVariable = 0;
    score.textContent = `Score: ${scoreVariable}`;
    gameInterval = setInterval(gameLoop, 400);
}

// Handle direction change
window.addEventListener('keydown', (event) => {
    const keyDirectionMap = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
    };

    const oppositeDirections = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
    };

    const newDirection = keyDirectionMap[event.key];
    if (newDirection) {
        // Allow direction change only if not reversing and snake has more than one part
        if (snakeParts.length < 2 || direction !== oppositeDirections[newDirection]) {
            direction = newDirection;
        }
    }
});

// Attach restart button event listener
document.getElementById('restart-button').addEventListener('click', restartGame);

// Game loop
function gameLoop() {
    if (!isGameOver) {
        moveSnake();
        checkGameOver();
    }
}

// Start the game loop
let gameInterval = setInterval(gameLoop, 400);
