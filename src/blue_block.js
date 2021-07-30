import Block from './block.js';

class BlueBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        this.scene.sound.play("shrink");
        console.log("booOOOoom", this.scene.izquierda);
        
        if (this.affectsPlayerA) {
            this.scene.izquierda.setScale(1, 0.5);
        } else {
            this.scene.derecha.setScale(1, 0.5);
        }

        this.destroy();
    }
}

export default BlueBlock;