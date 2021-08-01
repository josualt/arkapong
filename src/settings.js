import settingsOptions from './settings_options'

class Settings extends Phaser.Scene {
  constructor () {
    super({ key: 'settings' })
  }

  preload () {

  }

  create () {
    this.width = this.sys.game.config.width
    this.height = this.sys.game.config.height
    this.center_width = this.width / 2
    const center_height = this.height / 2
    const speedBall = this.registry.get('ballSpeed')
    const paddleSpeed = this.registry.get('paddleSpeed')
    const winScore = this.registry.get('winScore')
    this.add.bitmapText(this.center_width, 50, 'squareFont', 'ARKAPONG', 60).setOrigin(0.5)
    this.add.bitmapText(this.center_width, 110, 'squareFont', 'SETTINGS', 40).setOrigin(0.5)
    this.options = []
    this.rectangles = []
    this.currentSetting = 0
    this.currentOption = this.registry.get('ballSpeed')

    this.selected = [this.registry.get('ballSpeed'), this.registry.get('paddleSpeed'), this.registry.get('winScore')]

    this.settings = []
    const layer = this.add.layer()
    for (let i = 0; i < settingsOptions.length; i++) {
      this.settings.push(this.add.bitmapText(this.center_width, 150 + (i * 100), 'squareFont', settingsOptions[i].name, 35).setOrigin(0.5))
      this.options[i] = []
      for (let j = 0; j < settingsOptions[i].options.length; j++) {
        const color = this.selected[i] === j ? 0x000000 : 0xffffff
        this.options[i].push(this.add.bitmapText(this.center_width - 250 + (j * 60), 200 + (i * 100), 'squareFont', settingsOptions[i].options[j], 30).setOrigin(0.5).setTint(color))
      }
      const rectangle = new Phaser.GameObjects.Rectangle(this, this.center_width - 250 + (this.selected[i] * 60), 200 + (i * 100), 52, 52, 0xffffff).setOrigin(0.5)
      this.rectangles.push(rectangle)
      layer.add(this.rectangles[i])
    }

    this.rectangle = new Phaser.GameObjects.Rectangle(this, this.center_width, 150, this.width, 40, 0xffffff).setOrigin(0.5)
    layer.add(this.rectangle)
    this.settings[0].tint = 0x000000

    this.add.image(this.center_width - 300, 150 + (3 * 100), 'pressEnter').setScale(0.5)
    this.add.bitmapText(this.center_width - 200, 150 + (3 * 100), 'squareFont', 'SAVE', 30).setOrigin(0.5)
    this.add.image(this.center_width + 200, 150 + (3 * 100), 'pressEsc').setScale(0.5)
    this.add.bitmapText(this.center_width + 300, 150 + (3 * 100), 'squareFont', 'CANCEL', 30).setOrigin(0.5)
    this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.input.keyboard.on('keydown-UP', this.menuUp, this)
    this.input.keyboard.on('keydown-DOWN', this.menuDown, this)
    this.input.keyboard.on('keydown-RIGHT', this.menuRight, this)
    this.input.keyboard.on('keydown-LEFT', this.menuLeft, this)
    this.input.keyboard.on('keydown-W', this.menuUp, this)
    this.input.keyboard.on('keydown-S', this.menuDown, this)
    this.input.keyboard.on('keydown-D', this.menuRight, this)
    this.input.keyboard.on('keydown-A', this.menuLeft, this)
    this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
  }

  update () {
    if (this.ESC.isDown) {
      this.sound.play('escape')
      this.scene.start('menu')
    }

    if (this.ENTER.isDown) {
      this.sound.play('paddle')
      this.registry.set('ballSpeed', this.selected[0])
      this.registry.set('paddleSpeed', this.selected[1])
      this.registry.set('winScore', this.selected[2])
      this.scene.start('menu')
    }
  }

  menuLeft () {
    this.options[this.currentSetting][this.currentOption].tint = 0xffffff
    if (this.currentOption === 0) {
      this.currentOption = this.options[this.currentSetting].length - 1
    } else {
      this.currentOption--
    }
    this.selected[this.currentSetting] = this.currentOption
    this.options[this.currentSetting][this.currentOption].tint = 0x000000
    this.rectangles[this.currentSetting].x = this.center_width - 250 + (this.currentOption * 60)
    this.sound.play('menu')
  }

  menuRight () {
    this.options[this.currentSetting][this.currentOption].tint = 0xffffff
    if (this.currentOption === this.options[this.currentSetting].length - 1) {
      this.currentOption = 0
    } else {
      this.currentOption++
    }
    this.selected[this.currentSetting] = this.currentOption
    this.options[this.currentSetting][this.currentOption].tint = 0x000000
    this.rectangles[this.currentSetting].x = this.center_width - 250 + (this.currentOption * 60)
    this.sound.play('menu')
  }

  menuUp () {
    this.settings[this.currentSetting].tint = 0xffffff
    if (this.currentSetting === 0) {
      this.currentSetting = this.options.length - 1
    } else {
      this.currentSetting--
    }
    this.settings[this.currentSetting].tint = 0x000000
    this.rectangle.y = 150 + (this.currentSetting * 100)
    this.currentOption = this.selected[this.currentSetting]

    this.sound.play('menu')
  }

  menuDown () {
    this.settings[this.currentSetting].tint = 0xffffff
    if (this.currentSetting === this.options.length - 1) {
      this.currentSetting = 0
    } else {
      this.currentSetting++
    }
    this.settings[this.currentSetting].tint = 0x000000
    this.rectangle.y = 150 + (this.currentSetting * 100)
    this.currentOption = this.selected[this.currentSetting]

    this.sound.play('menu')
  }
}

export default Settings
