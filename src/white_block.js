import Block from './block.js';

class WhiteBlock extends Block{
    constructor(scene, x, y, block, showEffect = false){
       super(scene, x, y, block, showEffect)
    }

    touch(){
        console.log("white");
        this.scene.sound.play("threeball");
        this.scene.createBall(this.scene.speedBall, this.x, this.y);
        this.scene.createBall(this.scene.speedBall, this.x, this.y)
        this.destroy();
    }
}

export default WhiteBlock;