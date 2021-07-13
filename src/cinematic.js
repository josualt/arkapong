class Cinematic extends Phaser.Scene {
    constructor(){
        super({key: "cinematic"});
    
    }

    preload(){
        console.log("cinematic preload");
    }

    create(){
        console.log("cinematic create");
        this.add.bitmapText(40, 40, "squareFont","Hello Cinematic", 36);
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start("menu");
          }
    }
}


export default Cinematic;