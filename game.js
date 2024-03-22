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
const tileMap = new TileMap(ctx, canvas, mapConfig, player, walls, mummyWhite);
const game = new Game(tileMap)
game.new()
player.addEventListener('check', async (event) => {
    game.check(player, mummyWhite)
});
document.getElementById('new-game-button').addEventListener('click', function() {
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('wall').style.display = 'flex';
    game.new()
});

document.getElementById('new-game-button-lose').addEventListener('click', function() {
    document.getElementById('lose-screen').style.display = 'none';
    document.getElementById('wall').style.display = 'flex';
    game.new()
});

document.getElementById('restart-button').addEventListener('click', function() {
    document.getElementById('lose-screen').style.display = 'none';
    document.getElementById('wall').style.display = 'flex';
    game.restart()
});