import Block from './block.js'

class RedBlock extends Block {
  constructor (scene, x, y, block, showEffect = false) {
    super(scene, x, y, block, showEffect)
  }

  touch () {
    this.scene.sound.play('enlarge')
    this.scene.balls.forEach(ball => ball.setScale(2, 2))
    this.destroy()
  }
}

export default RedBlock
