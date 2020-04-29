class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //physics
        this.backgroundSpeed = 3;
        this.foregroundSpeed = 4;

        //jumps
        this.jumpSpeed = -650;
        this.jumpCounter = 0;

        //desk speed
        this.deskSpeed = -600;
        this.deskSpeedMax = -1000;

        //paper speed
        this.paperSpeed = -400;
        this.paperSpeedMax = -1500;

        //current score
        this.score = 0;

        //add tileSprite background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0);

        //making floor
        this.ground = this.physics.add.sprite(0, game.config.height - game.settings.tileOffset/2, "floor").setOrigin(0);
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        //adding foreground
        this.foreground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "foreground").setOrigin(0);

        //gameover text
        let gameText = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#CCC',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        //add game over text
        this.gameOverText = this.add.text(game.config.width/2, game.config.height/2 - game.settings.textOffset, "GAME OVER", gameText).setOrigin(0.5);
        this.restart = this.add.text(game.config.width/2, game.config.height/2, "Press SPACE to Restart", gameText).setOrigin(0.5);
        this.hiScore = this.add.text(game.config.width/2, game.config.height/2 + game.settings.textOffset, "High Score: " + game.settings.highScore, gameText).setOrigin(0.5);
        //but make it transparent
        this.gameOverText.alpha = 0;
        this.restart.alpha = 0;
        this.hiScore.alpha = 0;

        //add highScore text image here
        this.scoreBackground = this.add.tileSprite(game.settings.textOffset/2, game.settings.textOffset/2, this.width, this.height, "score").setOrigin(0.07, 0.13).setScale(0.7); 

        //score text
        let scoreText = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: "#000000",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        };

        //add current score in the top left, and high score in the top right
        this.curScore = this.add.text(game.settings.textOffset/2, game.settings.textOffset/2, this.score, scoreText).setOrigin(0);

        //set up desks and add first desk
        this.desks = this.add.group({
            runChildUpdate: true,
        });
        this.addDesk();

        //set up player
        this.player = this.physics.add.sprite(game.config.width/6, game.config.height - game.settings.tileOffset-60, "player", "p_stand");
        this.player.setCollideWorldBounds(true);

        //create animations
        //animation speed up counter
        this.n = 1;

        this.walk = this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "p_walk_",
                start: 1,
                end: 4,
            }),
            frameRate: 3,
        });

        this.anims.create({
            key: "stand",
            defaultTextureKey: "player",
            frames: [
                {frame: "p_stand"}
            ],
        });

        this.anims.create({
            key: "jump",
            defaultTextureKey: "player",
            frames: [
                {frame: "p_jump"}
            ],
        });

        //add physics colliders
        this.physics.add.collider(this.player, this.ground);

        //set up phaser provided keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        //increase difficulty every 5 seconds
        this.difficultyTimer = this.time.addEvent({
            delay: 5000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true,
        });
    }

    update() {
        if(!game.settings.gameOver) {
            //scrolling background
            this.background.tilePositionX += this.backgroundSpeed;
            //scrolling foreground
            this.foreground.tilePositionX += this.foregroundSpeed;

            //check collision between desk and bird
            this.physics.collide(this.player, this.desks, this.obstacleCollision, null, this);

            // //left right mechanics
            // if(this.cursors.left.isDown) {
            //     this.player.setVelocityX(-this.speed);
            //     this.player.setFlip(true, false);
            //     //play walking animation
            // } else if(this.cursors.right.isDown) {
            //     this.player.setVelocityX(this.speed);
            //     this.player.resetFlip();
            //     //play walking animation
            // } else {
            //     this.player.body.velocity.x = 0;
            //     //play idle animation
            // }

            if(this.player.body.touching.down) {
                //play walking animations
                this.player.anims.play("walk" ,true);
            } else {
                //play jumping animation
                this.player.anims.play('jump');
            }

            //attempted variable jump code, currently way too inconsistent
            //because update is called every frame, and the duration pressed depends on the framerate
            // if (this.player.body.touching.down && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 9)){
            //     this.player.body.setVelocityY(this.jumpSpeed);
            //     console.log("low Jump: " + this.cursors.space.getDuration());
            // } else if (this.player.body.touching.down && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 150)) {
            //     this.player.body.setVelocityY(this.jumpSpeed);
            //     console.log("high Jump: " + this.cursors.space.getDuration());
            // }

            //attempt 2 for variable jumps
            // https://www.html5gamedevs.com/topic/3050-how-to-make-the-player-do-small-medium-long-jumps/
            if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.jumpCounter = 1;
                this.player.setVelocityY(this.jumpSpeed);
                //console.log("low jump");
            } else if (this.cursors.space.isDown && this.jumpCounter != 0) {
                if(this.jumpCounter > 10) {
                    this.jumpCounter = 0;
                } else {
                    ++this.jumpCounter;
                    this.player.setVelocityY(this.jumpSpeed);
                    //console.log("high jump");
                }
            } else if (this.jumpCounter != 0) {
                this.jumpCounter = 0;
            }

            //basic jump code
            // if (this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            //     this.player.body.setVelocityY(this.jumpSpeed);
            // }
            
            //update score
            this.curScore.text = ++this.score;

        } else {
            this.player.anims.play('jump');
            this.player.setRotation(-1);

            //update high Score
            if(this.score >= game.settings.highScore) {
                game.settings.highScore = this.score;
                this.hiScore.text = "High Score: " + game.settings.highScore;
            }

            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.scene.restart();
                game.settings.gameOver = false;
            }
        }
    }

    obstacleCollision(p, ob)
    {
        //set game over to true
        game.settings.gameOver = true;

        //making game over text visisble
        this.gameOverText.alpha = 1;
        this.restart.alpha = 1;
        this.hiScore.alpha = 1;

        //stop the difficulty timer
        this.difficultyTimer.destroy();

        //local storage setting hiScore
        //Inspired by Nathan Altice's code https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/GameOver.js
        localStorage.setItem("hiScore", game.settings.highScore.toString());
    }

    addDesk() {
        let desk = new Desk(this, this.deskSpeed, Phaser.Math.Between(1,2));
        this.desks.add(desk);
    }

    increaseDifficulty() {
        //capping deskSpeed @ deskSpeedMax
        if(this.deskSpeed >= this.deskSpeedMax) {
            //increase deskSpeed
            this.deskSpeed -= 25;
            //console.log("Speed: " + this.deskSpeed);

            //increase music speed


            //increase sprite walking speed
            this.player.anims.setTimeScale(this.n);
            this.n += 0.3;

            //increase foreground speed
            ++this.foregroundSpeed;

            //increase background speed
            ++this.backgroundSpeed;
        }
    }
}