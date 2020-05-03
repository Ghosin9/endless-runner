class Instruction extends Phaser.Scene {
    constructor() {
        super("instructionScene");
    }

    create() {
        this.add.image(0, 0, "instructionScreen").setOrigin(0);

        console.log("instruction screen");

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            game.scene.start("menuScene");
            game.scene.stop("instructionScene");
        }
    }
}