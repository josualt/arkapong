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
        this.sea_height = center_height+100;
        this.add.bitmapText(this.center_width, 150 , "squareFont","it was a sunny afternoon on the beach \n when suddenly...", 20).setOrigin(0.5);
        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.blockCreator = new BlockCreator(this);
        this.sound.play("pong");
        this.izquierda = new Palas(this, 200,this.height-20, "izquierda")
        this.derecha = new Palas(this,600,this.height-20, "derecha");
        this.add.rectangle(0,this.height-5,this.width,6,0xffffff).setOrigin(0);
        this.add.rectangle(700, 200, 50, 50, 0xffffff)
        this.add.rectangle(0,this.sea_height, this.width, 2, 0xffffff).setOrigin(0);
        this.createBall();
        this.waves = [];
        this.generateWaves();
        this.stopped = false;
        this.stopAnimationId = setTimeout(() => this.stopAnimation(), 4000);
        this.stopBlockCreatorId = setTimeout(() => this.blockCreator.wall(), 4000);
        this.stopShowTitle = setTimeout(() => this.blockCreator.showTitle(), 14000);
    }

    update(){
        if(this.ENTER.isDown) {
            clearTimeout(this.stopAnimationId);
            clearTimeout(this.stopBlockCreatorId);
            this.blockCreator.stop();
            this.scene.start("menu");
        }

        if (!this.stopped)
         this.waves.forEach((wave, i) => this.updateWave(wave, i));
    }

    createBall(velocityX = -180){
        this.ball = this.physics.add.image(this.center_width, this.height - 40, "ball");
        this.ball.x = this.center_width;
        this.ball.setVelocityX(Phaser.Math.Between(0,1) ? 100 : -100);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);
    }

    chocaPala (ball, paddle) {
        const jump = Phaser.Math.Between(5,20);
        paddle.body.y -= jump;
        setTimeout(() => this.goBack(paddle, jump), 100);
    }

    goBack (paddle, jump) {
        paddle.y += jump;
    }

    generateWaves () {
        this.waves.push(this.add.rectangle(0,this.sea_height + 2, this.width, 1, 0xffffff).setOrigin(0));
    }

    updateWave (wave, i) {
        if (wave.y > this.sea_height + Phaser.Math.Between(40,45)) {
            wave.destroy();
            this.waves[i] = null;
        } else if(wave.y > this.sea_height + 30 && this.waves.length < 2) {
            this.generateWaves();
        } else {
            wave.y += Phaser.Math.Between(0,1);
        }

        this.waves = this.waves.filter(wave => wave !== null);
        if (this.waves.length < 1) this.generateWaves();
    }

    stopAnimation () {
        this.waves.forEach(wave => wave.destroy());
        this.stopped = true;
        this.ball.destroy();
    }
}


export default Cinematic;
