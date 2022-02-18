class Player {
    constructor(currentIndex) {

        this.squares = document.querySelectorAll('#grid div');
        this.player = document.querySelector('.player');
        this.currentIndex = currentIndex;
        this.width = 9;
        this.shouldMove = true;
        this.urlduck;
        this.urlLog1;
        this.urlLog2;
        this.urlLog3;
        this.direction;

        document.addEventListener('keyup', (e) => {
            this.movePlayer(e);
        });

    }

    movePlayer(e) {
        if (this.shouldMove) {

            this.changeBackround('remove');
            this.squares[this.currentIndex].classList.remove('player')

            switch (e.code) {
                case 'ArrowLeft':
                    // checking for the left border
                    if (this.currentIndex % this.width !== 0) {
                        this.currentIndex -= 1;
                        this.direction = 'left'
                    }
                    break;

                case 'ArrowRight':
                    // checking for the right border
                    if (this.currentIndex % this.width < this.width - 1) {
                        this.currentIndex += 1;
                        this.direction = 'right'
                    }
                    break;

                case 'ArrowUp':
                    // checking for the top border
                    if (this.currentIndex - this.width >= 0) {
                        this.currentIndex -= this.width;
                        this.direction = 'up'
                    }
                    break;

                case 'ArrowDown':
                    if (this.currentIndex + this.width < this.width * this.width) {
                        this.currentIndex += this.width;
                        this.direction = 'down'
                    }
                    break;
            }
            this.squares[this.currentIndex].classList.add('player')
            this.changeBackround('add');

        }
    }

    changeBackround(operation) {


        this.player = document.querySelector('.player');
        if (operation === 'add') {
            if (this.direction === undefined || this.direction === 'up') {
                this.urlduck = `url('./assets/duck.png') , `;
            }

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

            this.urlLog1 = `url('./assets/log1.png')`;
            this.urlLog2 = `url('./assets/log2.png')`;
            this.urlLog3 = `url('./assets/log3.png')`;

        } else {
            this.urlduck = ``;
            this.urlLog1 = ``;
            this.urlLog2 = ``;
            this.urlLog3 = ``;
        }


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