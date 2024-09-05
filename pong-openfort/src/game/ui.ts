import * as PIXI from 'pixi.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './app'
import { otherColor, PlayerColor } from '../playerColor'

const textStyle: Partial<PIXI.ITextStyle> = {
  fontSize: 100,
  fill: 0xffffff,
  fontFamily: 'Komika Text',
}

export class UI extends PIXI.Container {
  centerText: PIXI.Text
  centerTextNeon: PIXI.Text
  scoreText: { [score in PlayerColor]: PIXI.Text }
  scoreTextNeon: { [score in PlayerColor]: PIXI.Text }
  winText?: PIXI.Text
  winTextNeon?: PIXI.Text

  constructor() {
    super()

    this.centerTextNeon = this.addChild(new PIXI.Text("Waiting for " + otherColor, textStyle))
    this.centerTextNeon.anchor.set(.5)
    this.centerTextNeon.x = CANVAS_WIDTH / 2
    this.centerTextNeon.y = CANVAS_HEIGHT / 6
    this.centerTextNeon.style.stroke = 0xffff00
    this.centerTextNeon.style.strokeThickness = 10
    this.centerTextNeon.filters = [new PIXI.BlurFilter(5)]
    this.centerTextNeon.alpha = 0.7

    this.centerText = this.addChild(new PIXI.Text("Waiting for " + otherColor, textStyle))
    this.centerText.anchor.set(.5)
    this.centerText.x = CANVAS_WIDTH / 2
    this.centerText.y = CANVAS_HEIGHT / 6
    this.centerText.style.stroke = 0x777700
    this.centerText.style.strokeThickness = 5

    this.scoreTextNeon = {
      green: this.addChild(new PIXI.Text("0", textStyle)),
      red: this.addChild(new PIXI.Text("0", textStyle))
    }
    Object.values(this.scoreTextNeon).forEach(
      st => {
        st.anchor.set(.5)
        st.position.y = CANVAS_HEIGHT / 3
        st.filters = [new PIXI.BlurFilter(5)]
        st.alpha = 0.7
      })

    this.scoreText = {
      green: this.addChild(new PIXI.Text("0", textStyle)),
      red: this.addChild(new PIXI.Text("0", textStyle))
    }
    Object.values(this.scoreText).forEach(
      st => {
        st.anchor.set(.5)
        st.position.y = CANVAS_HEIGHT / 3
      })


    this.scoreText.red.x = CANVAS_WIDTH / 3
    this.scoreText.red.style.fill = 0xff8888

    this.scoreTextNeon.red.x = CANVAS_WIDTH / 3
    this.scoreTextNeon.red.style.stroke = 0xff0000
    this.scoreTextNeon.red.style.strokeThickness = 10

    this.scoreText.green.style.fill = 0x88ff88
    this.scoreText.green.x = 2 * CANVAS_WIDTH / 3

    this.scoreTextNeon.green.x = 2 * CANVAS_WIDTH / 3
    this.scoreTextNeon.green.style.stroke = 0x00ff00
    this.scoreTextNeon.green.style.strokeThickness = 10
  }

  startCountdown() {
    this.setText("3")
    setTimeout(() => {
      this.setText("2")
    }, 1000);
    setTimeout(() => {
      this.setText("1")
    }, 2000);
    setTimeout(() => {
      this.setText("")
    }, 3000);
  }

  setScore(score: { [score in PlayerColor]: number }) {
    this.scoreText["green"].text = score["green"]
    this.scoreText["red"].text = score["red"]
    this.scoreTextNeon["green"].text = score["green"]
    this.scoreTextNeon["red"].text = score["red"]
  }

  winMessage(player: PlayerColor) {
    this.winTextNeon = this.addChild(new PIXI.Text(player + " wins", textStyle))
    this.winTextNeon.anchor.set(.5)
    this.winTextNeon.x = CANVAS_WIDTH / 2
    this.winTextNeon.y = CANVAS_HEIGHT / 2
    this.winTextNeon.style.stroke = player == "green" ? 0x00ff00 : 0xff0000
    this.winTextNeon.style.strokeThickness = 10
    this.winTextNeon.filters = [new PIXI.BlurFilter(5)]
    this.winTextNeon.alpha = 0.7

    this.winText = this.addChild(new PIXI.Text(player + " wins", textStyle))
    this.winText.anchor.set(.5)
    this.winText.x = CANVAS_WIDTH / 2
    this.winText.y = CANVAS_HEIGHT / 2
    this.centerText.style.stroke = player == "green" ? 0x00ff00 : 0xff0000
    this.centerText.style.strokeThickness = 5
    
  }
  reset() {
    this.winText?.destroy()
    this.winText = undefined
    this.winTextNeon?.destroy()
    this.winTextNeon = undefined

    this.scoreText.green.text = "0"
    this.scoreText.red.text = "0"
  }
  setText(text: string) {
    this.centerText.text = text
    this.centerTextNeon.text = text
  }
}