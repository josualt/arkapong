class Palas extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, type) {
    super(scene, x, y, type)
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.body.immovable = true
    this.body.setCollideWorldBounds(true)
    this.isFrozen = false
  }

  reset () {
    this.stop()
    this.setScale(1, 1)
    this.setVisible(true)
    this.isFrozen = false
    clearInterval(this.blinkIntervalId)
    clearInterval(this.clearId)
  }

  stop () {
    this.body.setVelocityX(0)
    this.body.setVelocityY(0)
  }

  freeze () {
    this.isFrozen = true
    this.clearId = setTimeout(() => { this.isFrozen = false }, Phaser.Math.Between(1000, 3000))
  }

  blink () {
    if (this.blinkIntervalId) clearInterval(this.blinkIntervalId)
    this.blinkIntervalId = setInterval(() => { this.setVisible(!this.visible) }, 300)
  }
}

export default Palas
