import WhiteBlock from './white_block';
import blockTypes from './block_types';
import GreenBlock from './red_block';
import BlueBlock from './blue_block';
import RedBlock from './green_block';
import OrangeBlock from './orange_block';
import PinkBlock from './pink_block';

class BlockCreator{

    constructor(scene){
        this.scene = scene;
        this.blocks = [];
    }

    generate(){
        this.reset();
        console.log("Block generator!!!")
        this.generator = setInterval(() => this.spawn(), 1 + Phaser.Math.Between(1000, 5000));
    }

    spawn(){
        console.log("new block");
        const blockType = blockTypes[Phaser.Math.Between(0, blockTypes.length -1)];
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
                break
            case "orange":
                this.blocks.push(new OrangeBlock(this.scene, x, y, blockType.color));
                break;
            case "pink":
                this.blocks.push(new PinkBlock(this.scene, x, y, blockType.color));
                break;
        }
    }

    stop(){
        clearInterval(this.generator);
    }

    reset() {
        this.blocks.forEach(block => {block.destroy();});
        this.blocks = [];
    } 
}

export default BlockCreator;