class Menu extends Phaser.Scene {
    constructor(){
        super({key: "menu"});
    
    }

    preload(){
        console.log("menu preload");
    }

    create(){
        console.log("menu create");
        this.options = ["one player", "two player", "settings", "help"];
        this.scenes = ["single_player_game", "multi_player_game", "settings", "help"];
        this.current = 0;

        for(let i = 0;i < 4; i++){
            this.add.bitmapText(40, 40 + (50 * i), "squareFont",this.options[i], 36);
        }
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
        console.log(this.options[this.current], this.current);
    }

    menuDown(){
        if(this.current === this.options.length -1){
            this.current = 0;
        }else{
            this.current++;
        }
        console.log(this.options[this.current], this.current);
    }
}


export default Menu;