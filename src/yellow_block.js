import Block from './block.js'

class YellowBlock extends Block {
  constructor (scene, x, y, block, showEffect = false) {
    super(scene, x, y, block, showEffect)
  }

  touch () {
    this.scene.sound.play('shrink')
    this.scene.balls.forEach(ball => ball.setScale(0.5, 0.5))
    this.destroy()
  }
}

export default YellowBlock
