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

    showTitle () {
        const coords = [
        [3,3],[3,4],[3,5],[3,6],[3,7],
        [4,3],[5,3],
        [4,5],[5,5],
        [6,3],[6,4],[6,5],[6,6],[6,7],
        [8,3],[8,4],[8,5],[8,6],[8,7],
        [9,3],[10,3],
        [9,5],[10,5],
        [11,4],[10,6],[11,7],
        [13,3],[13,4],[13,5],[13,6],[13,7],
        [16,3],
        [15,4],
        [14,5],
        [16,3],[15,6],[16,7],
        [18,3],[18,4],[18,5],[18,6],[18,7],
        [19,3],[20,3],
        [19,5],[20,5],
        [21,3],[21,4],[21,5],[21,6],[21,7],
        [23,3],[23,4],[23,5],[23,6],[23,7],
        [24,3],[25,3],
        [24,5],[25,5],
        [26,3],[26,4],[26,5],
        [28,3],[28,4],[28,5],[28,6],[28,7],
        [29,3],[30,3],
        [29,7],[30,7],
        [31,3],[31,4],[31,5],[31,6],[31,7],
        [33,3],[33,4],[33,5],[33,6],[33,7],
        [34,5],[35,6],
        [36,3],[36,4],[36,5],[36,6],[36,7],
        [38,3],[38,4],[38,5],[38,6],[38,7],
        [39,3],[40,3],
        [40,5],
        [39,7],[40,7],
        [41,3],[41,5],[41,6],[41,7],
    ];

        coords.forEach(coord => {
            let [x, y] = this.orderedBlocks[coord[0]][coord[1]];
            this.scene.add.rectangle(x, y, 16, 32, 0x000000);
        }) 
        this.scene.sound.play("lose");
    }

    generatePositions (width, height, begin = 0) {
        const positions = Array(Math.round(width / 16)).fill([]);
        positions.forEach((position,i) => { positions[i] = Array(Math.round(height / 32)).fill([0,0])})
        positions.forEach((col, i) => {
            positions[i].forEach((row, j) => {
                positions[i][j] = [begin + (i * 17) + 1, (j * 33) ];
            });
        });
        this.orderedBlocks = [...positions];
        return positions.flat().sort((a,b) => 0.5 - Math.random());
    }
}

export default BlockCreator;
