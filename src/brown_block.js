import Block from './block.js';

class BrownBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("brown", this.scene.izquierda);
        
        this.scene.balls.forEach(ball => ball.setVelocityX(ball.body.velocity.x * 2));
        this.destroy();
    }
}

export default BrownBlock;