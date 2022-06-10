'use strict';

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
let playing = true;
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
    if (playing) {
        const rollingDice = rollDice();

        //Initial behaviour
        getDice.classList.remove('hidden');
        getDice.src = `/dices/dice-${rollingDice}.png`;

        //What happens after
        console.log('rollingDice', rollingDice);
        if (rollingDice >= 1) {
            currentScore += rollingDice;
            console.log('activePlayer:', activePlayer + 1);
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
    }
});

btnHold.addEventListener('click', () => {
    console.log('activePLayer in Button Hold', activePlayer);
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 10) {
        console.log('activePlayer btnHold', activePlayer);
        playing = false;
        if (activePlayer === 0) {
            player1.classList.remove('current-playing');
            player1.classList.add('player-winner');
        } else {
            player2.classList.remove('current-playing');
            player2.classList.add('player-winner');
        }
    } else if (activePlayer === 0) {
        score1.textContent = scores[activePlayer];
        switchPlayer();
    } else {
        score2.textContent = scores[activePlayer];
        switchPlayer();
    }

    console.log('scores: ', (scores[activePlayer] += currentScore));
    console.log('SCORES:', scores);
});

btnNewGame.addEventListener('click', () => {
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    score1.textContent = 0;
    score2.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    player1.classList.add('current-playing');
    player2.classList.remove('current-playing');
    getDice.classList.add('hidden');
    player1.classList.remove('player-winner');
    player2.classList.remove('player-winner');
});
