class Player {
    constructor(currentIndex) {

        // creates an NodeList of all the divs inside grid
        this.squares = document.querySelectorAll('#grid div');

        this.player = document.querySelector('.player');
        this.currentIndex = currentIndex;

        // the number of tiles in a row
        this.width = 9;
        this.shouldMove = true;
        this.urlduck;
        this.urlLog1;
        this.urlLog2;
        this.urlLog3;
        this.direction;

        // enables to move the player after the key has been pressed
        document.addEventListener('keyup', (e) => {
            this.movePlayer(e);
        });

    }

    // function to move the player around in the game
    movePlayer(e) {
        if (this.shouldMove) {

            // removes picture of the background
            this.changeBackround('remove');
            // removes the class "player" from the current tile
            this.squares[this.currentIndex].classList.remove('player')

            // actions on each arrow key
            switch (e.code) {

                // goes 1 tile left 
                case 'ArrowLeft':
                    // checking for the left border
                    if (this.currentIndex % this.width !== 0) {
                        this.currentIndex -= 1;
                        this.direction = 'left'
                    }
                    break;
                // goes 1 tile right
                case 'ArrowRight':
                    // checking for the right border
                    if (this.currentIndex % this.width < this.width - 1) {
                        this.currentIndex += 1;
                        this.direction = 'right'
                    }
                    break;
                // goes one tile up
                case 'ArrowUp':
                    // checking for the top border
                    if (this.currentIndex - this.width >= 0) {
                        this.currentIndex -= this.width;
                        this.direction = 'up'
                    }
                    break;
                // goes one tile down
                case 'ArrowDown':
                    if (this.currentIndex + this.width < this.width * this.width) {
                        this.currentIndex += this.width;
                        this.direction = 'down'
                    }
                    break;
            }
            // adds the class player to the current tile
            this.squares[this.currentIndex].classList.add('player')
            // adds the backround picture
            this.changeBackround('add');

        }
    }

    // this function that the background changes on the tile the player is. (To make it look like the player is moving. )
    changeBackround(operation) {

        this.player = document.querySelector('.player');

        // if the parameter of the changeBackground Function is add, the default background is duck.png
        if (operation === 'add') {
            if (this.direction === undefined || this.direction === 'up') {
                this.urlduck = `url('./assets/duck.png') , `;
            }

            // depending on the direction of movenment, the player should face different directions
            switch (this.direction) {
                case 'up':
                    this.urlduck = `url('./assets/duck.png') , `;
                    break;
                case 'down':
                    this.urlduck = `url('./assets/duck-back.png') , `;
                    break;
                case 'left':
                    this.urlduck = `url('./assets/duck-left.png') , `;
                    break;
                case 'right':
                    this.urlduck = `url('./assets/duck-right.png') , `;
                    break;
            }

            // defining the urls of log pictures
            this.urlLog1 = `url('./assets/log1.png')`;
            this.urlLog2 = `url('./assets/log2.png')`;
            this.urlLog3 = `url('./assets/log3.png')`;

        
        }
        // set the url of the pictures to an empty string if the parameter of the changeBackgroundfunction is not "add" 
        // to set the background back to its previous settings
        else {
            this.urlduck = ``;
            this.urlLog1 = ``;
            this.urlLog2 = ``;
            this.urlLog3 = ``;
        }

        // depending on the class of the div background changes to the right image of the duck and to the right tile background.
        switch (true) {
            case this.squares[this.currentIndex].classList.contains('startBlock', 'player'):
                this.player.style.background = `${this.urlduck}url('./assets/start.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('default', 'player'):
                this.player.style.background = `${this.urlduck}url('./assets/grass.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('c2', 'player'):
                this.player.style.background = `${this.urlduck}url('./assets/road.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('c3', 'player'):
                this.player.style.background = `${this.urlduck}url('./assets/road.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('l1', 'player'):
                this.player.style.background = `${this.urlduck}${this.urlLog1}`;
                break;
            case this.squares[this.currentIndex].classList.contains('l2', 'player'):
                this.player.style.background = `${this.urlduck}${this.urlLog2}`;
                break;
            case this.squares[this.currentIndex].classList.contains('l3', 'player'):
                this.player.style.background = `${this.urlduck}${this.urlLog3}`;
                break;
            case this.squares[this.currentIndex].classList.contains('lastBlock', 'player'):
                this.player.style.background = `${this.urlduck}url('./assets/end.png')`;
                break;

        }
    }
}

export default Player;