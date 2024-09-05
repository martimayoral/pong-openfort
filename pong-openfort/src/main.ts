import * as PIXI from 'pixi.js'
import './playerColor.ts'

import { GameApp } from './game/app.ts'
import { Message } from './sendMessage.ts'
import './style.css'

const openerUrl = import.meta.env.VITE_OPENER_URL

function onRecieveMessage(message: Message) {
  console.log("recieved message", message)

  switch (message.type) {
    case "ERROR: game already started":
      app.ui.setText("Game already started...")
      break
    case 'start':
      app.startGame()
      app.pingPong.ball.setPositionAndDirection(
        message.x,
        message.y,
        message.dx,
        message.dy
      )
      break
    case "all loaded":
      app.waitingForReady = true
      app.ui.setText("Press space to start")
      break
    case 'player position':
      switch (message.color) {
        case "green":
          app.pingPong.greenPlayer.y = message.y
          break
        case "red":
          app.pingPong.redPlayer.y = message.y
          break
      }
      break
    case "ball":
      app.pingPong.ball.setPositionAndDirection(
        message.x,
        message.y,
        message.dx,
        message.dy
      )
      break
    case "score":
      app.ui.setScore(message.score)
      break
    case "win":
      PIXI.Ticker.shared.stop()
      app.pingPong.ball.hide()
      app.ui.winMessage(message.color)
      break
    case "reset all":
      app.pingPong.ball.show()
      app.ui.reset()
  }

}

window.addEventListener("message", (m) => {
  if (m.origin == openerUrl) {
    onRecieveMessage(m.data)
  }
})

export const app = new GameApp()


