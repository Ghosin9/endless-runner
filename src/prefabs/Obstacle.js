class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, num) {
        if(num==1) {

            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_1");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(90, 82, false);
            this.body.setOffset(0, 27);

            this.topHitbox = scene.physics.add.sprite(this.x+25, this.y-40);
            this.topHitbox.body.setSize(33, 25);
            this.topHitbox.body.allowGravity = false;
            this.topHitbox.body.immovable = true;
            this.topHitbox.setVelocityX(speed);

            scene.obstacles.add(this.topHitbox);

            this.newObstacle = true;

        } else if (num==2) {

            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "desk_2");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(90, 82, false);
            this.body.setOffset(0, 27);

            this.topHitbox = scene.physics.add.sprite(this.x+25, this.y-37);
            this.topHitbox.body.setSize(33, 25);
            this.topHitbox.body.allowGravity = false;
            this.topHitbox.body.immovable = true;
            this.topHitbox.setVelocityX(speed);

            scene.obstacles.add(this.topHitbox);

            this.newObstacle = true;

        } else if (num==3) {

            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset, 
                game.config.height-game.settings.tileOffset/2), "objects", "trash");
            scene.add.existing(this);
            scene.physics.add.existing(this);

            this.newObstacle = true;

        } else if (num == 4){

            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "objects", "plant");
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //adjust hitbox
            this.body.setSize(64, 109);

            this.newObstacle = true;

        } else if (num == 5) {

            super(scene, game.config.width+game.settings.tileOffset*2.75, Phaser.Math.Between(-game.settings.tileOffset/4, 
                game.settings.tileOffset*3/4), "objects", "ceiling_1");

            scene.add.existing(this);
            scene.physics.add.existing(this);

            //adjust hitboxes
            this.body.setSize(260, 40, false);
            this.body.setOffset(3, 120);

            this.pole = scene.physics.add.sprite(this.x, this.y);
            this.pole.body.setSize(50, 195);
            this.pole.body.allowGravity = false;
            this.pole.body.immovable = true;
            this.pole.setVelocityX(speed);

            scene.obstacles.add(this.pole);

            this.newObstacle = false;

        } else { // null == 6

            super(scene, game.config.width+game.settings.tileOffset*2, Phaser.Math.Between(-game.settings.tileOffset/4, 
                game.settings.tileOffset*3/4), "objects", "ceiling_2");

            scene.add.existing(this);
            scene.physics.add.existing(this);

            //adjust hitboxes
            this.body.setSize(140, 70, false);
            this.body.setOffset(2, 122);

            this.pole = scene.physics.add.sprite(this.x, this.y);
            this.pole.body.setSize(45, 120, false);
            this.pole.body.setOffset(-5, -80);
            this.pole.body.allowGravity = false;
            this.pole.body.immovable = true;
            this.pole.setVelocityX(speed);

            scene.obstacles.add(this.pole);

            this.newObstacle = false;
        }

        this.setVelocityX(speed);
        this.setImmovable();
        this.body.allowGravity = false;

        this.scene = scene;
        this.speed = speed;
        this.num = num;

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