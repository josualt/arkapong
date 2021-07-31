import Block from './block.js';

class BrownBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("enlarge");
        console.log("brown", this.scene.izquierda);
        
        this.scene.balls.forEach(ball => ball.setVelocityX(ball.body.velocity.x * 2));
        this.destroy();
    }
}

export default BrownBlock;