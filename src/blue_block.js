import Block from './block.js';

class BlueBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        this.scene.sound.play("shrink");
        
        if (this.affectsPlayerA) {
            this.scene.izquierda.setScale(1, 0.5);
        } else {
            this.scene.derecha.setScale(1, 0.5);
        }

        this.destroy();
    }
}

export default BlueBlock;