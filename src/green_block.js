import Block from './block.js'

class GreenBlock extends Block {
  constructor (scene, x, y, block, showEffect = false) {
    super(scene, x, y, block, showEffect)
  }

  touch () {
    this.scene.sound.play('enlarge')
    if (this.affectsPlayerA) {
      this.scene.izquierda.setScale(1, 2)
    } else {
      this.scene.derecha.setScale(1, 2)
    }

    this.destroy()
  }
}

export default GreenBlock
