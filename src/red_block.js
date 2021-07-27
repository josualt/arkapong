import Block from './block.js';

class RedBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("red", this.scene.ball);
        this.scene.ball.setScale(2, 2);
        this.destroy();
    }
}

export default RedBlock;