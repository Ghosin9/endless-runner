class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    create() {
        //add game over screen
        this.cameras.main.fade.direction = true;
        this.cameras.alpha = 1;
        this.cameras.main.fadeIn(500, 255, 255, 255);
        this.add.image(0, 0, "gameOver").setOrigin(0);

        let textConfig = {
            fontSize: "55px",
            color: "#000000"
        };

        //add highscore text
        this.add.text(550, 233, game.settings.highScore, textConfig);

        //restart key
        this.keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //menu key
        this.keyMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        //restart
        if(Phaser.Input.Keyboard.JustDown(this.keyRestart)) {
            game.scene.stop("gameOverScene");
            game.scene.start("playScene");
            this.sound.play("select");
            game.settings.gameOver = false;
        }

        //back to menu
        if(Phaser.Input.Keyboard.JustDown(this.keyMenu)) {
            game.scene.stop("gameOverScene");
            game.scene.stop("playScene");
            game.scene.stop("instructionScene");
            game.scene.stop("cutScene");
            game.scene.start("menuScene");
            this.sound.play("select");
            game.settings.gameOver = false;
        }
    }
}