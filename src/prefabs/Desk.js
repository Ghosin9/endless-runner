class Desk extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed) {
        super(scene, game.config.width+game.settings.tileOffset, 
            Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, game.config.height-game.settings.tileOffset/2), "desk");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityX(speed);
        this.setImmovable();
        this.body.allowGravity = false;

        this.scene = scene;
        this.speed = speed;
        this.newDesk = true;

        this.random = Phaser.Math.Between(game.config.width/5, game.config.width/2)
    }

    update() {
        super.update();

        if(this.newDesk && this.x < this.random) {
            this.newDesk = false;

            this.scene.addDesk(this.parent, this.speed);
        }

        if(this.x < -this.width) {
            this.destroy();
        }

        if(game.settings.gameOver) {
            this.setVelocityX(0);
        }
    }
}