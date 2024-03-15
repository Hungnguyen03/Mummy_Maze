export default class MummyWhite {
    constructor(ctx) {
        this.ctx = ctx
        this.position = {
            x: null,
            y: null
        }
        this.image = new Image();
        this.previousPosition = { x: null, y: null };
        this.movable = {
            up: true,
            down: true,
            left: true,
            right: true,
        }
        this.frameX = 0;
        this.frameY = 2;
        this.isAnimating = false;
        this.isMoving = false;
        // document.addEventListener("keydown", this.#keydown.bind(this));

    }

    draw(size, tileSize) {
        //xoa hinh anh o vi tri cu
        if (this.previousPosition.x !== null && this.previousPosition.y !== null) {
            this.ctx.clearRect(
                this.previousPosition.y * tileSize,
                this.previousPosition.x * tileSize,
                tileSize,
                tileSize
            );
        }

        this.image.src = `images/mummy_white${size}.png`;
        this.ctx.clearRect(
            this.position.y * tileSize,
            this.position.x * tileSize,
            tileSize,
            tileSize
        )
        this.ctx.drawImage(
            this.image,
            this.frameX * tileSize,
            this.frameY * tileSize,
            tileSize,
            tileSize,
            this.position.y * tileSize + 9,
            this.position.x * tileSize + 9,
            tileSize - 15,
            tileSize - 15
        );

    }

    animate() {
        const frameRate = 5;
        const animateFrame = () => {
            if (this.frameX < 4) {
                this.frameX++;
            } else {
                this.frameX = 0;
                this.isAnimating = false;
            }
            console.log(this.frameX)
            if (this.isAnimating) {
                setTimeout(() => {
                    requestAnimationFrame(animateFrame);
                }, 1000 / frameRate);
            }
        };
        if (this.isAnimating) {
            animateFrame();
        }
    }


    // #keydown = (event) => {
    //     if (this.isAnimating || this.isMoving) return;
    //     this.previousPosition.x = this.position.x;
    //     this.previousPosition.y = this.position.y;

    //     let targetX = this.position.x;
    //     let targetY = this.position.y;
    //     switch (event.keyCode) {
    //         case 38: // up arrow
    //             if (this.movable.up) {
    //                 targetX--;
    //                 this.frameY = 0;
    //                 this.isMoving = true;
    //             }
    //             break;
    //         case 40: // down arrow
    //             if (this.movable.down) {
    //                 targetX++;
    //                 this.frameY = 2;
    //                 this.isMoving = true;
    //             }
    //             break;
    //         case 37: // left arrow
    //             if (this.movable.left) {
    //                 targetY--;
    //                 this.frameY = 3;
    //                 this.isMoving = true;
    //             }
    //             break;
    //         case 39: // right arrow
    //             if (this.movable.right) {
    //                 targetY++;
    //                 this.frameY = 1;
    //                 this.isMoving = true;
    //             }
    //             break;
    //         default:
    //             return;
    //     }
    //     this.targetPosition = { x: targetX, y: targetY };
    //     this.isAnimating = true;
    //     this.animateInterpolation();
    // };

    animateInterpolation() {
        const duration = 450;
        const startTime = performance.now();

        const interpolate = (start, end, progress) => {
            return start + (end - start) * progress;
        };

        const step = (timestamp) => {
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            this.position.x = interpolate(this.previousPosition.x, this.targetPosition.x, progress);
            this.position.y = interpolate(this.previousPosition.y, this.targetPosition.y, progress);

            this.animate();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this.isMoving = false;
                this.isAnimating = false;
                this.previousPosition.x = this.position.x;
                this.previousPosition.y = this.position.y;
                this.frameX = 0;
            }
        };

        requestAnimationFrame(step);
    }
}