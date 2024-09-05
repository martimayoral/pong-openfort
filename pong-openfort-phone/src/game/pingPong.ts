import * as PIXI from 'pixi.js'
import { app } from '../main'
import { myColor, PlayerColor } from '../playerColor'
import { CANVAS_HEIGHT, CANVAS_WIDTH, KEY_CODE_DOWN, KEY_CODE_UP, PIXEL_SIZE, PLAYER_HEIGHT, PLAYER_MARGIN, PLAYER_WIDTH } from './app'
import { Ball } from './ball'
import { Player } from './player'


export class PingPong extends PIXI.Container {
  background: PIXI.Graphics
  greenPlayer: Player
  redPlayer: Player
  ball: Ball

  constructor() {
    super()
    this.background = this.addChild(new PIXI.Graphics().beginFill(0x212121)
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    )
    this.redPlayer = this.addChild(new Player("red"))
    this.redPlayer.x = PLAYER_MARGIN

    this.greenPlayer = this.addChild(new Player("green"))
    this.greenPlayer.x = CANVAS_WIDTH - PLAYER_WIDTH - PLAYER_MARGIN

    this.ball = this.addChild(new Ball())

    

    onkeydown = k => {
      console.log("'" + k.key + "'")
      if (k.key == KEY_CODE_UP) {
        this.movePlayer(myColor, -PIXEL_SIZE)
      }
      if (k.key == KEY_CODE_DOWN) {
        this.movePlayer(myColor, PIXEL_SIZE)
      }
      if (k.key == ' ' && app.waitingForReady) {
        app.ui.setText("Waiting others")
        app.waitingForReady = false
      }
    }
  }

  movePlayer(player: PlayerColor, offset: number) {
    const playerToMove = player == "green" ? this.greenPlayer : this.redPlayer
    const y = Math.max(0, Math.min(playerToMove.y + offset, CANVAS_HEIGHT - PLAYER_HEIGHT))
    // ease.add(playerToMove, { y }, { duration: 100 })
    playerToMove.y = y
  }


}
