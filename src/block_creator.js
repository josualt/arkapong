import Block from './block';

class BlockCreator{

    constructor(scene){
        this.scene = scene;
        
    }
    generate(){
        console.log("i am here!!!")
        const block = new Block(this.scene, 200, 150, 0x6666ff);
    }
}

export default BlockCreator;