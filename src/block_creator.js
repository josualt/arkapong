import WhiteBlock from './white_block';
import blockTypes from './block_types';
import GreenBlock from './white_block';
import BlueBlock from './white_block';
import RedBlock from './white_block';

class BlockCreator{

    constructor(scene){
        this.scene = scene;
        this.blocks = [];
    }



    generate(){
        console.log("i am here!!!")
        this.generator = setInterval(() => this.spawn(), 5000 + Phaser.Math.Between(1000, 5000));
    }

    spawn(){
        console.log("new block");
        const blockType = blockTypes[Phaser.Math.Between(0, 3)];
        const x = Phaser.Math.Between(250, 450)
        const y = Phaser.Math.Between(0, 390)

        switch (blockType.name){
            case "white":
                this.blocks.push(new WhiteBlock(this.scene, x, y, blockType.color));
                break;
            case "green":
                this.blocks.push(new GreenBlock(this.scene, x, y, blockType.color));
                break;
            case "blue":
                this.blocks.push(new BlueBlock(this.scene, x, y, blockType.color));
                break;
            case "red":
                this.blocks.push(new RedBlock(this.scene, x, y, blockType.color));
                break;
        }
    }
    stop(){
        clearInterval(this.generator);
    }
}

export default BlockCreator;