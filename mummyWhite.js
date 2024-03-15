export default class MummyWhite {
    constructor(ctx) {
        this.ctx = ctx
        this.position = {
            x: null,
            y: null
        }
        this.movable = {
            up: true,
            down: true,
            left: true,
            right: true,
        }
        this.image = new Image()
    }

    draw(size, tileSize) {
        this.image.src = `images/mummy_white${size}.png`
        this.ctx.drawImage(
            this.image,
            this.position.y * tileSize,
            this.position.x * tileSize,
            tileSize,
            tileSize
        )
    }
    move() {

    }
}