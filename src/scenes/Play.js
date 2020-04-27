class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //physics
        this.physics.world.gravity.y = 2600;
        this.jumpSpeed = -990;
        this.backgroundSpeed = 3;
        this.foregroundSpeed = 4;
        this.deskSpeed = -600;
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
        this.hiScore = this.add.text(game.config.width/2, game.config.height/2 + game.settings.textOffset, "HiScore: " + game.settings.gameOver, gameText).setOrigin(0.5);
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
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNames("player", {
                prefix: "p_walk_",
                start: 1,
                end: 4,
            }),
            frameRate: 5,
        });

        this.anims.create({
            key: "stand",
            defaultTextureKey: "player",
            frames: [
                {frame: "p_stand"}
            ],
            repeat: -1,
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
    }

    addDesk() {
        let desk = new Desk(this, this.deskSpeed);
        this.desks.add(desk);
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

            //actual jump
            if(this.player.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                this.player.body.setVelocityY(this.jumpSpeed);
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
        game.settings.gameOver = true;

        this.gameOverText.alpha = 1;
        this.restart.alpha = 1;
        this.hiScore.alpha = 1;

        game.settings.gameOver = true;
    }
}