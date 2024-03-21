export default class Game {
    constructor(tileMap) {
        this.tileMap = tileMap
        this.level = 0
        this.mapNumber = 0
        this.currentLevel = 0
        this.currentMapNumber = 0
    }
    gameLoop(level, mapNumber) {
        this.currentLevel = level
        this.currentMapNumber = mapNumber
        this.tileMap.clearCanvas();
        this.tileMap.draw(level, mapNumber);
        this.tileMap.updateBackground(this.tileMap.imgSize);
        this.gameInterval = setInterval(() => { 
            this.tileMap.drawMap(); 
            this.checkExit();
            this.checkCollision(); 
        }, 1000 / 60);
    }
    
    checkCollision() {
        const playerPosition = this.tileMap.player.position;
        const mummyPosition = this.tileMap.mummyWhite.position;
        if (playerPosition.x === mummyPosition.x && playerPosition.y === mummyPosition.y) {
            this.lose();
        }
    }
    
    new() {
        console.log("New game")
        this.level = 0
        this.mapNumber = 0
        this.gameLoop(0,0)
    }   
    checkExit() {
        const playerPosition = this.tileMap.player.position;
        const tileAtPlayer = this.tileMap.map[playerPosition.y][playerPosition.x];
        if (tileAtPlayer === 6) {
            this.pass();
        }
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
        console.log("Restart map: " + this.currentLevel + "." + this.currentMapNumber)
        document.getElementById('lose-screen').style.display = 'none'; 
        this.gameLoop(this.currentLevel, this.currentMapNumber);
    }
    
    lose() {
        console.log("You Lose!");
        document.getElementById('game').style.display = 'none';
        document.getElementById('wall').style.display = 'none';
        document.getElementById('lose-screen').style.display = 'flex';
    }   
    win() {
        console.log("You Win!");
        document.getElementById('game').style.display = 'none';
        document.getElementById('wall').style.display = 'none';
        document.getElementById('win-screen').style.display = 'flex';
    } 
}