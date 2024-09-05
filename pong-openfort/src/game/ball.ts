import * as PIXI from 'pixi.js'
import { app } from '../main'
import { BALL_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, PLAYER_HEIGHT, PLAYER_MARGIN, PLAYER_WIDTH } from './app'
import { myColor } from '../playerColor'
import { messageHeader, sendMessage } from '../sendMessage'


export class Ball extends PIXI.Graphics {
  dx: number
  dy: number


  constructor() {
    super()
    this.beginFill(0xffffff).drawCircle(0, 0, BALL_SIZE)

    this.x = CANVAS_WIDTH / 2
    this.y = CANVAS_HEIGHT / 2

    this.angle = 20;

    [this.dx, this.dy] = [0, 0]

    PIXI.Ticker.shared.add(() => {

      // HITS UP OR DOWN
      if (this.y + this.dy > CANVAS_HEIGHT - BALL_SIZE || this.y + this.dy < BALL_SIZE) {
        this.dy = -this.dy
      }



      // GREEN SIDE INSIDE PLAYER MARGIN
      if (this.x + this.dx > CANVAS_WIDTH - (BALL_SIZE + PLAYER_WIDTH + PLAYER_MARGIN)) {
        if (app.pingPong.greenPlayer.y < this.y && app.pingPong.greenPlayer.y + PLAYER_HEIGHT > this.y) {
          this.dx = -Math.abs(this.dx)

          if (myColor == "green")
            sendMessage({ ...messageHeader, type: 'hit bar', ...this.getPositionAndDirection() })
        }
      }

      // HIT GREEN SIDE
      if (this.x + this.dx > CANVAS_WIDTH - BALL_SIZE) {
        // GREEN LOST")
        if (myColor == "green")
          sendMessage({ ...messageHeader, type: 'hit wall' })
        else
          this.onHitOtherSide()

      }



      // RED SIDE INSIDE PLAYER MARGIN
      if (this.x + this.dx < BALL_SIZE + PLAYER_WIDTH + PLAYER_MARGIN) {
        if (app.pingPong.redPlayer.y < this.y && app.pingPong.redPlayer.y + PLAYER_HEIGHT > this.y) {
          this.dx = Math.abs(this.dx)

          if (myColor == "red")
            sendMessage({ ...messageHeader, type: 'hit bar', ...this.getPositionAndDirection() })
        }
      }

      // HIT RED SIDE
      if (this.x + this.dx < BALL_SIZE) {
        // RED LOST
        if (myColor == "red")
          sendMessage({ ...messageHeader, type: 'hit wall' })
        else
          this.onHitOtherSide()
      }

      this.position.x += this.dx * PIXI.Ticker.shared.deltaTime
      this.position.y += this.dy * PIXI.Ticker.shared.deltaTime
    })

  }

  onHitOtherSide() {
    this.dx = 0
    this.dy = 0
  }

  setPositionAndDirection(x: number, y: number, dx: number, dy: number) {
    this.position.x = x + CANVAS_WIDTH / 2
    this.position.y = y + CANVAS_HEIGHT / 2
    this.dx = dx
    this.dy = dy
  }

  getPositionAndDirection() {
    return { x: this.x, y: this.y, dx: this.dx, dy: this.dy }
  }

  hide() {
    this.alpha = 0
  }
  show() {
    this.alpha = 1
  }
}