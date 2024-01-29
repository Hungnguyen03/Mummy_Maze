import TileMap from "./TileMap.js";
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let mapConfig = await fetch("./mapConfig.json");
mapConfig = await mapConfig.json()

function getMap(mapConfig) {
    let randomConfigIndex = Math.floor(Math.random() * mapConfig.length);
    let selectedConfig = mapConfig[randomConfigIndex];
    let randomMapIndex = Math.floor(Math.random() * selectedConfig.maps.length);
    let selectedMap = selectedConfig.maps[randomMapIndex];
    return { config: selectedConfig, map: selectedMap };
}

let { config, map } = getMap(mapConfig)
let tileMap = new TileMap(config, map);

let gameElement = document.getElementById('game');
gameElement.style.backgroundImage = `url('${config.floor}')`;


function gameLoop() {
    tileMap.draw(canvas, ctx);
}

setInterval(gameLoop, 1000 / 60);