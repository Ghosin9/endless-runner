class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, num) {
        if(num==1) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_1");
        } else if (num==2) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_2");
        } else if (num==3) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset, 
                game.config.height-game.settings.tileOffset/2), "objects", "trash");
        } else { //num==4
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "plant");
        }

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityX(speed);
        this.setImmovable();
        this.body.allowGravity = false;

        this.scene = scene;
        this.speed = speed;
        this.num = num;
        this.newObstacle = true;

        this.random = Phaser.Math.Between(game.config.width/4, game.config.width/2);
    }

    update() {
        super.update();

        if(this.newObstacle && this.x < this.random) {
            this.newObstacle = false;

            this.scene.addObstacle(this.parent, this.speed);
        }

        if(this.x < -this.width) {
            this.destroy();
        }

        if(game.settings.gameOver) {
            this.setVelocityX(0);
        }
    }
}