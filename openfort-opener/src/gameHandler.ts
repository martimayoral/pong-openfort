import { dissableButtons } from "./buttonsHandler"
import { playerHandler } from "./main"
import { PlayerColor } from "./playerHandler"
import { sendMessage } from "./sendMessage"

const scoreElements: { [color in PlayerColor]: HTMLSpanElement } = {
  "red": document.querySelector<HTMLButtonElement>('#score-red')!,
  "green": document.querySelector<HTMLButtonElement>('#score-green')!
}

export class GameHandler {
  score: { [score in PlayerColor]: number } = { green: 0, red: 0 }

  isPlaying = false
  ballSpeed = 5

  getNewBallStartPositionAndDirection(throwTo: PlayerColor | "random" = "random") {
    // get one quarter
    let ballRotation = (Math.random() * Math.PI / 2) + (Math.PI / 4)


    // shoot to one player or the other (50%)
    ballRotation += (throwTo == "random" && Math.random() < 0.5) || throwTo == "red" ? Math.PI : 0


    return {
      x: 0,
      y: 0,
      dx: this.ballSpeed * Math.sin(ballRotation),
      dy: this.ballSpeed * Math.cos(ballRotation)
    }
  }

  addScore(player: PlayerColor) {
    scoreElements[player].textContent = ++this.score[player] + ""
    return this.score[player]
  }

  setScore(player: PlayerColor, score: number) {
    this.score[player] = score
    scoreElements[player].textContent = score + ""
  }

  startRound(throwTo: PlayerColor | "random" = "random") {

    const newBallPositionAndDirection = this.getNewBallStartPositionAndDirection(throwTo)
    playerHandler.allPlayers.forEach(p => {
      sendMessage(p, { id: "host", type: "start", ...newBallPositionAndDirection })
      sendMessage(p, { id: "host", type: "score", score: this.score })
    })
  }

  resetAll() {
    this.setScore("green", 0)
    this.setScore("red", 0)

    playerHandler.allPlayers.forEach(p => {
      sendMessage(p, { id: "host", type: "reset all" })
    })
  }
  startGame() {

    this.startRound()
    dissableButtons()
    this.isPlaying = true
  }
}