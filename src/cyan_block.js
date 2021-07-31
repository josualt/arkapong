import Block from './block.js';

class CyanBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("block");
        console.log("cyan");
        this.destroy();
    }
}

export default CyanBlock;