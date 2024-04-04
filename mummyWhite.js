export default class MummyWhite extends EventTarget {
    constructor(ctx) {
        super()
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
    }
    move(playerPosition) {
        if (this.isAnimating || this.isMoving) return;
        this.dispatchEvent(new CustomEvent('check'))
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
        let possibleMoves = []; // Lưu trữ các bước di chuyển có thể
        const { x: playerX, y: playerY } = playerPosition;
        const { x, y } = this.position;
        
        // Tính khoảng cách Manhattan giữa xác ướp và người chơi
        const manhattanDistance = Math.abs(playerX - x) + Math.abs(playerY - y);

        // Kiểm tra nếu khoảng cách đã đạt tối đa, thì không cần di chuyển nữa
        if (manhattanDistance === 0) return;

        // Thử tất cả các hướng di chuyển và lưu vào mảng possibleMoves
        if (y > playerY && this.movable.left) possibleMoves.push({ x, y: y - 1 });
        if (y < playerY && this.movable.right) possibleMoves.push({ x, y: y + 1 });
        if (x > playerX && this.movable.up) possibleMoves.push({ x: x - 1, y });
        if (x < playerX && this.movable.down) possibleMoves.push({ x: x + 1, y });

        // Lựa chọn hướng di chuyển
        let chosenMove = possibleMoves[0]; // Mặc định là hướng đầu tiên
        if (!chosenMove) return
        let minDistance = Math.abs(playerX - chosenMove.x) + Math.abs(playerY - chosenMove.y);
        // Tìm hướng di chuyển tối ưu để giảm khoảng cách Manhattan
        for (let i = 1; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            const distance = Math.abs(playerX - move.x) + Math.abs(playerY - move.y);
            if (distance < minDistance) {
                chosenMove = move;
                minDistance = distance;
            }
        }     
        // Cập nhật hình ảnh sau cùng khi mummy di chuyển
        if (chosenMove.y > this.previousPosition.y) {
            this.frameY = 1; 
        } else if (chosenMove.y < this.previousPosition.y) {
            this.frameY = 3; 
        } else if (chosenMove.x < this.previousPosition.x) {
            this.frameY = 0; 
        } else if (chosenMove.x > this.previousPosition.x) {
            this.frameY = 2; 
        }
            this.isAnimating = true;            
            this.isMoving = true;
            this.targetPosition = {x:chosenMove.x,y:chosenMove.y};
            this.animateInterpolation();
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
                this.dispatchEvent(new CustomEvent('checkWin'))
            }
        };

        requestAnimationFrame(step);
    }
}