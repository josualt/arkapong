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

        for(let i = 0;i < 4; i++){
            this.add.bitmapText(40, 40 + (50 * i), "squareFont",this.options[i], 36);
        }
       
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start("single_player_game");
          } 
    }
}


export default Menu;