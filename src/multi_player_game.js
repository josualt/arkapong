import Palas from './palas.js';

class MultiPlayerGame extends Phaser.Scene {
    constructor () {
        super({key: "multi_player_game"});
    }

    preload () {
        console.log("la escena play se ha cargado");
    }
    
    create () {
        this.pointsA = 0;
        this.pointsB = 0;
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        const center_height = this.height/2;
        this.pointsAText = this.add.bitmapText(this.center_width/2, 20, "squareFont", this.pointsA, 36);
        this.pointsBText = this.add.bitmapText(this.center_width+(this.center_width/2), 20, "squareFont", this.pointsB, 36);
        //separador
        this.add.image(this.center_width, center_height,  "separador")
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        
        this.izquierda = new Palas(this, 30, center_height, "izquierda")
       
       this.derecha = new Palas(this, this.sys.game.config.width-30, center_height, "derecha");
        this.physics.world.setBoundsCollision(false, false, true, true)
        //bola
        this.ball = this.physics.add.image(this.center_width, center_height, "ball");
        this.ball.setVelocityX(-180)
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        //fisicas

        this.physics.add.collider(this.ball, this.izquierda,this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha,this.chocaPala, null, this);
        
        //Controles
        //pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        //pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursor_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursor_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(){
        if (this.ESC.isDown) {
            this.scene.start('menu');
        }
        
        if(this.ball.x < 0) {
            this.incrementB();
            this.restart();
        } else if (this.ball.x > this.width){   
            this.incrementA();
            this.restart();   
        }

        //control de las palas
        //pala derecha
        if(this.cursor.down.isDown){
            this.derecha.body.y += 3;
        }
 
        if(this.cursor.up.isDown) {
            this.derecha.body.y -= 3;
        } 
        
        if(this.cursor.right.isDown && this.derecha.body.x <= this.width - 10) {
            this.derecha.body.x += 3;
        } 
        
        if(this.cursor.left.isDown && this.derecha.body.x >= this.center_width+(this.center_width/2) - 10) {
            this.derecha.body.x -= 3;
        } 

        //Pala izquierda
        if(this.cursor_S.isDown){
            this.izquierda.body.y += 3;
        }
        
        if(this.cursor_W.isDown){
            this.izquierda.body.y -= 3;
        }
        
        if(this.cursor_D.isDown && this.izquierda.body.x < this.center_width/2){
            this.izquierda.body.x += 3;
        }
        
        if(this.cursor_A.isDown && this.izquierda.body.x > 0){
            this.izquierda.body.x -= 3;
        }
    }

    chocaPala() {
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120))
    }

    restart(){
        console.log(this.pointsA, this.pointsB);
        this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
        this.ball.setVelocityX(-180)
    }

    incrementA() {
        this.pointsA++;
        this.pointsAText.setText(this.pointsA);
        if(this.pointsA === 10){
            this.pointsB = 0;
            this.pointsA = 0;
            console.log("CONGRATS A WINS");
        }
    }
    incrementB(){
        this.pointsB++;
        this.pointsBText.setText(this.pointsB);
        if(this.pointsB === 10){
            this.pointsB = 0;
            this.pointsA = 0;
            console.log("CONGRATS B WINS")
        }
    }
}

export default MultiPlayerGame;