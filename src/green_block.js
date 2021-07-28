import Block from './block.js';

class GreenBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("green", this.scene.izquierda);
        
        if (this.affectsPlayerA) {
            this.scene.izquierda.setScale(1, 2);
        } else {
            this.scene.derecha.setScale(1, 2);
        }

        this.destroy();
    }
}

export default GreenBlock;