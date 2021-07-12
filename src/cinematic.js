class Cinematic extends Phaser.Scene {
    constructor(){
        super({key: "cinematic"});
    
    }

    preload(){
        console.log("cinematic preload");
    }

    create(){
        console.log("cinematic create")
    }

    update(){
        
    }
}


export default Cinematic;