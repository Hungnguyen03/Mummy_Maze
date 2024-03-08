export default class Walls {
    constructor(ctx) {
        this.ctx = ctx;
        this.wallImage = new Image()
    }

    drawWallLeft(size, column, row, tileSize) {
        const { leftWall } = this.getWallSize(size);
        this.ctx.drawImage(
            this.wallImage,
            leftWall[0],
            leftWall[1],
            leftWall[2],
            leftWall[3],
            column * tileSize - 1,
            row * tileSize - 10,
            leftWall[2],
            leftWall[3]
        );
    }

    drawWallRight(size, column, row, tileSize) {
        const { rightWall } = this.getWallSize(size);
        if (size == 6 || size == 8) {
            this.ctx.drawImage(
                this.wallImage,
                rightWall[0],
                rightWall[1],
                rightWall[2],
                rightWall[3],
                (column + 1) * tileSize - rightWall[2] + 5,
                row * tileSize - 10,
                rightWall[2],
                rightWall[3]
            );
        }
        if (size == 10) {
            this.ctx.drawImage(
                this.wallImage,
                rightWall[0],
                rightWall[1],
                rightWall[2],
                rightWall[3],
                (column + 1) * tileSize - rightWall[2] + 3,
                row * tileSize - 11,
                rightWall[2],
                rightWall[3]
            );
        }
    }

    drawWallTop(size, column, row, tileSize) {
        const { topWall } = this.getWallSize(size);
        this.ctx.drawImage(
            this.wallImage,
            topWall[0],
            topWall[1],
            topWall[2],
            topWall[3],
            column * tileSize - 1,
            row * tileSize - 10,
            topWall[2],
            topWall[3]
        );
    }

    getWallSize(size) {
        let wallSize
        if (size == 6) {
            this.wallImage.src = `images/walls${size}.png`
            wallSize = {
                "leftWall": [0, 0, 12, 78],
                "rightWall": [84, 0, 12, 78],
                "topWall": [12, 0, 60, 18]
            }
        }
        if (size == 8) {
            this.wallImage.src = `images/walls${size}.png`
            wallSize = {
                "leftWall": [0, 0, 12, 63],
                "rightWall": [69, 0, 12, 63],
                "topWall": [12, 0, 57, 18]
            }
        }
        if (size == 10) {
            this.wallImage.src = `images/walls${size}.png`
            wallSize = {
                "leftWall": [0, 0, 8, 48],
                "rightWall": [52, 0, 8, 48],
                "topWall": [8, 0, 44, 12]
            }
        }
        return wallSize
    }

}
