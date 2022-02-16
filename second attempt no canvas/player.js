class Player {
    constructor(currentIndex) {

        this.squares = document.querySelectorAll('.grid div');
        this.currentIndex = currentIndex;
        this.width = 9;
        this.shouldMove = true; 
        
        document.addEventListener('keyup', (e) => {
            this.movePlayer(e);
        });
    }


    movePlayer(e) {
        if (this.shouldMove) {

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
        }
    }
}




export default Player;