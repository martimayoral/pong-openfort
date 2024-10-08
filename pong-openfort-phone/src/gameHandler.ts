import { PlayerColor } from "./playerColor"

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

    const scoreSpeed = 1 + 0.5 * (this.score.red + this.score.green)

    console.log(this.ballSpeed * scoreSpeed)
    return {
      x: 0,
      y: 0,
      dx: this.ballSpeed * Math.sin(ballRotation) * scoreSpeed,
      dy: this.ballSpeed * Math.cos(ballRotation) * scoreSpeed
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


  resetAll() {
    this.setScore("green", 0)
    this.setScore("red", 0)

  }
  startGame() {

    this.isPlaying = true
  }
}