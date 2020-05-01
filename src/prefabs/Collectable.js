class Collectable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed) {
        super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset, 
            game.config.height-game.settings.tileOffset), "objects", "box_1");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityX(speed);
        this.setImmovable();
        this.body.allowGravity = false;

        this.scene = scene;
        this.speed = speed;

        //item animation
        this.scene.anims.create({
            key: "box",
            frames: this.scene.anims.generateFrameNames("objects", {
                prefix: "box_",
                start: 1,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1,
        });

        this.anims.play("box");
    }

    update() {
        super.update();

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}