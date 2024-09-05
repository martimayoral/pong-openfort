import * as PIXI from 'pixi.js'

export class SmartContainer extends PIXI.Container {
    margin: number
    canvasWidth: number
    canvasHeight: number
    aspectRatio: number = 1

    constructor({
        margin = 0,
        canvasWidth = 1000,
        canvasHeight = 1000
    }: {
        aspectRatio?: number,
        margin?: number,
        canvasWidth?: number,
        canvasHeight?: number
    } = {}) {
        super()
        this.margin = margin
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.onResize()
    }

    onResize(width: number = window.innerWidth, height: number = window.innerHeight) {




        var w: number = width
        var h: number = height

        const horizontal = height < width * this.aspectRatio
     
        if (horizontal)
            this.scale.set(h / w, 1)

        else
            this.scale.set(1, w / h)


        this.position.x = this.canvasWidth / 2 - this.width / 2
        this.position.y = this.canvasHeight / 2 - this.height / 2


    }

}