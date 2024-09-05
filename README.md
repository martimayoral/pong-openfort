# Front-End Engineer Challenge: Two-Player Pong Game

## Objective
Create a two-player Pong-like game where players interact through separate browser windows, using ⁠ window.opener.postMessage ⁠ for communication.

---
## Folder structure
There are 3 folders in this project
* openfort-opener: This is the project in charge of starting the game.
* pong-openfort: This is the game itself. It comunicates with openfort-opener with `window.opener.postMessage` as requested.
* pong-openfort-phone: This is the pong game and logic designed to use with a touch screen or mouse. This project is uploaded at [martimayo.com/pong/](https://www.martimayo.com/pong/)⁠

## Start project
This project is installed `yarn` and uses `vite` as a building tool.
To start use `yarn install` and then `yarn dev` to start the local development server.
---
## Challenge Requirements
### Game Mechanics
1.⁠ ⁠Implement a basic Pong game with two paddles and a ball.
2.⁠ ⁠Each player controls one paddle using keyboard inputs.
3.⁠ ⁠Implement basic collision detection and ball physics.
4.⁠ ⁠Keep and display the score for each player.

### Communication
1.⁠ ⁠Use ⁠ window.opener.postMessage ⁠ to send game state between two browser windows.
2.⁠ ⁠Implement a system to synchronize game state between players.
3.⁠ ⁠Handle potential latency and ensure smooth gameplay.

### User Interface
1.⁠ ⁠Create a clean, responsive interface for the game.
2.⁠ ⁠Display player scores and game status.
3.⁠ ⁠Implement a start game mechanism and win condition.

### Bonus Features (Optional)
1.⁠ ⁠Make it work using Telegram app and mobile
