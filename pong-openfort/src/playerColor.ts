export type PlayerColor = "red" | "green"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

export const myColor = urlParams.get("color") as PlayerColor
export const otherColor = myColor == "green" ? "red" : "green"
export const myId = urlParams.get("id") || ""
