class Paper extends Phaser.Physics.Arcade.Sprite {
    constructor() {
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        super.update();
    }
}