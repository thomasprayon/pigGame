// Pig game project.  Players take turns to roll a single dice as many time as they want, adding all the numbers to a total. Unless the player gets a 1. In this case, the player looses every gained score and it's next players turn. Each player, if they are lucky in not rolling a 1 can hold their total points, and gives the dice to the other player.

const btnNewGame = document.querySelector('.btn--newgame');
const btnHold = document.querySelector('.btn--hold');
const btnRollDice = document.querySelector('.btn--rolldice');
const getDice = document.querySelector('.img-dice');
const currentScore1 = document.querySelector('.current-score-0');
const currentScore2 = document.querySelector('.current-score-1');
const score1 = document.querySelector('.score-0');
const score2 = document.querySelector('.score-1');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');

let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];

player1.classList.add('current-playing');

const rollDice = function () {
    return Math.floor(Math.random() * 6) + 1;
};

const switchPlayer = () => {
    activePlayer === 0
        ? (currentScore1.textContent = 0)
        : (currentScore2.textContent = 0);
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('current-playing');
    player2.classList.toggle('current-playing');
};

btnRollDice.addEventListener('click', () => {
    const rollingDice = rollDice();

    //Initial behaviour
    getDice.classList.remove('hidden');
    getDice.src = `/dices/dice-${rollingDice}.png`;

    //What happens after
    console.log(rollingDice);
    if (rollingDice >= 1) {
        currentScore += rollingDice;
        console.log('activePlayer', activePlayer);
        if (activePlayer === 0) {
            currentScore1.textContent = currentScore;
        } else {
            currentScore2.textContent = currentScore;
        }
    }
    if (rollingDice === 1) {
        console.log('switch player');
        switchPlayer();
    }
});

btnNewGame.addEventListener('click', () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
});

btnHold.addEventListener('click', () => {
    console.log('');
});
