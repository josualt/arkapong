import Block from './block.js';

class RedBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("booOOOoom", this.scene.izquierda);
        this.scene.izquierda.setScale(1, 2);
        this.destroy();
    }
}

export default RedBlock;