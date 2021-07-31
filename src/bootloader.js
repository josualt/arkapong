class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "bootloader"});
    
    }

    preload(){
        this.load.bitmapFont("squareFont", "./assets/fonts/square.png", "./assets/fonts/square.xml");

        this.load.on("complete", () => {
            this.scene.start("cinematic");
        })

        console.log("DEbug? ");
        
        this.load.image("ball", "./assets/images/ball.png");
        this.load.image("izquierda", "./assets/images/paddle.png");
        this.load.image("derecha", "./assets/images/paddle.png");
        this.load.image("separador", "./assets/images/separator.png");
        this.load.image("block", "./assets/images/block.png");
        this.load.image("helpB", "./assets/images/playerb_help.png");        
        this.load.image("helpA", "./assets/images/playera_help.png");
        this.load.image("block", "./assets/images/block.png");
        this.load.image("pressEnter", "./assets/images/enter_button.png");
        this.load.image("pressEsc", "./assets/images/esc_button.png");
        this.load.audio("pong", "./assets/sounds/pong.mp3");
        this.load.audio("menu", "./assets/sounds/menu.mp3");
        this.load.audio("block", "./assets/sounds/block.mp3");
        this.load.audio("enlarge", "./assets/sounds/enlarge.mp3");
        this.load.audio("escape", "./assets/sounds/escape.mp3");
        this.load.audio("lose", "./assets/sounds/lose.mp3");
        this.load.audio("paddle", "./assets/sounds/paddle.mp3");
        this.load.audio("shrink", "./assets/sounds/shrink.mp3");
        this.load.audio("start", "./assets/sounds/start.mp3");
        this.load.audio("threeball", "./assets/sounds/threeball.mp3");
        this.load.audio("wall", "./assets/sounds/wall.mp3");


        this.registry.set("ballSpeed", 2);
        this.registry.set("paddleSpeed", 3);
        this.registry.set("winScore", 2);
    }
}


export default Bootloader;