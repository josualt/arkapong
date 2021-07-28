class Cinematic extends Phaser.Scene {
    constructor(){
        super({key: "cinematic"});
    
    }

    preload(){
        console.log("cinematic preload");
 
    }

    create(){
        console.log("cinematic create");
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        this.add.bitmapText(this.center_width, 150 , "squareFont","ARKAPONG", 160).setOrigin(0.5);
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start("menu");
          }
    }
}


export default Cinematic;