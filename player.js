import MovingDirection from "./MovingDirection.js";

export default class Player {
    constructor(ctx){
        this.x;
        this.y;
        
        this.velocity=1;

        this.ctx = ctx
        this.image = new Image()

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.playerAnimationTimerDefault =10;
        this.playerAnimationTimer = null;

        document.addEventListener("keydown",this.#keydown)

        //this.#loadPlayerImages();
    }
    // draw(ctx){
    //     this.#move();
    //     //this.#animate();
    //     ctx.drawImage(
    //         this.playerImages[this.playerImageIndex],
    //         this.x,
    //         this.y,
    //         this.tileSize,
    //         this.tileSize
    //     );
    // }

    draw(size, column, row, tileSize) {
        this.image.src = `images/explorer${size}.png`;
        this.ctx.drawImage(
            this.image,
            column * tileSize,
            row * tileSize,
            tileSize,
            tileSize
        );
    }
    // #loadPlayerImages(){
    //     const playerImage1 = new Image();
    //     playerImage1.src = './images/explorer1.png';

    //     const playerImage2 = new Image();
    //     playerImage2.src = './images/explorer2.png';

    //     const playerImage3 = new Image();
    //     playerImage3.src = './images/explorer3.png';

    //     const playerImage4 = new Image();
    //     playerImage4.src = './images/explorer4.png';

    //     this.playerImages = [
    //         playerImage1,
    //         playerImage2,
    //         playerImage3,
    //         playerImage4,
    //     ];

    //     this.playerImageIndex = 2;
    // }

    #keydown=(event)=>{
        //up
        if(event.keyCode == 38){
            if(this.currentMovingDirection == MovingDirection.down)
            this.currentMovingDirection = MovingDirection.up;
            this.requestedMovingDirection = MovingDirection.up;
        }
        //down
        if(event.keyCode == 40){
            if(this.currentMovingDirection == MovingDirection.up)
            this.currentMovingDirection = MovingDirection.down;
            this.requestedMovingDirection = MovingDirection.down;
        }
        //left
        if(event.keyCode == 37){
            if(this.currentMovingDirection == MovingDirection.right)
            this.currentMovingDirection = MovingDirection.left;
            this.requestedMovingDirection = MovingDirection.left;
        }
        //right
        if(event.keyCode == 39){
            if(this.currentMovingDirection == MovingDirection.left)
            this.currentMovingDirection = MovingDirection.right;
            this.requestedMovingDirection = MovingDirection.right;
        }
    };

    #move(){
        if(this.currentMovingDirection !== this.requestedMovingDirection){
            if(
                Number.isInteger(this.x/this.tileSize) && 
                Number.isInteger(this.y/this.tileSize)
                )
                {
                    if(
                        !this.tileMap.didCollideWithEnvironment(
                        this.x,
                        this.y,
                        this.requestedMovingDirection))
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
        }

        if(this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.currentMovingDirection))
        {
            this.playerAnimationTimer = null;
            return;
        }
        else if(this.currentMovingDirection != null && this.playerAnimationTimer ==null)
        {
            this.playerAnimationTimer = this.playerAnimationTimerDefault;
        }

        switch(this.currentMovingDirection){
            case MovingDirection.up:
                this.y -= this.velocity;
                break;
            case MovingDirection.down:
                this.y += this.velocity;
                break; 
            case MovingDirection.left:
                this.x -= this.velocity;
                break; 
            case MovingDirection.right:
                this.x += this.velocity;
                break;  
        }
    }

    #animate(){
       if(this.playerAnimationTimer == null) {
        return;
       }
       this.playerAnimationTimer--;
       if(this.playerAnimationTimer ==0){
        this.playerAnimationTimer = this.playerAnimationTimerDefault;
        this.playerImageIndex++;
        if(this.playerImageIndex == this.playerImages.length)
        this.playerImageIndex=0;
       }
    }
}



