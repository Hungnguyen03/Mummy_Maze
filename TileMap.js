export default class TileMap {
    constructor(canvas, mapConfig, walls) {
        this.canvas = canvas
        this.mapConfig = mapConfig
        this.map
        this.tileSize
        this.imgSize
        this.walls = walls
    }
    updateMap(config, map) {
        let { tileSize, imgSize } = config
        this.tileSize = tileSize
        this.imgSize = imgSize
        this.map = map
    }

    setMap(level, mapNumber) {
        let selectedConfig = this.mapConfig[level];
        let selectedMap = selectedConfig.maps[mapNumber];
        if (!selectedConfig || !selectedMap) {
            console.log("Not found map: " + level + "." + mapNumber)
            return
        }
        this.updateMap(selectedConfig, selectedMap)
    }

    draw(level, mapNumber) {
        try {
            this.setMap(level, mapNumber)
            this.#setCanvasSize();
            this.#drawBackground();
            this.#drawMap();
        } catch (e) {
            console.log("Error when draw map:", e)
        }
    }

    #drawMap() {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                switch (tile) {
                    case 1:
                        this.walls.drawWallLeft(this.imgSize, column, row, this.tileSize);
                        break;
                    case 2:
                        this.walls.drawWallRight(this.imgSize, column, row, this.tileSize);
                        break;
                    case 3:
                        this.walls.drawWallTop(this.imgSize, column, row, this.tileSize);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    #drawBackground() {
        let gameElement = document.getElementById('game');
        gameElement.style.backgroundImage = `url('images/floor${this.imgSize}.jpg')`;

    }

    #setCanvasSize() {
        this.canvas.height = this.map.length * this.tileSize;
        this.canvas.width = this.map[0].length * this.tileSize;
    }
}