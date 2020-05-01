class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, num) {
        if(num==1) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_1");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(82, 74, false);
            this.body.setOffset(0, 27);

            this.topHitbox = scene.physics.add.sprite(this.x+25, this.y-40);
            this.topHitbox.body.setSize(25, 25);
            this.topHitbox.body.allowGravity = false;
            this.topHitbox.body.immovable = true;
            this.topHitbox.setVelocityX(speed);

            scene.obstacles.add(this.topHitbox);
        } else if (num==2) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_2");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(82, 74, false);
            this.body.setOffset(0, 27);

            this.topHitbox = scene.physics.add.sprite(this.x+25, this.y-35);
            this.topHitbox.body.setSize(25, 20);
            this.topHitbox.body.allowGravity = false;
            this.topHitbox.body.immovable = true;
            this.topHitbox.setVelocityX(speed);

            scene.obstacles.add(this.topHitbox);
        } else if (num==3) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset, 
                game.config.height-game.settings.tileOffset/2), "objects", "trash");
            scene.add.existing(this);
            scene.physics.add.existing(this);
        } else { //num==4
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "plant");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(56, 100);
        }

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

        if(!game.settings.gameOver && this.newObstacle && this.x < this.random) {
            this.newObstacle = false;

            this.scene.addObstacle(this.parent, this.speed);
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }
}