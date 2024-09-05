import { myColor, myId, PlayerColor } from "./playerColor"

const openerUrl = import.meta.env.VITE_OPENER_URL

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

export const messageHeader = {
  id: myId,
  color: myColor
}

export function sendMessage(message: Message) {
  window.opener.postMessage(message, openerUrl)
}

