export default class Player {
    constructor(ctx){
        this.position = {
            x: null,
            y: null
        }
        this.ctx = ctx
        this.image = new Image()

        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;

        this.playerAnimationTimerDefault =10;
        this.playerAnimationTimer = null;
        this.MovingDirection = {
            up: 0,
            down: 1,
            left: 2,
            right: 3,
        };
        this.movable = {
            up: true,
            down: true,
            left: true,
            right: true,
        }

        document.addEventListener("keydown",this.#keydown)
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

    draw(size, tileSize) {
        this.image.src = `images/explorer${size}.png`;
        this.ctx.drawImage(
            this.image,
            this.position.x * tileSize,
            this.position.y * tileSize,
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
            this.position.y--

            // if(this.currentMovingDirection == this.MovingDirection.down)
            // this.currentMovingDirection = this.MovingDirection.up;
            // this.requestedMovingDirection = this.MovingDirection.up;
        }
        //down
        if(event.keyCode == 40){
            this.position.y++
            // if(this.currentMovingDirection == this.MovingDirection.up)
            // this.currentMovingDirection = this.MovingDirection.down;
            // this.requestedMovingDirection = this.MovingDirection.down;
        }
        //left
        if(event.keyCode == 37){
            this.position.x--
            // if(this.currentMovingDirection == this.MovingDirection.right)
            // this.currentMovingDirection = this.MovingDirection.left;
            // this.requestedMovingDirection = this.MovingDirection.left;
        }
        //right
        if(event.keyCode == 39){
            this.position.x++
            // if(this.currentMovingDirection == this.MovingDirection.left)
            // this.currentMovingDirection = this.MovingDirection.right;
            // this.requestedMovingDirection = this.MovingDirection.right;
        }
    };

    // #move(tileSize){
    //     if(this.currentMovingDirection !== this.requestedMovingDirection){
    //         if(
    //             Number.isInteger(this.x/tileSize) && 
    //             Number.isInteger(this.y/tileSize)
    //             )
    //             {
    //                 // if(
    //                 //     !this.tileMap.didCollideWithEnvironment(
    //                 //     this.x,
    //                 //     this.y,
    //                 //     this.requestedMovingDirection))
    //                 this.currentMovingDirection = this.requestedMovingDirection;
    //             }
    //     }

    //     // if(this.tileMap.didCollideWithEnvironment(
    //     //     this.x,
    //     //     this.y,
    //     //     this.currentMovingDirection))
    //     // {
    //     //     this.playerAnimationTimer = null;
    //     //     return;
    //     // }
    //     // else if(this.currentMovingDirection != null && this.playerAnimationTimer ==null)
    //     // {
    //     //     this.playerAnimationTimer = this.playerAnimationTimerDefault;
    //     // }

    //     switch(this.currentMovingDirection){
    //         case this.MovingDirection.up:
    //             this.y -= 1;
    //             break;
    //         case this.MovingDirection.down:
    //             this.y += 1;
    //             break; 
    //         case this.MovingDirection.left:
    //             this.x -= 1;
    //             break; 
    //         case this.MovingDirection.right:
    //             this.x += 1;
    //             break;  
    //     }
    // }

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



