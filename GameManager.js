export default class Game {
    constructor(tileMap) {
        this.tileMap = tileMap
        this.level = 0
        this.mapNumber = 0
    }
    gameLoop(level, mapNumber) {
        this.tileMap.draw(level, mapNumber)
        setInterval(() => { this.tileMap.drawMap(); }, 1000 / 60);
    }
    new() {
        console.log("New game")
        this.level = 0
        this.mapNumber = 0
        this.gameLoop(0,0)
    }
    pass() {
        this.mapNumber++
        if (this.mapNumber > 2) {
            this.mapNumber = 0
            this.level++
            if (this.level > 2) {
                this.win()
                return
            }
        }
        this.gameLoop(this.level, this.mapNumber)
    }
    restart() {
        console.log("Restart map: " + this.level + "." + this.mapNumber)
        this.gameLoop(this.level, this.mapNumber)
    }
    lose() {

    }
    win() {

    }
}