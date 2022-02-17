// import modules
import Player from "./player.js";
import Log from "./log.js";
import Car from "./car.js";
import Level1 from "./levels/level1.js"

// DOM manipulaton
let squares;

let displayRemainingTime = document.getElementById('time-left');
let displayResult = document.getElementById('result');
let reStartBtn = document.getElementById('start-button');
let pauseBtn = document.getElementById('pause-button');


let timerID;
let playerTimerId;
let currentTime = 20;
let currentIndex = 76;
let enableRestart = true;

let player;
let log;
let car;

let level1 = new Level1();

let resetLevel = () => {
    let grid = document.getElementById('grid');
    grid.innerHTML = '';
    level1.level.forEach(e => {
        let tile = document.createElement('div');
        tile.className = e;
        grid.append(tile);
    });
    squares = document.querySelectorAll('#grid div');

    player = new Player(currentIndex);
    log = new Log();
    car = new Car();
};


function game() {
    loose();
    win();
}

function autoMoveObjects() {
    player.changeBackround('remove')
    currentTime--;
    displayRemainingTime.textContent = currentTime;
    log.logsLeft.forEach(logLeft => log.moveLogLeft(logLeft))
    log.logsRight.forEach(logRight => log.moveLogRight(logRight))
    car.carsLeft.forEach(carLeft => car.moveCarLeft(carLeft))
    car.carsRight.forEach(carRight => car.moveCarRight(carRight))
    movePlayerOnLogs();
    player.changeBackround('add')

}

function movePlayerOnLogs() {

    player.changeBackround('remove');
    player.squares[player.currentIndex].classList.remove('player')

    switch (true) {
        case squares[player.currentIndex].classList.contains('log-left', 'l1'):
        case squares[player.currentIndex].classList.contains('log-left', 'l2'):
        case squares[player.currentIndex].classList.contains('log-left', 'l3'):
            if (player.currentIndex % player.width !== 0) player.currentIndex--;
            break;
        case squares[player.currentIndex].classList.contains('log-right', 'l1'):
        case squares[player.currentIndex].classList.contains('log-right', 'l2'):
        case squares[player.currentIndex].classList.contains('log-right', 'l3'):
            if (player.currentIndex % player.width < player.width - 1) player.currentIndex++;
            break;
    }
    player.squares[player.currentIndex].classList.add('player');
    player.changeBackround('add');
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
        player.shouldMove = false;
        squares[player.currentIndex].classList.remove('player');

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

reStartBtn.addEventListener('click', () => {
    resetLevel();
    pauseBtn.innerText = 'pause';
    if (player.currentIndex !== 76) {
        if (squares[player.currentIndex].classList.contains('player')) {
            squares[player.currentIndex].classList.remove('player');
        }

        if (squares[car].classList.contains('c1')) {
            document.querySelector('.car-left').style.background = `url('./assets/car_left.png')`
        }

        currentTime = 20;
        player.currentIndex = 76;
        clearInterval(timerID);
        clearInterval(playerTimerId);
        document.removeEventListener('keyup', (e) => {
            player.movePlayer(e);
        });
        player.shouldMove = true;
        squares[player.currentIndex].classList.add('player');
        player.changeBackround('add');

        timerID = setInterval(autoMoveObjects, 1000);
        playerTimerId = setInterval(game, 50);
        enableRestart = true;
        reStartBtn.innerText = 'Restart the game';

    } else {
        enableRestart = false;
        pauseBtn.innerText = 'pause';
        document.removeEventListener('keyup', (e) => {
            player.movePlayer(e);
        });
        clearInterval(timerID);
        clearInterval(playerTimerId);
        currentTime = 20;
        timerID = setInterval(autoMoveObjects, 1000);
        playerTimerId = setInterval(game, 50);
        player.shouldMove = true;
        reStartBtn.innerText = 'Restart the game';
    }
});


pauseBtn.addEventListener('click', (e) => {
    clearInterval(timerID);
    clearInterval(playerTimerId);
    document.removeEventListener('keyup', player.movePlayer(e));
    pauseBtn.innerText = 'play';
    player.shouldMove = false;

    if (pauseBtn.innerText === 'play') {
        pauseBtn.addEventListener('click', (e) => {
            timerID = setInterval(autoMoveObjects, 1000);
            playerTimerId = setInterval(game, 50);
            player.shouldMove = true;
        })
    }
})