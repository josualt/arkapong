import Block from './block.js'

class MagentaBlock extends Block {
  constructor (scene, x, y, block, showEffect = false) {
    super(scene, x, y, block, showEffect)
  }

  touch () {
    this.scene.sound.play('block')
    this.scene.blinkBalls()
    this.destroy()
  }
}

export default MagentaBlock
