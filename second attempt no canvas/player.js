class Player {
    constructor(currentIndex) {

        this.squares = document.querySelectorAll('#grid div');
        this.player =  document.querySelector('.player');
        this.currentIndex = currentIndex;
        this.width = 9;
        this.shouldMove = true;

        document.addEventListener('keyup', (e) => {
            this.movePlayer(e);
        });
        this.img = new Image(60, 60);
        this.img.src = './assets/duck.png'


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
                        
                    }
                    break;

                case 'ArrowRight':

                    // checking for the right border
                    if (this.currentIndex % this.width < this.width - 1) {
                        this.currentIndex += 1;
                        
                    }
                    break;

                case 'ArrowUp':

                    // checking for the top border
                    if (this.currentIndex - this.width >= 0) {
                        this.currentIndex -= this.width;
                        
                    }

                    break;

                case 'ArrowDown':

                    if (this.currentIndex + this.width < this.width * this.width) {
                        this.currentIndex += this.width;
                        
                    }
                    break;
            }
            
            
            this.squares[this.currentIndex].classList.add('player')
            this.changeBackround('add'); 
            
            
            

        }
    }

    changeBackround(operation) {
        let urlduck;
        let urlLog1;
        let urlLog2; 
        let urlLog3; 

        this.player =  document.querySelector('.player');
        if (operation === 'add') {
            urlduck =  `url('./assets/duck.png') , `;
            urlLog1 = `url('./assets/log1.png')`;
            urlLog2 = `url('./assets/log2.png')`;
            urlLog3 = `url('./assets/log3.png')`;

        } else {
            urlduck =  ``;
            urlLog1 = ``; 
            urlLog2 = ``; 
            urlLog3 = ``;  
        }


        switch (true) {
            case this.squares[this.currentIndex].classList.contains('startBlock', 'player'):
                this.player.style.background = `${urlduck}url('./assets/start.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('default', 'player'):
                this.player.style.background = `${urlduck}url('./assets/grass.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('c2', 'player'):
                this.player.style.background = `${urlduck}url('./assets/road.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('c3', 'player'):
                this.player.style.background = `${urlduck}url('./assets/road.png')`;
                break;
            case this.squares[this.currentIndex].classList.contains('l1', 'player'):
                this.player.style.background = `${urlduck}${urlLog1}`;
                break;
            case this.squares[this.currentIndex].classList.contains('l2', 'player'):
                this.player.style.background = `${urlduck}${urlLog2}`;
                break;
            case this.squares[this.currentIndex].classList.contains('l3', 'player'):
                this.player.style.background = `${urlduck}${urlLog3}`;
                break;
            case this.squares[this.currentIndex].classList.contains('lastBlock', 'player'):
                this.player.style.background = `${urlduck}url('./assets/start.png')`;
                break;

        }

        

    }
}

export default Player;