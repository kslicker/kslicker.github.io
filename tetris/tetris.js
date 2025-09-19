const ROWS = 20;
const COLS = 10;

const BOARD = document.getElementById('tetris');

// Add cells to game board
for (let i = 0; i < COLS; i++) {
    for (let i = 0; i < ROWS; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        BOARD.appendChild(cell);
    }
}