import Block from './block.js';

class OrangeBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("block");
        this.destroy();
    }
}

export default OrangeBlock;