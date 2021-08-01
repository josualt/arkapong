import Block from './block.js'

class CyanBlock extends Block {
  constructor (scene, x, y, block, showEffect = false) {
    super(scene, x, y, block, showEffect)
  }

  touch () {
    this.scene.sound.play('block')

    if (this.affectsPlayerA) {
      this.scene.izquierda.blink()
    } else {
      this.scene.derecha.blink()
    }

    this.destroy()
  }
}

export default CyanBlock
