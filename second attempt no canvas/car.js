class Car {
    constructor() {
        this.carsLeft = document.querySelectorAll('.car-left');
        this.carsRight = document.querySelectorAll('.car-right');
    }


    moveCarLeft(carLeft) {
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

    moveCarRight(carRight) {
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
}

export default Car; 