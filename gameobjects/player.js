class Player {
    constructor(ctx3, x, y, width, height, CONFIG) {
        this.ctx3 = ctx3;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.CONFIG = CONFIG;

        this.moving = false;
        this.currentKeys = {};
        this.usedKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft']
        this.init(); 
    }


    init() {
     
        
    };



    update(timePassedSinceLastRender) {

        
        if (this.currentKeys['ArrowUp']) {
            this.x += timePassedSinceLastRender - 10;
            console.log('go up')
            
        }
        

    };

    render() {
        this.ctx3.resetTransform();
        this.ctx3.fillStyle = 'brown';
        this.ctx3.fillRect(this.x, this.y, this.width, this.height);


    };

}

export default Player;