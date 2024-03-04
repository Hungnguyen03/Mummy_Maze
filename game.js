import Player from "./player.js";
import TileMap from "./TileMap.js";

let mapConfig = await fetch("./mapConfig.json");
mapConfig = await mapConfig.json()
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let player = new Player(ctx)
const tileMap = new TileMap(canvas, mapConfig, player);
//let player = tileMap.getPlayer(velocity);

function gameLoop() {
    tileMap.draw(0,0);
    //player.draw(ctx);
}

setInterval(gameLoop, 1000 / 60);