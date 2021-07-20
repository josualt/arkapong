class Menu extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    
    }

    preload(){
        console.log("menu preload");
    }

    create(){
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        console.log("menu create");
        this.options = ["one player", "two player", "settings", "help"];
        this.scenes = ["single_player_game", "multi_player_game", "settings", "help"];
        this.current = 0;
        this.texts = [];
        for(let i = 0;i < 4; i++){
            this.texts.push(this.add.bitmapText(this.center_width, 40 + (50 * i), "squareFont",this.options[i], 36).setOrigin(0.5));
        }

        this.texts[0].tint = 0xff0000;
        this.texts[0].backgroundColor = 0xffffff;
        this.texts[0].setScale(1.2,1.2)
        this.ball = this.physics.add.image(30, 55, "ball");
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.input.keyboard.on('keydown-UP', this.menuUp, this);
        this.input.keyboard.on('keydown-DOWN', this.menuDown, this);
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start(this.scenes [this.current]);
          } 
    }

    menuUp(){
        if(this.current === 0){
            this.current = this.options.length -1;
        }else{
            this.current--;
        }
        this.ball.y = 55 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }

    menuDown(){
        if(this.current === this.options.length -1){
            this.current = 0;
        }else{
            this.current++;
        }
        this.ball.y = 55 + (this.current * 50);
        console.log(this.options[this.current], this.current);
    }
}


export default Menu;