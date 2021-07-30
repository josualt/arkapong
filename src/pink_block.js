import Block from './block.js';

class PinkBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        this.scene.sound.play("block");
        console.log("pink", this.scene.izquierda);
    }
}

export default PinkBlock;