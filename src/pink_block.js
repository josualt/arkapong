import Block from './block.js';

class PinkBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("block");
        console.log("pink", this.scene.izquierda);
    }
}

export default PinkBlock;