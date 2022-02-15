// import modules
import Player from "./player.js";

// DOM manipulaton
let squares = document.querySelectorAll('.grid div');
let displayRemainingTime = document.getElementById('time-left');
let displayResult = document.getElementById('result');
let startBtn = document.getElementById('start-button');

let logsLeft = document.querySelectorAll('.log-left');
let logsRight = document.querySelectorAll('.log-right');
let carsLeft = document.querySelectorAll('.car-left');
let carsRight = document.querySelectorAll('.car-right');

let timerID;
let playerTimerId;
let currentTime = 20;
let currentIndex = 76;

let player = new Player(currentIndex);

function autoMove() {
    currentTime--;
    displayRemainingTime.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogleft(logLeft))
    logsRight.forEach(logRight => movelogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))

}

function game() {
    loose();
    win();
}

function moveLogleft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}

function movelogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

function loose() {
    if (squares[player.currentIndex].classList.contains('c1') ||
        squares[player.currentIndex].classList.contains('l4') ||
        squares[player.currentIndex].classList.contains('l5') ||
        currentTime <= 0) {
        displayResult.textContent = 'You loose!';
        clearInterval(timerID);
        clearInterval(playerTimerId)
        timerID = null;
        squares[player.currentIndex].classList.remove('player');
        player.shouldMove = false;
    }
}

function win() {
    if (squares[player.currentIndex].classList.contains('lastBlock')) {
        displayResult.textContent = 'You win!';
        clearInterval(timerID);
        clearInterval(playerTimerId);
        timerID = null;
        player.shouldMove = false; 

    }
}

startBtn.addEventListener('click', () => {
    if (timerID) {
        clearInterval(timerID);
        clearInterval(playerTimerId);
        timerID = null;
        player.shouldMove = false
        document.removeEventListener('keyup', (e) => {
            player.movePlayer(e);
        });
      
    } else {
        timerID = setInterval(autoMove, 1000);
        playerTimerId = setInterval(game, 50);
        player.shouldMove = true; 
        document.addEventListener('keyup', (e) => {
            player.movePlayer(e);
        });
       
    }
});