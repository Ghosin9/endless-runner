class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    create() {
        //https://stackoverflow.com/questions/50988219/pause-and-resume-game-in-phaser-3
        
        //load pause image
        this.pauseImage = this.add.image(0, 0, "pauseScreen").setOrigin(0);
        //this.escButton = this.add.image(game.config.width/2, 400, "escButton");

        //unpause key
        this.keyUnpause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyUnpause)) {
            game.scene.resume("playScene");
            game.scene.stop("pauseScene");
        }
    }
}