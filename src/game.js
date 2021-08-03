import Palas from './palas.js'
import BlockCreator from './block_creator'
import settingsOptions from './settings_options'

class Game extends Phaser.Scene {
  constructor (key) {
    super({ key })
  }

  preload () {
  }

  create () {
    this.setGameSettings()

    this.pointsA = 0
    this.pointsB = 0
    this.width = this.sys.game.config.width
    this.height = this.sys.game.config.height
    this.center_width = this.width / 2
    this.center_height = this.height / 2
    this.pointsAText = this.add.bitmapText(this.center_width / 2, 20, 'squareFont', this.pointsA, 36)
    this.pointsBText = this.add.bitmapText(this.center_width + (this.center_width / 2), 20, 'squareFont', this.pointsB, 36)
    this.resultMessage = this.add.bitmapText(this.center_width, this.center_height, 'squareFont', '', 46).setOrigin(0.5)
    this.continueMessage = this.add.bitmapText(this.center_width, this.center_height + 50, 'squareFont', '', 30).setOrigin(0.5)

    // separador
    this.add.tileSprite(this.center_width, this.center_height, 1, this.height, 'separador')
    this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    this.izquierda = new Palas(this, 30, this.center_height, 'izquierda')

    this.derecha = new Palas(this, this.sys.game.config.width - 30, this.center_height, 'derecha')
    this.physics.world.setBoundsCollision(false, false, true, true)
    // bola
    this.balls = []
    // fisicas
    this.blockCreator = new BlockCreator(this)

    this.restartGame()

    // Controles
    // pala derecha
    this.cursor = this.input.keyboard.createCursorKeys()

    this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.input.keyboard.on('keydown-ESC', this.escape, this)
  }

  escape () {
    this.blockCreator.stop()
    this.sound.play('escape')
    this.scene.start('menu')
  }

  update () {
    if (this.pointsA === this.points || this.pointsB === this.points) {
      this.blockCreator.stop()
      this.showResult()
      if (this.ENTER.isDown) {
        this.restartGame()
      }
    } else {
      for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].x < 0) {
          this.balls[i].destroy()
          this.balls[i] = null
          this.sound.play('lose')
          this.incrementB()
        } else if (this.balls[i].x > this.width) {
          this.balls[i].destroy()
          this.balls[i] = null
          this.sound.play('lose')
          this.incrementA()
        }
      }
      this.balls = this.balls.filter(ball => ball !== null)
      if (this.balls.length === 0) this.restart()

      // control de las palas
      // pala derecha
      if (!this.derecha.isFrozen) {
        if (this.cursor.down.isDown) {
          this.derecha.body.y += this.paddleSpeed
        }

        if (this.cursor.up.isDown) {
          this.derecha.body.y -= this.paddleSpeed
        }

        if (this.cursor.right.isDown && this.derecha.body.x <= this.width - 10) {
          this.derecha.body.x += this.paddleSpeed
        }

        if (this.cursor.left.isDown && this.derecha.body.x >= this.center_width + (this.center_width / 2) - 10) {
          this.derecha.body.setVelocityX(-this.paddleSpeed * 70)
        }

        if (this.cursor.left.isUp || this.derecha.body.x < this.center_width + (this.center_width / 2) - 10) {
          this.derecha.body.setVelocityX(0)
        }
      }

      this.playerBMoves()
    }
  }

  playerBMoves () {

  }

  setGameSettings () {
    this.ballSpeed = settingsOptions[0].options[this.registry.get('ballSpeed', 2)]
    this.paddleSpeed = settingsOptions[1].options[this.registry.get('paddleSpeed', 3)]
    this.points = settingsOptions[2].options[this.registry.get('winScore', 2)]
  }

  chocaPala (ball, paddle) {
    if (paddle.body.velocity.x !== 0) {
      paddle.x += paddle.body.velocity.x > 0 ? -10 : 10
    }

    const hitPoint = paddle.y - ball.y

    this.sound.play('paddle')
    if (hitPoint < 2 && hitPoint > -2) {
      ball.setVelocityY(0)
    } else {
      ball.setVelocityY(-hitPoint * 5)
    }
  }

  restart () {
    this.blockCreator.reset()
    this.izquierda.reset()
    this.derecha.reset()
    clearInterval(this.ballIntervalId)
    if (this.pointsA < this.points && this.pointsB < this.points) {
      this.createBall()
      this.sound.play('start')
    }
  }

  incrementA () {
    this.pointsA++
    this.startDirection = 1
    this.pointsAText.setText(this.pointsA)
  }

  incrementB () {
    this.pointsB++
    this.startDirection = -1
    this.pointsBText.setText(this.pointsB)
  }

  showResult () {
    const message = this.pointsA > this.pointsB ? 'PLAYER A WINS' : 'PLAYER B WINS'
    this.resultMessage.setText(message)
    this.continueMessage.setText('press ENTER to play again ESC to quit')
  }

  createBall (velocityX, x, y) {
    x = x || this.center_width
    y = y || this.center_height
    const ball = this.physics.add.sprite(x, y, 'ball')
    ball.setVelocityX(velocityX || this.ballSpeed * this.startDirection)
    ball.setVelocityY(Phaser.Math.Between(-150, 150))
    ball.setCollideWorldBounds(true)
    ball.setBounce(1)
    ball.body.onWorldBounds = true
    this.physics.world.on('worldbounds', () => {
      this.sound.play('wall')
    }, this)

    this.physics.add.collider(ball, this.izquierda, this.chocaPala, null, this)
    this.physics.add.collider(ball, this.derecha, this.chocaPala, null, this)
    this.blockCreator.setColliders(ball)
    this.balls.push(ball)
  }

  restartGame () {
    this.blockCreator.generate(true)
    this.startDirection = (Math.random() > 0.5) ? -1 : 1
    this.balls = []
    this.createBall()

    this.resultMessage.setText('')
    this.continueMessage.setText('')
    this.pointsA = 0
    this.pointsB = 0
    this.pointsAText.setText(this.pointsA)
    this.pointsBText.setText(this.pointsB)
  }

  showPaddleEffect (block) {
    if (this.paddleEffectId) clearTimeout(this.paddleEffectId)
    if (this.effectMessage) this.effectMessage.destroy()
    this.effectMessage = this.add.bitmapText(this.center_width, 10, 'squareFont', block.description, 15).setOrigin(0.5)
    this.paddleEffectId = setTimeout(() => this.effectMessage.destroy(), 2000)
  }

  blinkBalls () {
    if (this.ballIntervalId) clearInterval(this.ballIntervalId)
    this.ballIntervalId = setInterval(() => this.balls.forEach(ball => {
      ball.setVisible(!ball.visible)
    }), 300)
  }
}

export default Game
