class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, color){
        super(scene, x, y, "block");
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.ball, this, () => this.touch(), null, scene);
        this.body.bounce = 1;
        this.body.immovable = true;
        this.tint = color;
    }

    log () {
        console.log("Im generic");
    }
}

export default Block;