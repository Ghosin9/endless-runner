class Worker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, blahSpeed, num) {
        if(num == 1) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "enemies", "enemy_1");

                scene.add.existing(this);
                scene.physics.add.existing(this);
                this.scene = scene;

                //create animations
                this.scene.anims.create({
                    key: "fWalk",
                    frames: this.scene.anims.generateFrameNames("enemies", {
                        prefix: "enemy_",
                        start: 1,
                        end: 4,
                    }),
                    frameRate: 3,
                    repeat: -1,
                });

                this.anims.play("fWalk");
        } else { //num == 2
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
                game.config.height-game.settings.tileOffset/2), "enemies", "enemy_5");

            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.scene = scene;

            //create animations
            this.scene.anims.create({
                key: "mWalk",
                frames: this.scene.anims.generateFrameNames("enemies", {
                    prefix: "enemy_",
                    start: 5,
                    end: 8,
                }),
                frameRate: 3,
                repeat: -1,
            });

            this.anims.play("mWalk");
        }

        this.speed = speed;
        this.blahSpeed = blahSpeed;
        this.setVelocityX(speed);
        this.setImmovable();
        this.body.allowGravity = false;

        this.firing = this.scene.time.addEvent({
            delay: 1500,
            callback: this.fireBlah,
            callbackScope: this,
            repeat: 1,
            startAt: 1000,
        });
    }

    update() {
        super.update();

        if(this.x < -this.width) {
            this.destroy();
        }
    }

    fireBlah() {
        this.blah = this.scene.physics.add.sprite(this.x-this.width/2, this.y-this.height/2, "objects", "blah");
        this.blah.body.allowGravity = false;
        this.blah.body.setImmovable();
        this.scene.physics.moveTo(this.blah, this.scene.player.x, this.scene.player.y, this.blahSpeed);
        this.scene.sound.play("blah");

        if(this.scene.boxMode)
            this.scene.papers.add(this.blah);
        else
            this.scene.obstacles.add(this.blah);
    }
}