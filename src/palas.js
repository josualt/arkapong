class Palas extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type)
        scene.add.existing(this)
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.body.setCollideWorldBounds(true);
        this.isFrozen = false;
    }

    reset () {
        this.setScale(1, 1);
        this.body.x;
        clearInterval(this.clearID);
    }
    freeze(){
        this.isFrozen = true;
        this.clearID = setTimeout(()=>{this.isFrozen = false;}, Phaser.Math.Between(1000, 3000))
    }
}

export default Palas;