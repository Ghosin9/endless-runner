class Paper extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, speed, num) {

        if(num == 1){
            super(scene, game.config.width+40, y, "papers", "paper_a_2");
        } else if(num == 2){
            super(scene, game.config.width+40, y, "papers", "paper_b_2");
        } else if(num == 3){
            super(scene, game.config.width+40, y, "papers", "paper_c_2");
        } else {
            super(scene, game.config.width+40, y, "papers", "paper_d_2");
        }

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