class Block extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, color){
        super(scene, x, y, "block");
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.ball, this, this.touch.bind(this), null, scene);
        this.body.bounce = 1;
        this.body.immovable = true;
        this.tint = color;
    }

    touch(){
        console.log("booOOOoom", this.scene.izquierda);
        this.scene.izquierda.setScale(1, 2);
        this.destroy();
    }
}

export default Block;