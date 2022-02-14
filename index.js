import Player from "./gameobjects/player.js"; 

//global variables
let duck; 
let duckling; 
let canvas; 
let lastTickTimestamp
let grid = 80;
let keys = [];
let score = 0;
let frame;  
let gameSpeed = 1; 
let carsArray = [];
let truckArray = []; 
let motocycleArray = []; 

let CONFIG = {
    height: 800,
    width: 600,
}

// let canvas1 = document.getElementById("canvas1");
// let ctx1 = canvas1.getContext('2d');

// let canvas2 = document.getElementById("canvas2");
// let ctx2 = canvas2.getContext("2d");

let canvas3 = document.getElementById("canvas3");
let ctx3 = canvas3.getContext("2d");

// let canvas4 = document.getElementById("canvas4");
// let ctx4 = canvas4.getContext("2d");

// let canvas5 = document.getElementById("canvas5");
// let ctx5 = canvas5.getContext("2d");

function init() {
    document.addEventListener = ('keydown', (event) => {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'Space') {
            //prevents arrow keys from scrolling whilst playing
            event.preventDefault();
            // to being able to use the keys 
            this.currentKeys[event.code] = true;
        }
    })

    document.addEventListener = ('keyup', (event) => {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft' || event.code === 'ArrowRight' || event.code === 'Space') {
            //prevents arrow keys from scrolling whilst playing
            event.preventDefault();
            // to being able to use the keys 
            this.currentKeys[event.code] = false;
        }
    })
    
    duck = new Player(ctx3, CONFIG.width/2-25, CONFIG.height-50, 50, 50, CONFIG);
    console.log(duck)
    gameLoop(); 
}

const gameLoop = () => {
    // how much time has passed since the last tick?
    let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
  
    update(timePassedSinceLastRender);
    render();

    // set lastTickTimestamp to "now"
    lastTickTimestamp = performance.now();
    // call next iteration of the game loop
    requestAnimationFrame(gameLoop);
  }
  

function update(timePassedSinceLastRender) {
    ctx3.clearRect(0, 0, CONFIG.width, CONFIG.height); 
    duck.update(timePassedSinceLastRender); 
}

function render() {
    ctx3.resetTransform();
    duck.render();

}

window.addEventListener('load', () => {
    init();
  });