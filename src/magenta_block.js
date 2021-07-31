import Block from './block.js';

class MagentaBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("block");
        console.log("magenta");
        this.destroy();
    }
}

export default MagentaBlock;