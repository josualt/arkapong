class Menu extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    
    }

    preload(){
        console.log("menu preload");
    }

    create(){
        console.log(this.registry.get("ballSpeed"),this.registry.get("paddleSpeed"),this.registry.get("winScore") );
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        console.log("menu create");
        this.add.image(700, 430, "helpB").setScale(0.5)
        this.add.image(95, 430, "helpA").setScale(0.5)
        this.add.image(300, 430, "pressEnter").setScale(0.5)
        this.add.image(500, 430, "pressEsc").setScale(0.5)
        this.options = ["one player", "two player", "settings", "help"];
        this.scenes = ["single_player_game", "multi_player_game", "settings", "help"];
        this.current = 0;
        this.add.bitmapText(this.center_width, 50 , "squareFont","ARKAPONG", 60).setOrigin(0.5);
        const layer = this.add.layer();
        this.rectangle = new Phaser.GameObjects.Rectangle(this, this.center_width, 150, this.width, 40, 0xffffff).setOrigin(0.5);
        layer.add(this.rectangle);
        this.texts = [];
        for(let i = 0;i < 4; i++){
            this.texts.push(this.add.bitmapText(this.center_width, 150 + (50 * i), "squareFont",this.options[i], 36).setOrigin(0.5));
        }

        this.texts[0].tint = 0x000000;
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.input.keyboard.on('keydown-UP', this.menuUp, this);
        this.input.keyboard.on('keydown-DOWN', this.menuDown, this);
        this.input.keyboard.on('keydown-W', this.menuUp, this);
        this.input.keyboard.on('keydown-S', this.menuDown, this);
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start(this.scenes [this.current]);
          } 
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


export default Menu;