class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create() {
        this.add.image(0, 0, "mainMenu").setOrigin(0);

        //play background music looping
        let musicConfig = {
            volume: 1,
            loop: true,
        }

        this.sound.play("menuMusic", musicConfig);
        this.cursors = this.input.keyboard.createCursorKeys();
        //console.log("in menu scene");
    }

    update() {
        if(this.cursors.space.isDown) {
            game.scene.start("playScene");
            game.scene.stop("menuScene");
            this.sound.removeByKey("menuMusic");
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            game.scene.start("instructionScene");
        }
    }
}