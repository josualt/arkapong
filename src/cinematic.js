import BlockCreator from './block_creator';
import Palas from './palas.js'

class Cinematic extends Phaser.Scene {
    constructor(){
        super({key: "cinematic"});

    }

    preload(){
        console.log("cinematic preload");
    }

    create(){
        console.log("cinematic create");
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        //this.add.bitmapText(this.center_width, 150 , "squareFont","ARKAPONG", 160).setOrigin(0.5);
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.blockCreator = new BlockCreator(this);
        //this.blockCreator.wall();
        this.izquierda = new Palas(this, 200,this.height-20, "izquierda")
       
        this.derecha = new Palas(this,600,this.height-20, "derecha");
        this.add.rectangle(0,this.height-5,this.width,6,0xffffff).setOrigin(0);
        this.add.rectangle(700, 200, 50, 50, 0xffffff)
        this.add.rectangle(0,center_height+100, this.width, 1, 0xffffff).setOrigin(0);
        this.ball = this.add.rectangle(this.center_width, 450, 10, 10, 0xffffff)
    }

    update(){
        if(this.ENTER.isDown) {
            this.scene.start("menu");
          }
    }
}


export default Cinematic;
