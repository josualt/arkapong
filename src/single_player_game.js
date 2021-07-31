import Game from './game';
import Palas from './palas.js';
import BlockCreator from './block_creator';

class SinglePlayerGame extends Game {
  constructor () {
    super("single_player_game"); 
  }

  playerBMoves () {
        if (!this.izquierda.isFrozen && this.balls[0]) {
            if(this.balls[0].body.velocity.x < 0) {
                if (this.balls[0].body.y > this.izquierda.body.y - 1) {
                    this.izquierda.body.y += 3;
                } else {
                    this.izquierda.body.y -= 3;
                }
            } else if (this.balls[0].body.velocity.x > 0 && this.izquierda.body.y -1 > this.center_height) {
                this.izquierda.body.y -= 3;
            } else if (this.balls[0].body.velocity.x > 0 && this.izquierda.body.y - 1 < this.center_height) {
                this.izquierda.body.y += 3;
            }
        }
    }
}

export default SinglePlayerGame;
