class Paper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, speed) {

        super(scene, game.config.width+40, y, "objects", "paper_2");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityX(speed);
        this.allowGravity = false;
        this.setImmovable();

        this.scene = scene;

        this.setCircle(17);
    }

    update() {
        super.update();

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}