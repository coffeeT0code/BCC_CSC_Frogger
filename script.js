// import modules
import Player from "./player.js";
import Log from "./log.js";
import Car from "./car.js";
import Level1 from "./levels/level1.js"


let squares;
// getting access to the html elements
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

// instantiating the object level1 from class Level1
let level1 = new Level1();

// function that resets everything back to start the game again
let resetLevel = () => {
    let grid = document.getElementById('grid');
    // deletes all tiles
    grid.innerHTML = '';
    // resets the displays
    displayResult.innerHTML = '';
    displayRemainingTime.innerHTML = '20';

    // takes the strings from the level1 object and creates divs with this classes as nodeList 
    // log it with console.log(grid.childNodes)
    level1.level.forEach(e => {
        let tile = document.createElement('div');
        tile.className = e;
        grid.append(tile);
    });

    //creates a nodeList out of all divs inside the #grid 
    squares = document.querySelectorAll('#grid div');

    // creating the player, log and car
    player = new Player(currentIndex);
    log = new Log();
    car = new Car();
};

// constantly checks whether loose() or win() applies. 
function game() {
    loose();
    win();
}

// moves objects and subtracting the time with every iterations
function autoMoveObjects() {
    // removes the background
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

// makes the player "stick" to the logs (the player moves with the logs if the player stays on them)
function movePlayerOnLogs() {

    // removes the background
    player.changeBackround('remove');
    // removes the player class at the current position
    player.squares[player.currentIndex].classList.remove('player')

    // depending on the direction the player looses if he reaches the end of the map
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
    // add the player class to the updated position
    player.squares[player.currentIndex].classList.add('player');
    // add the proper background
    player.changeBackround('add');
}

// sets the rules for loosing
function loose() {

    // if the player is at the same position as the car or the water or the time is 0 then the game is lost
    if (squares[player.currentIndex].classList.contains('c1') ||
        squares[player.currentIndex].classList.contains('l4') ||
        squares[player.currentIndex].classList.contains('l5') ||
        currentTime <= 0) {

        // displays You lost
        displayResult.textContent = ' You lost!';
        
        // clears the interval of timerID and playerTimeID
        clearInterval(timerID);
        clearInterval(playerTimerId)
        // timer id is set to null
        timerID = null;
        // player shouldn't be able to move anymore
        player.shouldMove = false;
        // the player class is removed from the current tile
        squares[player.currentIndex].classList.remove('player');
    }
}

// sets the rules for winning the game
function win() {
    // the game is won if the player arrives at the square with the class 'last-block'
    if (squares[player.currentIndex].classList.contains('lastBlock')) {
        displayResult.textContent = ' You win!';
        // clears the interval of timerid and playertimerid
        clearInterval(timerID);
        clearInterval(playerTimerId);
        timerID = null;
        player.shouldMove = false;
    }
}

//adds the click event to the restart button
reStartBtn.addEventListener('click', () => {
    // calls the resetLevel function. 
    resetLevel();
    //changes the text of the button
    pauseBtn.innerText = 'pause';
    // if the player is not at the start postition the player class should be removed
    if (player.currentIndex !== 76) {
        if (squares[player.currentIndex].classList.contains('player')) {
            squares[player.currentIndex].classList.remove('player');
        }

        // if the square contains the class c1 
        if (squares[car].classList.contains('c1')) {
            // sets the background to carleft image
            document.querySelector('.car-left').style.background = `url('./assets/car_left.png')`
        }

        // the currenttime is 20 again
        currentTime = 20;
        // player moves back to the starting tile
        player.currentIndex = 76;
        // the intervals are cleared
        clearInterval(timerID);
        clearInterval(playerTimerId);
        // disables the keyup movement
        document.removeEventListener('keyup', (e) => {
            player.movePlayer(e);
        });

        // player should be able to move 
        player.shouldMove = true;

        // the player class is added again to the current square
        squares[player.currentIndex].classList.add('player');
        // and the backround is added also
        player.changeBackround('add');

        // calls autoMoveObjects() every second
        timerID = setInterval(autoMoveObjects, 1000);
        // calls the game function ever 50 miliseconds. 
        playerTimerId = setInterval(game, 50);
        enableRestart = true;
        reStartBtn.innerText = 'Restart the game';

    } else { //if the player is at the start position
        // enableRestart = false;
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

    if (pauseBtn.innerText === 'pause') {
      
        document.removeEventListener('keyup', player.movePlayer(e));
        pauseBtn.innerText = 'play';
        player.shouldMove = false;

        // clears the intervals
        clearInterval(timerID);
        clearInterval(playerTimerId);
    } else {
        pauseBtn.addEventListener('click', (e) => {
            // clears the intervals 
            clearInterval(timerID);
            clearInterval(playerTimerId);

            player.shouldMove = true;
            pauseBtn.innerText = 'pause';
            // sets timer Invervals again
            timerID = setInterval(autoMoveObjects, 1000);
            playerTimerId = setInterval(game, 50);
           
        })
    }
})

