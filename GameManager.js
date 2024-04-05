export default class Game {
    constructor(tileMap) {
        this.tileMap = tileMap
        this.level = 0
        this.mapNumber = 0
        this.currentLevel = 0
        this.currentMapNumber = 0
        this.gameInterval = null
    }
    gameLoop(level, mapNumber) {
        this.reset()
        this.currentLevel = level
        this.currentMapNumber = mapNumber
        this.tileMap.draw(level, mapNumber);
        this.gameInterval = setInterval(() => { 
            this.tileMap.drawMap();
        }, 1000 / 60);
    }
    
    checkCollision(playerPosition, mummyPosition) {
        if (playerPosition.x === mummyPosition.x && playerPosition.y === mummyPosition.y) {
            this.lose(playerPosition);
        }
    }
    
    checkExit(playerPosition) {
        const tileAtPlayer = this.tileMap.map[playerPosition.x][playerPosition.y];
        if (tileAtPlayer === 6) {
            this.pass();
        }
    }

    checkMovable(character) {
        let movable = character.movable
        for (let direction in movable) {
            movable[direction] = true //reset movable
        }
        let map = this.tileMap.map
        let max = this.tileMap.imgSize - 1
        let x = character.position.x
        let y = character.position.y
        //check rìa map
        if (x == max) {
            movable.down = false
        }
        if (y == max) {
            movable.right = false
        }
        if (x == 0) {
            movable.up = false
        }
        if (y == 0) {
            movable.left = false
        }
        //check tường
        const tile = map[x][y]
        if (tile == 1) {
            movable.left = false
        }
        if (tile == 2) {
            movable.right = false
        }
        if (tile == 3) {
            movable.up = false
        }
        if (y + 1 <= max && map[x][y + 1] == 1) { // next right is left wall
            movable.right = false
        }
        if (y - 1 >= 0 && map[x][y - 1] == 2) { // next left is right wall
            movable.left = false
        }
        if (x + 1 <= max && map[x + 1][y] == 3) { // below is up wall
            movable.down = false
        }
    }

    check(player, mummyWhite) {
        this.checkCollision(player.position, mummyWhite.position)
        this.checkExit(player.position)
    }

    new() {
        console.log("New game")
        this.level = 0
        this.mapNumber = 0
        this.gameLoop(0,0)
    }

    pass() {
        this.mapNumber++
        if (this.mapNumber >= 2) {
            this.mapNumber = 0
            this.level++
            if (this.level >= 2) {
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

    lose(playerPosition) {
        clearInterval(this.gameInterval)
        this.tileMap.clearPlayer();
        this.tileMap.clearMummy();
        this.tileMap.drawCollisionImage(playerPosition);
        setTimeout(() => {
            console.log("You Lose!");
            document.getElementById('wall').style.display = 'none';
            const loseScreen = document.getElementById('lose-screen');
            loseScreen.style.display = 'flex';
            loseScreen.classList.add('show-screen');
        }, 2500);
    }
    win() {
        console.log("You Win!");
        document.getElementById('wall').style.display = 'none';
        const winScreen = document.getElementById('win-screen');
        winScreen.style.display = 'flex';
        winScreen.classList.add('show-screen');
    }
    reset() {
        clearInterval(this.gameInterval)
        this.tileMap.clearCanvas();
    }
}