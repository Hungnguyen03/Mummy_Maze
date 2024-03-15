import Player from "./player.js";
import TileMap from "./TileMap.js";
import Walls from "./Wall.js";
import Game from "./GameManager.js";
import MummyWhite from "./mummyWhite.js"
let mapConfig = await fetch("./mapConfig.json");
mapConfig = await mapConfig.json()
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let walls = new Walls(ctx);
let player = new Player(ctx)
let mummyWhite = new MummyWhite(ctx)
const tileMap = new TileMap(canvas, mapConfig, player, walls, mummyWhite);
const game = new Game(tileMap)
//let player = tileMap.getPlayer(velocity);
game.new()
function check(character) {
    let map = tileMap.map
    let max = tileMap.imgSize - 1
    let x = character.position.x
    let y = character.position.y
    //check rìa map
    if (x == max) {
        character.movable.right = false
    }
    if (y == max) {
        character.movable.down = false
    }
    if (x == 0) {
        character.movable.left = false
    }
    if (y == 0) {
        character.movable.up = false
    }
    //check tường
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const tile = map[x][y];
            if (tile == 1) {
                character.movable.left = false
            }
            if (tile == 2) {
                character.movable.right = false
            }
            if (tile == 3) {
                character.movable.up = false
            }
            if (map[x + 1][y]) {

            }
            if (map[x][y + 1]) {

            }
            if (map[x - 1][y]) {

            }
            if (map[x][y - 1]) {

            }
        }
    }
}
