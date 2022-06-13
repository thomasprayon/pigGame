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
let activePlayer, currentScore, scores, playing;

const initialValues = () => {
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
};

initialValues();

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

const checkWinner = player => {
    let winner, currentPlaying;
    winner = player.classList.add('player-winner');
    currentPlaying = player.classList.remove('current-playing');
    return winner, currentPlaying;
};

const playerCurrentScore = current => {
    return (current.textContent = currentScore);
};

const updateScore = player => {
    return (player.textContent = scores[activePlayer]);
};

btnRollDice.addEventListener('click', () => {
    if (playing) {
        const rollingDice = rollDice();
        getDice.classList.remove('hidden');
        getDice.src = `/dices/dice-${rollingDice}.png`;
        if (rollingDice !== 1) {
            currentScore += rollingDice;
            activePlayer === 0
                ? playerCurrentScore(currentScore1)
                : playerCurrentScore(currentScore2);
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
        playing = false;
        activePlayer === 0 ? checkWinner(player1) : checkWinner(player2);
        document
            .querySelector(`.player-${activePlayer}`)
            .classList.add('player-winner');
    } else if (activePlayer === 0) {
        updateScore(score1);
        switchPlayer();
    } else {
        updateScore(score2);
        switchPlayer();
    }
});

btnNewGame.addEventListener('click', initialValues);
