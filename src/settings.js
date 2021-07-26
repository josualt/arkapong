import settingsOptions from './settings_options';

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
        this.options = [];
        this.selected = [2,3,2];
        for(let i = 0; i < settingsOptions.length; i++){
            this.add.bitmapText(this.center_width, 150 + (i*100) , "squareFont",settingsOptions[i].name, 35).setOrigin(0.5);
            this.options[i] = [];
            for(let j = 0; j < settingsOptions[i].options.length; j++){
                this.options[i].push(this.add.bitmapText(this.center_width + (j*60), 200 + (i*100)  , "squareFont",settingsOptions[i].options[j],30).setOrigin(0.5));
            }
        }
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.input.keyboard.on('keydown-UP', this.menuUp, this);
        this.input.keyboard.on('keydown-DOWN', this.menuDown, this);
        this.input.keyboard.on('keydown-RIGHT', this.menuRight, this);
        this.input.keyboard.on('keydown-LEFT', this.menuLeft, this);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
    setSelected(){
        for(let i = 0; i < this.selected.length; i++){

        }
    }
    menuRight(){
        this.texts[this.current].tint = 0xffffff;
        if(this.current === 0){
            this.current = this.options.length -1;
        }else{
            this.current--;
        }
        this.texts[this.current].tint = 0x000000;
        this.rectangle.y = 150 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }

    menuLeft(){
        this.texts[this.current].tint = 0xffffff;
        if(this.current === this.options.length -1){
            this.current = 0;
        }else{
            this.current++;
        }
        this.texts[this.current].tint = 0x000000;
        this.rectangle.y = 150 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }
    menuUp(){
        this.texts[this.current].tint = 0xffffff;
        if(this.current === 0){
            this.current = this.options.length -1;
        }else{
            this.current--;
        }
        this.texts[this.current].tint = 0x000000;
        this.rectangle.y = 150 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }

    menuDown(){
        this.texts[this.current].tint = 0xffffff;
        if(this.current === this.options.length -1){
            this.current = 0;
        }else{
            this.current++;
        }
        this.texts[this.current].tint = 0x000000;
        this.rectangle.y = 150 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }
}


export default Settings;