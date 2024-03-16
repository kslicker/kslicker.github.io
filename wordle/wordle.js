// Setup canvas
const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");

// Keyboard
const keyboard = document.getElementById("keyboard-div");
const keyboardArray = Array.from(keyboard.innerText).filter(char => char >= 'A' && char <= 'Z');
const filteredArray = [...new Set(keyboardArray)];

// Get word list from server
async function getWords() {
    const response = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
    words = await response.text();
    processWords();
  }

let todaysWord = "";
let wordList = [];
let wordListUpperCase = [];

function processWords() {
    const wordArray = words.split("\n");
    wordList = wordArray.filter(word => word.length === 6);
    wordListUpperCase = wordList.map(word => word.toUpperCase().trim());
    const randomIndex = Math.floor(Math.random() * wordListUpperCase.length)
    todaysWord = wordListUpperCase[randomIndex];
    console.log(todaysWord);
}

getWords();

// Array for guesses
const guesses = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

let guess = "";
let guessCount = 0;

// Reset game
function resetGame() {
    // Reset the guesses array
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < guesses[0].length; j++) {
            guesses[i][j] = "";
        }
    }

    // Reset guess word, counter and keyboard colours
    guess = "";
    guessCount = 0;
    draw(guesses);

    filteredArray.forEach((letter) => {
        const button = document.getElementById(letter);
        button.style.backgroundColor = "rgb(179, 179, 179)";
    })
}

function countOccurrences(word, letter) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            count++;
        }
    }
    return count;
}

// Draw the grid and letters
function draw(guesses) {
    // Grid size and margin
    const squareSize = 50;
    let yMargin = 5;
    let xMargin = 0;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Font for text
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Update grid
    for (let i = 0; i < 6; i++) {
        xMargin = 5;
        for (let j = 0; j < 5; j++) {
            if (guesses[i][j] === todaysWord[j] && guessCount > i) {
                ctx.fillStyle = "#30b337";
                ctx.fillRect(0 + xMargin, 0 + yMargin, squareSize, squareSize);
                ctx.fillStyle = "white";
                ctx.fillText(guesses[i][j], 25 + xMargin, 28 + yMargin);
                xMargin += 60;

                // Update keyboard
                const greenButtonElement = document.getElementById(todaysWord[j]);
                greenButtonElement.style.backgroundColor = "#30b337";
            } else if (todaysWord.includes(guesses[i][j]) && countOccurrences(todaysWord, guesses[i][j]) >= countOccurrences(guesses[i], guesses[i][j]) && guessCount > i) {
                console.log("Today's word:" + countOccurrences(todaysWord, guesses[i][j]));
                console.log("Guess:" + countOccurrences(guesses[i], guesses[i][j]));
                ctx.fillStyle = "#07c7f7";
                ctx.fillRect(0 + xMargin, 0 + yMargin, squareSize, squareSize);
                ctx.fillStyle = "white";
                ctx.fillText(guesses[i][j], 25 + xMargin, 28 + yMargin);
                xMargin += 60;

                // Update keyboard
                const blueButtonElement = document.getElementById(guesses[i][j]);
                blueButtonElement.style.backgroundColor = "#07c7f7";
            } else if (guessCount > i) {
                ctx.fillStyle = "grey";
                ctx.fillRect(0 + xMargin, 0 + yMargin, squareSize, squareSize);
                ctx.fillStyle = "white";
                ctx.fillText(guesses[i][j], 25 + xMargin, 28 + yMargin);
                xMargin += 60;

                // Update keyboard
                const greyButtonElement = document.getElementById(guesses[i][j]);
                greyButtonElement.style.backgroundColor = "grey";
            } else {
                ctx.fillStyle = "white";
                ctx.strokeRect(0 + xMargin, 0 + yMargin, squareSize, squareSize);
                ctx.fillStyle = "black";
                ctx.fillText(guesses[i][j], 25 + xMargin, 28 + yMargin);
                xMargin += 60;
            }
        }
        yMargin += 60;
    }
   
}

// Add character to the guesses array
function addCharacter(char) {
    // If 'del' was pressed delete the last letter in the array
    if (char === "DEL") {
        for (let i = guesses.length - 1; i >= guessCount; i--) {
            for (let j = guesses[0].length - 1; j >= 0; j--) {
                if (guesses[i][j] != "") {
                    guesses[i][j] = "";
                    draw(guesses);
                    guess = guess.slice(0, -1);
                    return
                }
            }
        }
    }

    // If a-z was pressed draw it on the board
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < guesses[0].length; j++) {
            if (guesses[i][j] === "" && char != "DEL" && char != "ENTER" && guess.length < 5) {
                guesses[i][j] = char;
                guess += char;
                draw(guesses);
                return
            }
        }
    }

    // If 'enter' was pressed check if word is correct length and compare to todays word
    if (char === "ENTER" && guess.length === 5) {
        if (guess === todaysWord) {
            draw(guesses);
            setTimeout(function(){
                alert("Well done! You win!");
                resetGame();
            }, 500);
        } else if (guessCount === 5) {
            alert("game over!");
            resetGame();
        } else if (!wordListUpperCase.includes(guess)) {
            alert("Not in word list!");
        } else {
            guess = "";
            guessCount++;
            draw(guesses);
        }
    }
}

draw(guesses);