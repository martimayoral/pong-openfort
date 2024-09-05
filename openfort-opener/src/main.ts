import { setupPlayerButtonListener } from './buttonsHandler.ts'
import { GameHandler } from './gameHandler.ts'
import { PlayerHandler } from './playerHandler.ts'
import { Message, sendMessage } from './sendMessage.ts'
const gameUrl = import.meta.env.VITE_GAME_URL

const WIN_CONDITION = 10

export const gameHandler = new GameHandler()
export const playerHandler = new PlayerHandler()

setupPlayerButtonListener(playerHandler.players, "red")
setupPlayerButtonListener(playerHandler.players, "green")

function onRecieveMessage(message: Message) {
  console.log("recieved message", message)

  switch (message.type) {
    case "loaded":
      if (gameHandler.isPlaying) {
        sendMessage(playerHandler.players[message.id], { type: 'ERROR: game already started', id: "host" })
        if (playerHandler.players[message.id].ready) {
          playerHandler.removePlayer(message.id)
        }
        return
      }

      if (playerHandler.redPlayers.length > 0 && playerHandler.greenPlayers.length > 0) {

        playerHandler.allPlayers.forEach(p => {
          sendMessage(p, { id: "host", type: "all loaded" })
        })
      }

      break
    case 'ready':
      if (!gameHandler.isPlaying) {
        playerHandler.players[message.id].ready = true
        if (playerHandler.areAllPlayersReady())
          gameHandler.startGame()

      }
      break
    case 'player position':
      playerHandler.allPlayers.filter(p => p.id != message.id).forEach(p => sendMessage(p, message))
      break
    case "hit wall":
      const otherColor = message.color == "green" ? "red" : "green"

      // add score
      const playerScore = gameHandler.addScore(otherColor)

      // other player wins
      if (playerScore >= WIN_CONDITION) {
        playerHandler.allPlayers.forEach(p => {
          sendMessage(p, { id: "host", type: "score", score: gameHandler.score })
          sendMessage(p, { id: "host", type: "win", color: otherColor })
        })
        return
      }

      // start
      gameHandler.startRound(otherColor)
  }
}

// on recieve message
window.addEventListener("message", (m) => {
  if (m.origin == gameUrl) {
    onRecieveMessage(m.data)
  }
})