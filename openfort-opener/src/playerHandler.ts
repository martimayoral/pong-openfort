export type PlayerId = "red" | "green" | "host"
export type PlayerColor = "red" | "green"
export type Player = {
  id: string,
  playerColor: PlayerColor
  window: WindowProxy | null,
  ready: boolean
}

export type Players = { [id: string]: Player }

export const playerHasWindowOpen = (p: Player | null) => !!p && !!p.window && !p.window.closed

export class PlayerHandler {
  players: Players = {}


  public get greenPlayers(): Player[] {
    return Object.values(this.players).filter(p => playerHasWindowOpen(p) && p.playerColor == "green")
  }
  public get redPlayers(): Player[] {
    return Object.values(this.players).filter(p => playerHasWindowOpen(p) && p.playerColor == "red")
  }
  public get allPlayers(): Player[] {
    return Object.values(this.players).filter(p => playerHasWindowOpen(p))
  }

  areAllPlayersReady() {
    return this.allPlayers.filter(p => p.ready != true).length == 0
  }


  cleanPlayers() {
    this.players = Object.fromEntries(Object.entries(this.players).filter(p => playerHasWindowOpen(p[1])))
  }

  removePlayer(id: string) {
    this.players = Object.fromEntries(Object.entries(this.players).filter(p => p[0] != id))
  }
}