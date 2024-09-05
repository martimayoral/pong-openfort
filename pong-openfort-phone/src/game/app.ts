import * as PIXI from 'pixi.js'

import k from "./../assets/KOMTXT.ttf"
import { PingPong } from './pingPong'
import { SmartContainer } from './SmartContainer'
import { UI } from './ui'
import { GameHandler } from '../gameHandler'
import { PlayerColor } from '../playerColor'

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
export const gameHandler = new GameHandler()

export class GameApp extends PIXI.Application<HTMLCanvasElement> {
  container!: SmartContainer
  pingPong!: PingPong
  ui!: UI
  score: { [score in PlayerColor]: number }

  waitingForReady!: boolean

  constructor() {
    // super({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: 0xcccccc })
    super({ width: window.innerWidth, height: window.innerHeight, background: 0x323232 })
    document.body.appendChild(this.view)

    this.score = { green: 0, red: 0 }
    PIXI.Assets.addBundle("assets", {
      font: k
    })
    PIXI.Assets.loadBundle("assets")
      .then(() => {
        this.container = this.stage.addChild(new SmartContainer({ canvasWidth: CANVAS_WIDTH, canvasHeight: CANVAS_HEIGHT }))
        this.pingPong = this.container.addChild(new PingPong())
        this.ui = this.container.addChild(new UI())

        this.container.eventMode = "dynamic"
        this.container.onpointermove = e => {
          const localPos = e.getLocalPosition(this.container)
          if (localPos.x > CANVAS_WIDTH / 2)
            this.pingPong.greenPlayer.y = localPos.y - (PLAYER_HEIGHT / 2)
          else
            this.pingPong.redPlayer.y = localPos.y - (PLAYER_HEIGHT / 2)
        }

        this.waitingForReady = false


        this.resizeRenderer()

        this.startGame()
      })


    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.stop()
    document.body.onresize = () => this.resizeRenderer()
  }

  startGame() {
    const newPos = gameHandler.getNewBallStartPositionAndDirection()
    this.pingPong.ball.setPositionAndDirection(
      newPos.x,
      newPos.y,
      newPos.dx,
      newPos.dy
    )
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

  onPlayerLose(player: PlayerColor) {
    this.score[player == "red" ? "green" : "red"]++
    this.ui.setScore(this.score)
    
    if (this.score["green"] == 10) {
      PIXI.Ticker.shared.stop()
      this.pingPong.ball.hide()
      this.ui.winMessage("green")
      return
    } if (this.score["red"] == 10) {
      PIXI.Ticker.shared.stop()
      this.pingPong.ball.hide()
      this.ui.winMessage("red")
      return
    }
    
    this.startGame()
  }
}