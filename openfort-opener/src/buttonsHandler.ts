import { faker } from '@faker-js/faker';
import { gameHandler } from './main';
import { PlayerColor, Players } from './playerHandler';

const gameUrl = import.meta.env.VITE_GAME_URL

const playerButton: { [color in PlayerColor]: HTMLButtonElement } = {
  "red": document.querySelector<HTMLButtonElement>('#button-red')!,
  "green": document.querySelector<HTMLButtonElement>('#button-green')!
}
const resetButton = document.querySelector<HTMLButtonElement>('#button-restart')!

export function setupPlayerButtonListener(players: Players, playerColor: PlayerColor) {
  playerButton[playerColor].addEventListener('click', () => {
    const id = faker.string.uuid()
    players[id] = {
      ready: false,
      playerColor,
      id,
      window: window.open(gameUrl + "/?color=" + playerColor + "&id=" + id, "_blank")
    }
  })
  resetButton.addEventListener('click', () => {
    gameHandler.resetAll()
    gameHandler.startRound()
  })
}

export function dissableButtons() {
  Object.values(playerButton).forEach(b => {
    b.disabled = true
  })
}

export function enableButtons() {
  Object.values(playerButton).forEach(b => {
    b.disabled = false
  })
}

