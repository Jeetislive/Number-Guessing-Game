const randomNumber  = parseInt((Math.random() * 100) + 1);
console.log(randomNumber);


const userInput = document.getElementById('userInput');
const guessBtn = document.getElementById('guessButton');
const previousGuess = document.getElementById('guessedValues');
const remainingGuessedValues = document.getElementById('attemptsValue');
const feedback = document.querySelector('.feedback');
const lowOrHigh = document.getElementById('lowOrHi');
const startNewGame = document.getElementById('new-game');
const score = document.getElementById('score');
const scoredValue = document.getElementById('scoredValue');

let playGame = true;
let attempts = 1;
let previousGuessedValues = [];

if (playGame) {
    guessBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userGuess = parseInt(userInput.value);
        //console.log(userGuess);
        validateInput(userGuess);
    });
function validateInput(input) {
    if (isNaN(input) || input < 1 || input > 100) {
        alert('Please enter a valid number between 1 and 100');
    } else {
        previousGuessedValues.push(input);
        if (attempts === 10) {
            displayGuess(input);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }else {
            //console.log(input);
            displayGuess(input);
            checkGuess(input);
            }
        }
    }
function checkGuess(guess) {
    if (guess === randomNumber) {
      displayMessage(`🎉You guessed it right 🎉`);
      endGame();
    } else if (guess < randomNumber) {
      displayMessage(`Number is TOOO low`);
    } else if (guess > randomNumber) {
      displayMessage(`Number is TOOO High`);
    }
  }
function displayGuess(guess) {
    userInput.value = "";
    previousGuess.textContent += `${guess}  `;
    attempts++;
    remainingGuessedValues.textContent = `${11 - attempts}`;
}
function displayMessage(message) {
    lowOrHigh.innerHTML = `${message}`;
}
function endGame() {
    userInput.setAttribute('disabled','');
    playGame = false;
    startNewGame.style.display = 'inline-block';
    scoreUpdate();
    startNewGame.addEventListener('click',() => {
        newGame();
    });
}
function newGame() {
    startNewGame.style.display = 'none';
    attempts = 1;
    previousGuessedValues = [];
    lowOrHigh.textContent = "";
    remainingGuessedValues.textContent = `${10}`;
    userInput.removeAttribute('disabled','');
    playGame = true;
    userInput.value = "";
    previousGuess.textContent = "";
    score.style.display = "none";
    //displayMessage(`Guess a number between 1 and 100`);
}
}
function scoreUpdate() {
    scoredValue.textContent = `${11 - attempts + 1}`;
    score.style.display = "block";
}
