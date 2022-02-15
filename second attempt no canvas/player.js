class Player {
    constructor(currentIndex) {

        this.squares = document.querySelectorAll('.grid div');
        this.currentIndex = currentIndex;
        this.width = 9;
        this.shouldMove = true; 
        

    }


    movePlayer(e) {
        if (this.shouldMove) {

            this.squares[this.currentIndex].classList.remove('player')
            switch (e.code) {
                case 'ArrowLeft':
                    console.log('move left');
                    // checking for the left border
                    if (this.currentIndex % this.width !== 0) {
                        this.currentIndex -= 1;
                    }
                    break;

                case 'ArrowRight':
                    console.log('move right');
                    // checking for the right border
                    if (this.currentIndex % this.width < this.width - 1) {
                        this.currentIndex += 1;
                    }
                    break;

                case 'ArrowUp':
                    console.log('move up');
                    // checking for the top border
                    if (this.currentIndex - this.width >= 0) {
                        this.currentIndex -= this.width;
                    }

                    break;

                case 'ArrowDown':
                    console.log('move down');
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