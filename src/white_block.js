import Block from './block.js';

class WhiteBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("white", this.scene.izquierda);
        this.scene.izquierda.setScale(1, 2);
        this.destroy();
    }
}

export default WhiteBlock;