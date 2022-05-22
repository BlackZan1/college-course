import { PIXI } from '../utils/pixi'

export class Sprite {
    spritesheet = {}
    textureSprite = {}
    sprite = {}
    offset = {
        x: 0,
        y: 0
    }

    constructor(texture, x, y, width, height) {
        this.texture = texture
        this.offset = {
            x: x * width,
            y: y * height
        }
        this.width = width
        this.height = height

        this.init()
    }

    init() {
        // this.spritesheet = PIXI.BaseTexture.from(this.texture)
        // this.textureSprite = PIXI.Texture(
        //     this.spritesheet,
        //     PIXI.Rectangle(this.offset.x, this.offset.y, this.width, this.height)
        // )
        // this.sprite = PIXI.Sprite.from(this.textureSprite)
        this.sprite = new PIXI.Sprite.from(this.texture)
    }
}