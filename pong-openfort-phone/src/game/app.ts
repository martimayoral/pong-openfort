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

export const WIN_CON = 10

// Key codes
export const KEY_CODE_UP = "w"
export const KEY_CODE_DOWN = "s"
export const KEY_CODE_UP_2 = "ArrowUp"
export const KEY_CODE_DOWN_2 = "ArrowDown"
export const KEY_RESTART = "r"

export const gameHandler = new GameHandler()

export class GameApp extends PIXI.Application<HTMLCanvasElement> {
  container!: SmartContainer
  pingPong!: PingPong
  ui!: UI
  keyboardControll: boolean
  gameEnded: boolean

  constructor() {
    // super({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, background: 0xcccccc })
    super({ width: window.innerWidth, height: window.innerHeight, background: 0x323232 })
    document.body.appendChild(this.view)

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
          if (this.keyboardControll) return

          const localPos = e.getLocalPosition(this.container)
          if (localPos.x > CANVAS_WIDTH / 2)
            this.pingPong.greenPlayer.y = localPos.y - (PLAYER_HEIGHT / 2)
          else
            this.pingPong.redPlayer.y = localPos.y - (PLAYER_HEIGHT / 2)
        }

        this.container.onpointerdown = () => {
          this.keyboardControll = false
          if (this.gameEnded)
            this.restartGame()
        }




        this.resizeRenderer()

        this.startGame()
      })

    this.keyboardControll = false
    this.gameEnded = false
    PIXI.Ticker.shared.autoStart = false;
    PIXI.Ticker.shared.stop()
    document.body.onresize = () => this.resizeRenderer()
  }

  startGame(throwTo: PlayerColor | "random" = "random") {
    const newPos = gameHandler.getNewBallStartPositionAndDirection(throwTo)
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

  restartGame() {
    this.gameEnded = false
    gameHandler.score.green = 0
    gameHandler.score.red = 0
    this.pingPong.ball.show()
    this.ui.reset()
    this.startGame()
  }

  resizeRenderer() {
    if (!this || !this.renderer || !this.container)
      return

    this.container.onResize()

    this.renderer.resize(window.innerWidth, window.innerHeight)
  }

  onPlayerLose(player: PlayerColor) {
    this.gameEnded = true
    gameHandler.score[player == "red" ? "green" : "red"]++
    this.ui.setScore(gameHandler.score)

    if (gameHandler.score["green"] == WIN_CON) {
      this.ui.winMessage("green")
      PIXI.Ticker.shared.stop()
      this.pingPong.ball.hide()
      this.gameEnded = true
      return
    } if (gameHandler.score["red"] == WIN_CON) {
      this.ui.winMessage("red")
      PIXI.Ticker.shared.stop()
      this.pingPong.ball.hide()
      this.gameEnded = true
      return
    }

    this.startGame(player == "red" ? "green" : "red")
  }
}