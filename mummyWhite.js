export default class MummyWhite {
    constructor(ctx) {
        this.ctx = ctx
        this.position = {
            x: null,
            y: null
        }
        this.image = new Image()
    }

    draw(size, tileSize) {
        this.image.src = `images/mummy_white${size}.png`
        this.ctx.drawImage(
            this.image,
            this.position.x * tileSize,
            this.position.y * tileSize,
            tileSize,
            tileSize
        )
    }
    move() {

    }
}