class Help extends Phaser.Scene {
    constructor(){
        super({key: "help"});
    
    }

    preload(){
        console.log("help preload");
    }

    create(){
        console.log("help create")
        this.add.bitmapText(300, 40, "squareFont","information", 36);
        this.add.bitmapText(255, 200, "squareFont","block abilities ", 36);
        this.add.bitmapText(295, 350, "squareFont","controls", 36);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.add.image(700, 440, "helpB").setScale(0.5)
        this.add.image(95, 440, "helpA").setScale(0.5)
        this.add.image(300, 450, "pressEnter").setScale(0.5)
        this.add.image(500, 450, "pressEsc").setScale(0.5)

    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
}


export default Help;