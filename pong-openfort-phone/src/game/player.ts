import * as PIXI from 'pixi.js'
import { PIXEL_SIZE, PLAYER_HEIGHT, PLAYER_WIDTH } from './app'
import { PlayerColor } from '../playerColor'




export class Player extends PIXI.Container {
  constructor(color: PlayerColor) {
    super()
    const neon = this.addChild(new PIXI.Graphics())
      .beginFill(color == "green" ? 0x00ff00 : 0xff0000)
      .drawRoundedRect(-PIXEL_SIZE / 2, -PIXEL_SIZE / 2, PLAYER_WIDTH + PIXEL_SIZE, PLAYER_HEIGHT + PIXEL_SIZE, PLAYER_HEIGHT)
    neon.alpha = .5
    neon.filters = [new PIXI.BlurFilter(5)]
    this.addChild(new PIXI.Graphics())
      .beginFill(color == "green" ? 0xccffcc : 0xffcccc)
      .lineStyle({ width: 5, color: color == "green" ? 0x00ff00 : 0xff0000 })
      .drawRoundedRect(0, 0, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_HEIGHT)
  }
}