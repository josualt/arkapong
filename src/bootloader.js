class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "bootloader"});
    
    }

    preload(){
        this.load.bitmapFont("squareFont", "./assets/fonts/square.png", "./assets/fonts/square.xml");

        this.load.on("complete", () => {
            this.scene.start("cinematic");
        })
        
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
    }
}


export default Bootloader;