import { Player, PlayerColor } from "./playerHandler"

const gameUrl = import.meta.env.VITE_GAME_URL

export type Message = {
  id: string,
  type: "ERROR: game already started" | "reset all" | "all loaded"
} | {
  id: string,
  color: PlayerColor,
  type: "ready" | "stop" | "hit wall" | "win" | "loaded",
} | {
  id: string,
  color: PlayerColor,
  type: "player position",
  y: number
} | {
  id: string,
  type: "ball" | "start" | "hit bar",
  x: number,
  y: number,
  dx: number,
  dy: number
} | {
  id: string,
  type: "score"
  score: { [score in PlayerColor]: number }
}
export type MessageType = Message["type"]

export function sendMessage(player: Player, message: Message) {
  if (!player || player.window)
    if (player.window) {
      player.window.postMessage(message, gameUrl)
      console.log("sending message", message, "to", player.id)
    }
}
