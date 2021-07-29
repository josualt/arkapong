class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, color){
        super(scene, x, y, "block");
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        if (scene.balls) {
          scene.balls.forEach(ball => {
            scene.physics.add.collider(ball, this, () => this.touch(), null, scene);
          });
        }

        this.body.bounce = 1;
        this.body.immovable = true;
        this.tint = color;
        this.affectsPlayerA = x < this.scene.center_width;
    }

    log () {
        console.log("Im generic");
    }
}

export default Block;
