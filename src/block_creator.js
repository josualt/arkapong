import WhiteBlock from './white_block';
import blockTypes from './block_types';
import GreenBlock from './red_block';
import BlueBlock from './blue_block';
import RedBlock from './green_block';
import OrangeBlock from './orange_block';
import PinkBlock from './pink_block';
import YellowBlock from './yellow_block';
import BrownBlock from './brown_block';
import GreyBlock from './grey_block';
import CyanBlock from './cyan_block';
import MagentaBlock from './magenta_block';
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
            case "yellow":
                this.blocks.push(new YellowBlock(this.scene, x, y, blockType.color));
                break;
            case "brown":
                this.blocks.push(new BrownBlock(this.scene, x, y, blockType.color));
                break;
            case "grey":
                this.blocks.push(new GreyBlock(this.scene, x, y, blockType.color));
                break;
            case "cyan":
                this.blocks.push(new CyanBlock(this.scene, x, y, blockType.color));
                break;
            case "magenta":
                this.blocks.push(new MagentaBlock(this.scene, x, y, blockType.color));
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

    wall() {
        this.width = this.scene.sys.game.config.width;
        this.height = this.scene.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        console.log(this.width, this.height, Math.round(this.height))
        const positions = Array(Math.round(this.width / 16)).fill([]);
        positions.forEach((position,i) => { positions[i] = Array(Math.round(this.height / 32)).fill([0,0])})
        positions.forEach((col, i) => {
            positions[i].forEach((row, j) => {
                positions[i][j] = [(i * 17) + 1, (j * 33) ];
                // new GreenBlock(this.scene, (i * 17), (j * 33), 0x00ff00);
            });
        });
        const shuffled = positions.flat().sort((a,b) => 0.5 - Math.random());

        shuffled.forEach((position, index) => {
            const [i, j] = position;
            setTimeout(() => new GreenBlock(this.scene, i, j, 0x00ff00), index * 10);
        });
    }

}

export default BlockCreator;
