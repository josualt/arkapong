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

class BlockCreator {

    constructor(scene){
        this.scene = scene;
        this.blocks = [];
        this.width = this.scene.sys.game.config.width;
        this.height = this.scene.sys.game.config.height;
        this.center_width = this.width/2;
    }

    generate(showEffect = false){
        this.reset();
        console.log("Block generator!!!")
        this.generator = setInterval(() => this.spawn(showEffect), 1 + Phaser.Math.Between(1000, 5000));
    }

    spawn(showEffect){
        console.log("new block");
        const blockType = blockTypes[Phaser.Math.Between(0, blockTypes.length -1)];
        const [x, y] = this.positions[this.current];

       this.blocks.push(this.generateBlock(blockType, x, y, showEffect));
       this.current++;
    }

    generateBlock(blockType, x, y, showEffect = false) {
        switch (blockType.name){
            case "white":
                return new WhiteBlock(this.scene, x, y, blockType, showEffect);

            case "green":
                return new GreenBlock(this.scene, x, y, blockType, showEffect);

            case "blue":
                return new BlueBlock(this.scene, x, y, blockType, showEffect);

            case "red":
                return new RedBlock(this.scene, x, y, blockType, showEffect);

            case "orange":
                return new OrangeBlock(this.scene, x, y, blockType, showEffect);

            case "pink":
                return new PinkBlock(this.scene, x, y, blockType, showEffect);

            case "yellow":
                return new YellowBlock(this.scene, x, y, blockType, showEffect);

            case "brown":
                return new BrownBlock(this.scene, x, y, blockType, showEffect);

            case "grey":
                return new GreyBlock(this.scene, x, y, blockType, showEffect);

            case "cyan":
                return new CyanBlock(this.scene, x, y, blockType, showEffect);

            case "magenta":
                return new MagentaBlock(this.scene, x, y, blockType, showEffect);

        }
    }

    stop(){
        clearInterval(this.generator);
    }

    setColliders (ball) {
        this.blocks.forEach(block => {
            this.scene.physics.add.collider(ball, block, () => block.touch(), null, this.scene);
        });
    }

    reset() {
        this.current = 0;
        this.positions = this.generatePositions(this.width / 3, this.height, (this.width / 3) - 16);
        this.blocks.forEach(block => {block.destroy();});
        this.blocks = [];
    }

    wall() {
        console.log(this.width, this.height, Math.round(this.height))
        const positions = this.generatePositions(this.width, this.height);
        positions.forEach((position, index) => {
            const [i, j] = position;
            let blockType = blockTypes[Phaser.Math.Between(0, blockTypes.length -1)];
            setTimeout(() => this.generateBlock(blockType, i , j), index * 10);
        });
    }

    generatePositions (width, height, begin = 0) {
        const positions = Array(Math.round(width / 16)).fill([]);
        positions.forEach((position,i) => { positions[i] = Array(Math.round(height / 32)).fill([0,0])})
        positions.forEach((col, i) => {
            positions[i].forEach((row, j) => {
                positions[i][j] = [begin + (i * 17) + 1, (j * 33) ];
            });
        });
        return positions.flat().sort((a,b) => 0.5 - Math.random());
    }
}

export default BlockCreator;
