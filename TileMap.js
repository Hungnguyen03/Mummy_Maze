export default class TileMap {
    constructor(canvas, mapConfig, player, walls, mummyWhite) {
        this.canvas = canvas
        this.mapConfig = mapConfig
        this.map
        this.tileSize
        this.imgSize
        this.player = player
        this.walls = walls
        this.mummyWhite = mummyWhite
    }
    updateMap(config, map, mapNumber) {
        let { tileSize, imgSize } = config
        this.tileSize = tileSize
        this.imgSize = imgSize
        this.map = map
        this.player.position = config[mapNumber].E
        this.mummyWhite.position = config[mapNumber].MW
    }

    setMap(level, mapNumber) {
        let selectedConfig = this.mapConfig[level];
        let selectedMap = selectedConfig.maps[mapNumber];
        if (!selectedConfig || !selectedMap) {
            console.log("Not found map: " + level + "." + mapNumber)
            return
        }
        this.updateMap(selectedConfig, selectedMap, mapNumber)
    }

    draw(level, mapNumber) {
        try {
            this.setMap(level, mapNumber)
            this.#setCanvasSize();
            this.#drawBackground();
        } catch (e) {
            console.log("Error when draw map:", e)
        }
    }

    drawMap() {
        this.player.draw(this.imgSize, this.tileSize);
        this.mummyWhite.draw(this.imgSize, this.tileSize);
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

    // getPlayer(velocity){
    //     for(let row=0; row<this.map.length;row++){
    //         for(let column=0;column<this.map[row].length;column++){
    //             let tile = this.map[row][column];
    //             if(tile ===2){
    //                 //this.map[row][column] = 0;
    //                 return new Player(column*this.tileSize,
    //                     row*this.tileSize,
    //                     this.tileSize,
    //                     velocity,
    //                     this
    //                 );
    //             }
    //         }
    //     }
    // }

    // didCollideWithEnvironment(x,y,direction){
    //     if(direction == null){
    //         return;
    //     }     
    //     if(
    //         Number.isInteger(x/this.tileSize)&&
    //         Number.isInteger(y/this.tileSize))
    //     {
    //         let column = 0;
    //         let row = 0;
    //         let nextColumn = 0;
    //         let nextRow = 0;

    //         switch(direction){
    //             case MovingDirection.right:
    //                 nextColumn = x + this.tileSize;
    //                 column = nextColumn / this.tileSize;
    //                 row = y/this.tileSize;
    //                 break;
    //             case MovingDirection.left:
    //                 nextColumn = x - this.tileSize;
    //                 column = nextColumn / this.tileSize;
    //                 row = y/this.tileSize;
    //                 break;
    //             case MovingDirection.up:
    //                 nextRow = y - this.tileSize;
    //                 row = nextRow / this.tileSize;
    //                 col = x/this.tileSize;
    //                 break;
    //             case MovingDirection.down:
    //                 nextRow = y + this.tileSize;
    //                 row = nextRow / this.tileSize;
    //                 col = x/this.tileSize;
    //                 break;
    //         }
    //         const tile = this.map[row][column];
    //         if(tile===1){
    //             return true;
    //         }
    //     } return false
    // }
}


