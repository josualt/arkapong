class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "bootloader"});
    
    }

    preload(){
        this.load.on("complete", () => {
            this.scene.start("ScenePlay");
        })
        this.scene.start("ScenePlay");
        this.load.image("ball", "./assets/images/ball.png");
        this.load.image("izquierda", "./assets/images/left_pallete.png");
        this.load.image("derecha", "./assets/images/right_pallete.png");
        this.load.image("separador", "./assets/images/separator.png");
        
    }
    }


export default Bootloader;