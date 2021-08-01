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
        this.generator = setInterval(() => this.spawn(showEffect), 1 + Phaser.Math.Between(1000, 5000));
    }

    spawn(showEffect){
        const blockType = blockTypes[Phaser.Math.Between(0, blockTypes.length -1)];
        const [x, y] = this.positions[this.current];

       this.blocks.push(this.generateBlock(blockType, x, y, showEffect));
       this.current = this.current === this.positions.length -1 ? 0 : this.current + 1;
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
        const positions = this.generatePositions(this.width, this.height);
        positions.forEach((position, index) => {
            const [i, j] = position;
            let blockType = blockTypes[Phaser.Math.Between(0, blockTypes.length -1)];
            setTimeout(() => this.generateBlock(blockType, i , j), index * 10);
        });
    }

    showTitle () {
        const coords = [
        [4,3],[4,4],[4,5],[4,6],[4,7],
        [5,3],[6,3],
        [5,5],[6,5],
        [7,3],[7,4],[7,5],[7,6],[7,7],
        [9,3],[9,4],[9,5],[9,6],[9,7],
        [10,3],[11,3],
        [10,5],[11,5],
        [12,4],[11,6],[12,7],
        [14,3],[14,4],[14,5],[14,6],[14,7],
        [17,3],
        [16,4],
        [15,5],
        [17,3],[16,6],[17,7],
        [19,3],[19,4],[19,5],[19,6],[19,7],
        [20,3],[21,3],
        [20,5],[21,5],
        [22,3],[22,4],[22,5],[22,6],[22,7],
        [24,3],[24,4],[24,5],[24,6],[24,7],
        [25,3],[26,3],
        [25,5],[26,5],
        [27,3],[27,4],[27,5],
        [29,3],[29,4],[29,5],[29,6],[29,7],
        [30,3],[31,3],
        [30,7],[31,7],
        [32,3],[32,4],[32,5],[32,6],[32,7],
        [34,3],[34,4],[34,5],[34,6],[34,7],
        [35,5],[36,6],
        [37,3],[37,4],[37,5],[37,6],[37,7],
        [39,3],[39,4],[39,5],[39,6],[39,7],
        [40,3],[41,3],
        [41,5],
        [40,7],[41,7],
        [42,3],[42,5],[42,6],[42,7],
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
