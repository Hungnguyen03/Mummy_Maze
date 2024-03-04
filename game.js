import TileMap from "./TileMap.js";
import Walls from "./Wall.js";

let mapConfig = await fetch("./mapConfig.json");
mapConfig = await mapConfig.json()
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let walls = new Walls(ctx);

const tileMap = new TileMap(canvas, mapConfig, walls);

function gameLoop() {
    tileMap.draw(0, 0);
}

setInterval(gameLoop, 1000 / 60);