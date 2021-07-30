import Block from './block.js';

class GreyBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        this.scene.sound.play("block");
        console.log("grey");
        if (this.affectsPlayerA) {
            this.scene.izquierda.freeze();
        } else {
            this.scene.derecha.freeze();
        }
        this.destroy();
    }
}

export default GreyBlock;