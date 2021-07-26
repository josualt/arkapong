import Palas from './palas.js';
import BlockCreator from './block_creator';


class MultiPlayerGame extends Phaser.Scene {
    constructor () {
        super({key: "multi_player_game"});
    }

    preload () {
        console.log("la escena play se ha cargado");
    }
    
    create () {
        console.log(this.registry.get("ballSpeed"),this.registry.get("paddleSpeed"),this.registry.get("winScore") );

  
        this.pointsA = 0;
        this.pointsB = 0;
        this.points = 3;
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        this.center_width = this.width/2;
        this.center_height = this.height/2;
        this.pointsAText = this.add.bitmapText(this.center_width/2, 20, "squareFont", this.pointsA, 36);
        this.pointsBText = this.add.bitmapText(this.center_width+(this.center_width/2), 20, "squareFont", this.pointsB, 36);
        this.resultMessage = this.add.bitmapText(this.center_width, this.center_height, "squareFont", "", 46).setOrigin(0.5);
        this.continueMessage = this.add.bitmapText(this.center_width, this.center_height + 50, "squareFont", "", 30).setOrigin(0.5);

        //separador
        this.add.tileSprite(this.center_width, this.center_height, 1, this.height, "separador")
        this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        
        this.izquierda = new Palas(this, 30, this.center_height, "izquierda")
       
        this.derecha = new Palas(this, this.sys.game.config.width-30, this.center_height, "derecha");
        this.physics.world.setBoundsCollision(false, false, true, true)
        //bola
        this.ball = this.physics.add.image(this.center_width, this.center_height, "ball");
        this.ball.setVelocityX(-180)
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.restart();
        //fisicas
        this.blockCreator = new BlockCreator(this);
        this.blockCreator.generate();
        this.rectangle = new Phaser.GameObjects.Rectangle(this,this.center_width, this.center_height, 60, 20, 0xff0000)
        this.physics.add.existing(this.rectangle);
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);
       
        
        //Controles
        //pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();

        //pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursor_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursor_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (this.ESC.isDown) {
            this.blockCreator.stop();
            this.scene.start('menu');
        }
        
        if(this.pointsA === this.points || this.pointsB === this.points){
            
            this.blockCreator.stop();
            this.showResult();
            if(this.ENTER.isDown){
                this.restartGame();
            }
        } else {
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
                //this.derecha.body.x -= 3;
                this.derecha.body.setVelocityX(-200)
            } 
    
            if(this.cursor.left.isUp || this.derecha.body.x < this.center_width+(this.center_width/2) - 10) {
                //this.derecha.body.x -= 3;
                this.derecha.body.setVelocityX(0);
            } 
    
            //Pala izquierda
            if(this.cursor_S.isDown){
                this.izquierda.body.y += 3;
            }
            
            if(this.cursor_W.isDown){
                this.izquierda.body.y -= 3;
            }
            
            if(this.cursor_D.isDown && this.izquierda.body.x < this.center_width/2){
              //this.izquierda.body.x += 3;
                this.izquierda.body.setVelocityX(200)
            }
    
            if(this.cursor_D.isUp || this.izquierda.body.x >= this.center_width/2){
                //this.izquierda.body.x += 3;
                  this.izquierda.body.setVelocityX(0);
              }
            
            if(this.cursor_A.isDown && this.izquierda.body.x > 0){
                this.izquierda.body.x -= 3;
            }
        }
        
        
    }

    chocaPala(ball, paddle) {
        const hitPoint = paddle.y - ball.y
        console.log(ball.y, paddle.y, paddle.y - ball.y );
        if(hitPoint < 2 && hitPoint > -2){
            this.ball.setVelocityY(0)
        } else{
            this.ball.setVelocityY(-hitPoint * 5);
        }
    }

    restart(){
        if(this.pointsA < this.points && this.pointsB < this.points){
            console.log(this.pointsA, this.pointsB);
            this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
            this.ball.setVelocityX(-180)
            this.ball.setVelocityY(Phaser.Math.Between(-150, 150));
        }
    }

    incrementA() {
        this.pointsA++;
        this.pointsAText.setText(this.pointsA);
    }

    incrementB(){
        this.pointsB++;
        this.pointsBText.setText(this.pointsB);
    }

    showResult(){
        const message = this.pointsA > this.pointsB ? "PLAYER A WINS" : "PLAYER B WINS";
        this.resultMessage.setText(message);
        this.continueMessage.setText("press ENTER to play again ESC to quit");
    }
    restartGame(){
        console.log("restart game", this.pointsA, this.pointsB);
        this.resultMessage.setText("");
        this.continueMessage.setText("");
        this.ball.x = this.center_width;
        this.pointsA = 0;
        this.pointsB = 0;
        this.pointsAText.setText(this.pointsA);
        this.pointsBText.setText(this.pointsB);
        console.log("lets go", this.pointsA, this.pointsB);
        this.blockCreator.generate();
    }
}

export default MultiPlayerGame;