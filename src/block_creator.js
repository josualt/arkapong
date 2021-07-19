import Block from './block';

class BlockCreator{

    constructor(scene){
        this.scene = scene;
    }

    generate(){
        console.log("i am here!!!")
        this.generator = setInterval(() => this.spawn(), 5000 + Phaser.Math.Between(1000, 5000));
    }

    spawn(){
        console.log("new block");
        const x = Phaser.Math.Between(250, 450)
        const y = Phaser.Math.Between(0, 390)
        const block = new Block(this.scene, x, y, 0x6666ff);
    }
    stop(){
        clearInterval(this.generator);
    }
}

export default BlockCreator;