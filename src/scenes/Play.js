class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //physics
        this.backgroundSpeed = 1;
        this.foregroundSpeed = 3;
        this.playerSpeed = 150;

        //level
        this.level = 0;
        this.collectTimer = Phaser.Math.Between(10, 15);

        //jumps
        this.jumpSpeed = -650;
        this.jumpCounter = 0;
        this.fallSpeed = 600;

        //desk speed
        this.obSpeed = -400;
        this.obSpeedMax = -1000;

        //paper speed
        this.paperSpeed = -1000;
        this.paperSpeedMax = -1400;

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
        this.obstacles = this.add.group({
            runChildUpdate: true,
        });
        this.addObstacle();

        //set up paper
        this.papers = this.add.group({
            runChildUpdate: true,
        });

        //set up collectables
        this.collectables = this.add.group({
            runChildUpdate: true,
        });

        //set up player
        this.player = this.physics.add.sprite(game.config.width/6, game.config.height - game.settings.tileOffset-60, "player", "p_stand");
        this.player.setCollideWorldBounds(true);
        //adjust hitbox
        this.player.body.setSize(40,115);

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
            this.physics.collide(this.player, this.obstacles, this.obstacleCollision, null, this);

            //left right mechanics
            if(this.cursors.left.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
            } else if(this.cursors.right.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.resetFlip();
            } else {
                this.player.setVelocityX(0);
            }

            //attempt 2 for variable jumps
            // https://www.html5gamedevs.com/topic/3050-how-to-make-the-player-do-small-medium-long-jumps/
            if(this.player.body.touching.down && (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.cursors.space))) {
                this.jumpCounter = 1;
                this.player.setVelocityY(this.jumpSpeed);

                this.randomJump = Phaser.Math.Between(1,2);
                if(this.randomJump == 1)
                    this.sound.play("jump1");
                else
                    this.sound.play("jump2");
                
                //console.log("low jump");
            } else if ((this.cursors.up.isDown || this.cursors.space.isDown) && this.jumpCounter != 0) {
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

            //play animations
            if(this.player.body.touching.down) {
                //play walking animations
                this.player.anims.play("walk" ,true);
            } else {
                //play jumping animation
                this.player.anims.play('jump');
            }

            //adjust hitbox of player if jumping
            if(this.player.y >= 380) {
                this.player.body.setSize(40, 115, true);
            } else {
                this.player.body.setSize(40, 95, false);
                this.player.body.setOffset(20, 0);
            }

            //if player presses down while in air, jump down
            if(!this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                    this.player.setVelocityY(this.fallSpeed);
            }
            
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
        //play collision sound
        if(ob.num <= 2){
            this.sound.play("deskHit");
        } else if (ob.num == 3) {
            this.sound.play("suitcaseJump");
        } else if (ob.num == 4) {
            this.sound.play("plantHit");
        }

        //slide off death animation
        this.player.body.setVelocityX(100);
        this.player.body.setBounce(0.5, 0.5);
        this.player.body.setDragX(100);

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

    addObstacle() {
        this.randomOb = Phaser.Math.Between(1,4)
        let ob = new Obstacle(this, this.obSpeed, this.randomOb);
        this.obstacles.add(ob);
    }

    addPaper() {
        let paper = new Paper(this, this.paperSpeed);
        this.papers.add(paper);
    }

    increaseDifficulty() {
        ++this.level;
        console.log("level: " + this.level);
        //capping deskSpeed @ deskSpeedMax
        if(this.obSpeed >= this.obSpeedMax) {
            //increase deskSpeed
            this.obSpeed -= 25;
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

        if(this.level>=10){

        }
    }
}