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
        this.points = 10; // this.registry.get("");
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
        this.balls = [];
        //fisicas
        this.blockCreator = new BlockCreator(this);

        this.restartGame();

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
            this.sound.play("escape");
            this.scene.start('menu');
        }
        
        if(this.pointsA === this.points || this.pointsB === this.points){
            this.blockCreator.stop();
            this.showResult();
            if(this.ENTER.isDown){
                this.restartGame();
            }
        } else {
            for (let i = 0; i < this.balls.length; i++) {
                if(this.balls[i].x < 0) {
                    this.balls[i].destroy();
                    this.balls[i] = null;
                    this.sound.play("lose");
                    this.incrementB();
                } else if (this.balls[i].x > this.width){   
                    this.balls[i].destroy();
                    this.balls[i] = null;
                    this.sound.play("lose");
                    this.incrementA();  
                }
            }
            this.balls = this.balls.filter(ball => ball !== null);
            if (this.balls.length === 0) this.restart();
    
            //control de las palas
            //pala derecha
            if(!this.derecha.isFrozen){
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
            }
  
    
            //Pala izquierda
            if(!this.izquierda.isFrozen){
                if(this.cursor_S.isDown){
                    this.izquierda.body.y += 3;
                }
                
                if(this.cursor_W.isDown){
                    this.izquierda.body.y -= 3;
                }
                
                if(this.cursor_D.isDown && this.izquierda.body.x < this.center_width/2){
                    this.izquierda.body.setVelocityX(200)
                }
        
                if(this.cursor_D.isUp || this.izquierda.body.x >= this.center_width/2){
                      this.izquierda.body.setVelocityX(0);
                  }
                
                if(this.cursor_A.isDown && this.izquierda.body.x > 0){
                    this.izquierda.body.x -= 3;
                }
            }
     
        }
        
        
    }

    chocaPala(ball, paddle) {
        const hitPoint = paddle.y - ball.y
        console.log(ball.y, paddle.y, paddle.y - ball.y );
        this.sound.play("paddle");
        if(hitPoint < 2 && hitPoint > -2){
            ball.setVelocityY(0)
        } else{
            ball.setVelocityY(-hitPoint * 5);
        }
    }

    restart(){
        this.blockCreator.reset();
        this.izquierda.stop();
        this.derecha.stop();
        if(this.pointsA < this.points && this.pointsB < this.points){
            console.log(this.pointsA, this.pointsB);
            this.createBall();
            this.sound.play("start");
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
    
    createBall(velocityX = -180){
        const ball = this.physics.add.image(this.center_width, this.center_height, "ball");
        ball.x = this.center_width;
        ball.setVelocityX(velocityX)
        ball.setVelocityY(Phaser.Math.Between(-150, 150));
        ball.setCollideWorldBounds(true);
        ball.setBounce(1);
        console.log(ball.body)
        this.physics.add.collider(ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(ball, this.derecha, this.chocaPala, null, this);
        this.blockCreator.setColliders(ball);
        this.balls.push(ball);
    }

    restartGame(){
        this.blockCreator.generate();
        this.balls = [];
        this.createBall();
        console.log("restart game", this.pointsA, this.pointsB);
        this.resultMessage.setText("");
        this.continueMessage.setText("");
        this.pointsA = 0;
        this.pointsB = 0;
        this.pointsAText.setText(this.pointsA);
        this.pointsBText.setText(this.pointsB);
        console.log("lets go", this.pointsA, this.pointsB);
    }
}

export default MultiPlayerGame;
