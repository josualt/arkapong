class Help extends Phaser.Scene {
    constructor(){
        super({key: "help"});
    
    }

    preload(){
        console.log("help preload");
    }

    create(){
        console.log("help create")
        this.add.bitmapText(40, 40, "squareFont","hello help ", 36);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
}


export default Help;