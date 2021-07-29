import Block from './block.js';

class YellowBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("yellow");
        this.scene.balls.forEach(ball => ball.setScale(0.5, 0.5));
        this.destroy();
    }
}

export default YellowBlock;