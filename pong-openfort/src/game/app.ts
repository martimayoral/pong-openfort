import * as PIXI from 'pixi.js'

import { messageHeader, sendMessage } from '../sendMessage'
import { PingPong } from './pingPong'
import { UI } from './ui'
import k from "./../assets/KOMTXT.ttf"
import { SmartContainer } from './SmartContainer'

// size variables
export const CANVAS_ASPECT_RATIO = 1
export const CANVAS_WIDTH = 1000
export const CANVAS_HEIGHT = CANVAS_WIDTH * CANVAS_ASPECT_RATIO
export const PIXEL_SIZE = 20

// player size
export const PLAYER_WIDTH = 1 * PIXEL_SIZE
export const PLAYER_HEIGHT = 10 * PIXEL_SIZE
export const PLAYER_MARGIN = 1 * PIXEL_SIZE

export const BALL_SIZE = PIXEL_SIZE / 2


// Key codes
export const KEY_CODE_UP = "w"
export const KEY_CODE_DOWN = "s"


export class GameApp extends PIXI.Application<HTMLCanvasElement> {
  container!: SmartContainer
  pingPong!: PingPong
  ui!: UI

  waitingForReady!: boolean

  constructor() {
    // super({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: 0xcccccc })
    super({ width: window.innerWidth, height: window.innerHeight, background: 0xcccccc })
    document.body.appendChild(this.view)


    PIXI.Assets.addBundle("assets", {
      font: k
    })
    PIXI.Assets.loadBundle("assets")
      .then(() => {
        this.container = this.stage.addChild(new SmartContainer({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT }))
        this.pingPong = this.container.addChild(new PingPong())
        this.ui = this.container.addChild(new UI())

        this.waitingForReady = false


        this.resizeRenderer()

        sendMessage({ ...messageHeader, type: "loaded" })
      })


    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.stop()
    document.body.onresize = () => this.resizeRenderer()
  }

  startGame() {
    this.ui.startCountdown()
    PIXI.Ticker.shared.stop()
    setTimeout(() => {
      PIXI.Ticker.shared.start()
    }, 3000)
  }

  resizeRenderer() {
    if (!this || !this.renderer || !this.container)
      return

    this.container.onResize()

    this.renderer.resize(window.innerWidth, window.innerHeight)
  }

}