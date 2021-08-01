class Help extends Phaser.Scene {
  constructor () {
    super({ key: 'help' })
  }

  preload () {
  }

  create () {
    const helpText = 'bla bla bla bla'

    this.width = this.sys.game.config.width
    this.height = this.sys.game.config.height
    this.center_width = this.width / 2
    this.add.bitmapText(this.center_width, 50, 'squareFont', 'ARKAPONG', 60).setOrigin(0.5)
    this.add.bitmapText(this.center_width, 110, 'squareFont', 'Help', 40).setOrigin(0.5)
    this.add.bitmapText(this.center_width, 150, 'squareFont', 'information', 36).setOrigin(0.5)
    this.add.bitmapText(this.center_width, 180, 'squareFont', helpText, 16).setOrigin(0.5)
    this.add.bitmapText(this.center_width, 350, 'squareFont', 'controls', 36).setOrigin(0.5)

    this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    this.add.image(700, 440, 'helpB').setScale(0.5)
    this.add.image(95, 440, 'helpA').setScale(0.5)
    this.add.image(300, 450, 'pressEnter').setScale(0.5)
    this.add.image(500, 450, 'pressEsc').setScale(0.5)
  }

  update () {
    if (this.ESC.isDown) {
      this.scene.start('menu')
    }
  }
}

export default Help
