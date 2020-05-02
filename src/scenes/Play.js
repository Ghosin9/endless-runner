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
        this.collectTimer = Phaser.Math.Between(10, 14); //10, 14

        //box mode
        this.boxMode = false;
        this.boxModeSpeed = 300;
        this.boxModeDif = 4;

        this.boxHitBox = this.physics.add.sprite(0, 0);
        this.boxHitBox.body.setSize(50, 50);
        this.boxHitBox.body.allowGravity = false;
        this.boxHitBox.body.immovable = true;
        this.boxHitBox.setCollideWorldBounds(true);

        //paper speed
        this.paperSpeed = this.obSpeed;
        this.paperSpeedMax = -1400;
        this.numPaper = 1;

        //workers
        this.workerSpeed = -300;
        this.workerDif = Phaser.Math.Between(7, 11); //7, 11
        this.blahSpeed = 450;

        //jumps
        this.jumpSpeed = -700;
        this.jumpCounter = 0;
        this.fallSpeed = 600;

        //obstacle speed
        this.obSpeed = -400;
        this.obSpeedMax = -1000;

        //ceiling difficulty
        this.ceilingDif = Phaser.Math.Between(3,5); //3, 5

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

        //pause button
        this.add.image(200, game.settings.textOffset/2, "pauseButton").setScale(0.5).setOrigin(0);

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

        this.anims.create({
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

        //boxmode
        this.anims.create({
            key: "playerbox",
            frames: this.anims.generateFrameNames("player", {
                prefix: "p_slide_",
                start: 1,
                end: 2,
            }),
            frameRate: 3,
        });

        //set up phaser provided keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        //pause key
        this.keyPause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //increase difficulty every 5 seconds
        this.difficultyTimer = this.time.addEvent({
            delay: 5000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true,
        });

        //play background music looping
        let musicConfig = {
            volume: 0.05,
            loop: true,
        }

        this.sound.play("music", musicConfig);
    }

    update() {
        if(!game.settings.gameOver) {

            //BOTH MODES ---------------------------------------------------------------------------------------------------- BOTH MODES
            //scrolling background
            this.background.tilePositionX += this.backgroundSpeed;
            //scrolling foreground
            this.foreground.tilePositionX += this.foregroundSpeed;
            //update score
            this.curScore.text = ++this.score;

            if(Phaser.Input.Keyboard.JustDown(this.keyPause)) {
                game.scene.pause("playScene");
                game.scene.start("pauseScene");
            }

            //if not in box mode-------------------------------------------------------------------------------------------------- REGULAR MODE
            if(!this.boxMode){
                //console.log("X: " + this.player.x);
                //console.log("Y: " + this.player.y);

                //add physics colliders
                //ground
                this.physics.collide(this.player, this.ground);
                //obstacle
                this.physics.collide(this.player, this.obstacles, this.obstacleCollision, null, this);
                //collectable
                this.physics.overlap(this.player, this.collectables, this.collectableCollision, null, this);

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
                if(this.player.body.touching.down && (Phaser.Input.Keyboard.JustDown(this.cursors.up) 
                    || Phaser.Input.Keyboard.JustDown(this.cursors.space))) {
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
                if(this.player.y >= 365) {
                    //if player is near ground, set to standing hitbox
                    this.player.body.setSize(40, 115, true);
                } else {
                    this.player.body.setSize(40, 95, false);
                    this.player.body.setOffset(20, 0);
                }

                //if player presses down while in air, jump down
                if(!this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                        this.player.setVelocityY(this.fallSpeed);
                }

                if(this.player.y >= 425)
                    this.player.y = 400;
                
            } else { //if in box mode ----------------------------------------------------------------------------------------- BOX MODE

                if(this.player.x >= 120) {
                    //console.log("moving to box position");
                    //move player to back of window
                    this.physics.moveTo(this.player, 110, game.config.height/2, this.boxModeSpeed*2);
                } else {
                    this.player.setVelocityX(0);
                    //move extra hitbox to player
                    this.boxHitBox.x = this.player.x;
                    this.boxHitBox.y = this.player.y;
                }

                //console.log("X: " + this.player.x);
                //console.log("Y: " + this.player.y);

                //adjust hitboxes
                this.player.body.setSize(40, 45, false);
                this.player.body.setOffset(15, 20);
                this.boxHitBox.body.setSize(64, 43, false);
                this.boxHitBox.body.setOffset(-16, 25);

                //player animation
                this.player.anims.play("playerbox", true);

                //paper collisions
                this.physics.overlap(this.player, this.papers, this.paperCollision, null, this);
                this.physics.overlap(this.boxHitBox, this.papers, this.paperCollision, null, this);
                //lock hitboxes together
                this.physics.collide(this.player, this.boxHitBox);

                //up down code
                if(this.cursors.up.isDown) {
                    this.player.setVelocityY(-this.boxModeSpeed);
                    this.boxHitBox.setVelocityY(-this.boxModeSpeed);
                } else if (this.cursors.down.isDown) {
                    this.player.setVelocityY(this.boxModeSpeed);
                    this.boxHitBox.setVelocityY(this.boxModeSpeed);
                } else {
                    this.player.setVelocityY(0);
                    this.boxHitBox.setVelocityY(0);
                }
            }
        } else {
            this.player.anims.play('jump');
            this.player.setRotation(-1);
        }
    }

    obstacleCollision(p, ob)
    {
        if(!this.boxMode) {
            this.sound.removeByKey("music");
            //play collision sound
            if(ob.num <= 2){
                this.sound.play("deskHit");
            } else if (ob.num == 3) {
                this.sound.play("suitcaseJump");
            } else if (ob.num == 4) {
                this.sound.play("plantHit");
            } else if (ob.num == 5) {
                this.sound.play("deskHit");
            } else { //num == 6
                this.sound.play("plantHit");
            }

            //slide off death animation
            p.setTint("0xFF0000");
            p.body.setVelocityX(100);
            p.body.setBounce(0.7, 0.7);
            p.body.setDragX(100);

            game.settings.gameOver = true;
            this.time.addEvent({
                delay: 2000,
                callback: this.gameOver,
                callbackScope: this,
            });
        } else {
            this.paperCollision(p, ob);
        }
    }

    paperCollision(p, paper) {
        //console.log("paper collision");
        this.sound.play("paperHit");

        this.boxMode = false;

        //clear papers list
        this.papers.clear(true, true);

        //clear obstacles list
        this.obstacles.clear(true, true);

        //reset physics back to reg mode
        this.physics.world.gravity.y = 2500;
        this.foregroundSpeed = this.tempForeground;
        this.backgroundSpeed = this.tempBackground;

        //move hitboxes
        this.boxHitBox.setPosition(0, 0);

        this.time.addEvent({
             delay: 1000,
             callback: this.addObstacle,
             callbackScope: this,
        });
    }

    collectableCollision() {
        this.boxMode = true;

        this.physics.moveTo(this.player, 100, game.config.height/2, this.boxModeSpeed);

        //clear all obstacles
        this.obstacles.clear(true, true);
        //clear collectables
        this.collectables.clear(true, true);

        //physics
        this.physics.world.gravity.y = 0
        this.paperSpeed = this.obSpeed;

        //save foreground and background speeds
        this.tempForeground = this.foregroundSpeed;
        this.tempBackground = this.backgroundSpeed;

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                //this.addObstacle();
                this.addCeiling();
            },
            callbackScope: this,
        });
    }

    addObstacle() {
        this.randomOb = Phaser.Math.Between(1,4)
        let ob = new Obstacle(this, this.obSpeed, this.randomOb);
        this.obstacles.add(ob);
    }

    addCeiling() {
        this.randomC = Phaser.Math.Between(5,6)
        let ob = new Obstacle(this, this.obSpeed, this.randomC);
        this.obstacles.add(ob);
    }

    addPaper() {
        this.randomPaper = Phaser.Math.Between(1,4);

        let warnPaper;
        let y = this.player.y;
        if(this.randomPaper == 1){
            warnPaper = this.add.sprite(game.config.width-40, y, "papers", "paper_a_1");
        } else if(this.randomPaper == 2){
            warnPaper = this.add.sprite(game.config.width-40, y, "papers", "paper_b_1");
        } else if(this.randomPaper == 3){
            warnPaper = this.add.sprite(game.config.width-40, y, "papers", "paper_c_1");
        } else {
            warnPaper = this.add.sprite(game.config.width-40, y, "papers", "paper_d_1");
        }

        //sound effects
        this.sound.play("paperCrumble2");

        this.time.addEvent({
            delay: 500,
            callback: () => {
                warnPaper.destroy(); 
                this.spawnPaper(y, this.randomPaper);
            },
            callbackScope: this,
        });
    }

    spawnPaper(y, num){
        if(this.boxMode) {
            this.sound.play("paperCrumble1");
            let paper = new Paper(this, y, this.paperSpeed, num);
            this.papers.add(paper);
        }
    }

    addCollectable() {
        //make sure collectable is not inside of an obstacle
        //doesn't matter because collectable will be moving at 1/2 speed

        let collect = new Collectable(this, this.obSpeed/2);
        this.collectables.add(collect);
    }

    addWorker() {
        let worker = new Worker(this, this.workerSpeed, this.blahSpeed, Phaser.Math.Between(1,2));
    }

    increaseDifficulty() {
        ++this.level;
        console.log("level: " + this.level);

        if(this.level%this.ceilingDif == 0 ){
            this.addCeiling();
        }

        if(!this.boxMode){
            if(this.level%this.workerDif == 0) {
                this.addWorker();
            }

            //capping deskSpeed @ deskSpeedMax
            if(this.obSpeed >= this.obSpeedMax) {
                //increase deskSpeed
                this.obSpeed -= 25;
                //console.log("Speed: " + this.deskSpeed);

                //increase sprite walking speed
                this.player.anims.setTimeScale(this.n);
                this.n += 0.3;

                //increase foreground speed
                ++this.foregroundSpeed;

                //increase background speed
                ++this.backgroundSpeed;
            }

            if(this.level%this.collectTimer == 0){
                this.addCollectable();
            }
        } else { //if in box mode
            if(this.level%2 == 0) {
                this.addWorker();
            }

            if(this.paperSpeed >= this.paperSpeedMax) {
                this.paperSpeed -= 50;

                ++this.foregroundSpeed;
                ++this.backgroundSpeed;
            }

            //spawn lots of paper!
            this.time.addEvent({
                delay: 400,
                repeat: this.numPaper,
                callback: () => {
                    this.addPaper();
                },
                callbackScope: this,
            });

            //increase the amount of paper spawned every level
            this.numPaper = Math.floor(this.level/this.boxModeDif);
        }
    }

    gameOver() {
        //update high Score
        if(this.score >= game.settings.highScore) {
            game.settings.highScore = this.score;
        }

        //stop the difficulty timer
        this.difficultyTimer.destroy();

        //local storage setting hiScore
        //Inspired by Nathan Altice's code https://github.com/nathanaltice/PaddleParkourP3/blob/master/src/scenes/GameOver.js
        localStorage.setItem("hiScore", game.settings.highScore.toString());

        game.scene.start("gameOverScene");
    }
}