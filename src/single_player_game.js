class SinglePlayerGame extends Phaser.Scene {
    constructor(){
        super({key: "single_player_game"});
    }

    preload(){
        console.log("single_player_game preload");
    }

    create(){
        console.log("single_player_game create")
        this.add.bitmapText(40, 40, "squareFont","hello single_player_game", 36);
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
    }
}


export default SinglePlayerGame;