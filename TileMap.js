export default class TileMap {
    constructor(config, map) {
        this.tileSize = config.tileSize;
        this.map = map
        this.wall = this.#image(`${config.wall}`);
    }

    #image(fileName) {
        const img = new Image();
        img.src = `images/${fileName}`;
        return img;
    }

    draw(canvas, ctx) {
        this.#setCanvasSize(canvas);
        this.#drawMap(ctx);
    }

    #drawMap(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                let image = null;
                switch (tile) {
                    case 1:
                        image = this.wall
                        break;
                }
                if (image != null)
                    ctx.drawImage(
                        image,
                        column * this.tileSize,
                        row * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
            }
        }
    }

    #setCanvasSize(canvas) {
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }
}