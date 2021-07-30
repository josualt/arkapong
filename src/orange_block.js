import Block from './block.js';

class OrangeBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        this.scene.sound.play("block");
        console.log("Orange", this.scene.izquierda);
        this.destroy();
    }
}

export default OrangeBlock;