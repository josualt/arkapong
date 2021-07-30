import Block from './block.js';

class MagentaBlock extends Block{
    constructor(scene, x, y, color){
        super(scene, x, y, color);
    }

    touch(){
        console.log("magenta");
        this.destroy();
    }
}

export default MagentaBlock;