import Block from './block.js';

class CyanBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        this.scene.sound.play("block");
        console.log("cyan");
        this.destroy();
    }
}

export default CyanBlock;