import Game from './game'
import Palas from './palas.js'
import BlockCreator from './block_creator'
import settingsOptions from './settings_options'

class MultiPlayerGame extends Game {
  constructor () {
    super('multi_player_game')
  }

  create () {
    super.create()
    // pala izquierda
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.cursor_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.cursor_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  }

  update () {
    super.update()
  }

  playerBMoves () {
    // Pala izquierda
    if (!this.izquierda.isFrozen) {
      if (this.cursor_S.isDown) {
        this.izquierda.body.y += this.paddleSpeed
      }

      if (this.cursor_W.isDown) {
        this.izquierda.body.y -= this.paddleSpeed
      }

      if (this.cursor_D.isDown && this.izquierda.body.x < this.center_width / 2) {
        this.izquierda.body.setVelocityX(this.paddleSpeed * 70)
      }

      if (this.cursor_D.isUp || this.izquierda.body.x >= this.center_width / 2) {
        this.izquierda.body.setVelocityX(0)
      }

      if (this.cursor_A.isDown && this.izquierda.body.x > 0) {
        this.izquierda.body.x -= this.paddleSpeed
      }
    }
  }
}

export default MultiPlayerGame
