class SinglePlayerGame extends Phaser.Scene {
    constructor(){
        super({key: "single_player_game"});
    }

    preload(){
        console.log("single_player_game preload");
    }

    create(){
        console.log("single_player_game create")
    }

    update(){
        
    }
}


export default SinglePlayerGame;