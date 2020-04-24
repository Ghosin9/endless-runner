class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //physics
        this.physics.world.gravity.y = 2600;
        this.speed = 300;
        this.jumpSpeed = -1000;
        this.tileOffset = 100;
        this.backgroundSpeed = 4;
        this.score = 0;

        //add tileSprite background
        this.spongebob = this.add.tileSprite(0, 0, game.config.width, game.config.height, "background").setOrigin(0);

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
        this.gameOverText = this.add.text(game.config.width/2, game.config.height/2 - 64, "GAME OVER", gameText).setOrigin(0.5);
        this.restart = this.add.text(game.config.width/2, game.config.height/2, "Press SPACE to Restart", gameText).setOrigin(0.5);
        this.gameOverText.alpha = 0;
        this.restart.alpha = 0;

        //score text
        let scoreText = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFF00',
            color: "#000000",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.curScore = this.add.text(this.tileOffset/2, this.tileOffset/2, this.score, scoreText).setOrigin(0);
        this.curhighScore = this.add.text(game.config.width - this.tileOffset*3, this.tileOffset/2, "High Score: " + game.settings.highScore, scoreText).setOrigin(0);

        //making ground tiles
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += this.tileOffset) {
            let groundTile = this.physics.add.sprite(i, game.config.height - this.tileOffset, "dirt").setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }
        
        //set up obstacles
        this.obstacles = this.add.group();
        this.net = this.physics.add.sprite(game.config.width, game.config.height - this.tileOffset*2, "net").setOrigin(0);
        this.net.body.immovable = true;
        this.net.body.allowGravity = false;
        this.obstacles.add(this.net);

        //set up player
        this.bird = this.physics.add.sprite(game.config.width/6, game.config.height - this.tileOffset-60, "bird");
        this.bird.setCollideWorldBounds(true);

        //add physics colliders
        this.physics.add.collider(this.bird, this.ground);

        //set up phaser provided keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(!game.settings.gameOver) {
            //scrolling background
            this.spongebob.tilePositionX += this.backgroundSpeed;
            this.net.x -= 8

            //check collision between net and bird
            this.physics.collide(this.bird, this.obstacles, this.obstacleCollision);

            // //left right mechanics
            // if(this.cursors.left.isDown) {
            //     this.bird.setVelocityX(-this.speed);
            //     this.bird.setFlip(true, false);
            //     //play walking animation
            // } else if(this.cursors.right.isDown) {
            //     this.bird.setVelocityX(this.speed);
            //     this.bird.resetFlip();
            //     //play walking animation
            // } else {
            //     this.bird.body.velocity.x = 0;
            //     //play idle animation
            // }

            if(this.bird.body.touching.down) {
                //play walking animations
            } else {
                //play jumping animation
            }

            //actual jump
            if(this.bird.body.touching.down && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                this.bird.body.setVelocityY(this.jumpSpeed);
            }

            //wrap around for net  
            if (this.net.x <= 0 - this.net.width)
                this.net.x = game.config.width;
            
            //update score
            this.curScore.text = ++this.score;

            //update highScore
            if(this.score >= game.settings.highScore)
                game.settings.highScore = this.score;

            this.curhighScore.text = "High Score: " + game.settings.highScore;
        } else {
            this.gameOverText.alpha = 1;
            this.restart.alpha = 1;

            if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.scene.restart();
                game.settings.gameOver = false;
            }
        }
    }

    obstacleCollision(p, ob)
    {
        game.settings.gameOver = true;
    }
}