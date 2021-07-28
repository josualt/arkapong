import Block from './block.js';

class WhiteBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("white");
        this.scene.createBall(180);
        this.scene.createBall(100)
        this.destroy();
    }
}

export default WhiteBlock;