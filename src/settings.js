class Settings extends Phaser.Scene {
    constructor(){
        super({key: "settings"});
    
    }

    preload(){
        console.log("settings preload");
    }

    create(){
        console.log("settings create");
        this.add.bitmapText(40, 60, "squareFont","hello settings ", 36);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
}


export default Settings;