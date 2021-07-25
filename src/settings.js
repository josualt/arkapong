import settingsOptions from './settingsOptions';

class Settings extends Phaser.Scene {
    constructor(){
        super({key: "settings"});
    
    }

    preload(){
        console.log("settings preload");
    }

    create(){
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        this.add.bitmapText(this.center_width, 50 , "squareFont","ARKAPONG", 60).setOrigin(0.5);
        this.add.bitmapText(this.center_width, 110 , "squareFont","SETTINGS", 40).setOrigin(0.5);
        console.log("settings create");
        for(let i = 0; i < settingsOptions.length; i++){
            this.add.bitmapText(this.center_width, 110 , "squareFont",settingsOptions[i].name, 30).setOrigin(0.5);
        }
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
}


export default Settings;