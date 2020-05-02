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
        //console.log("in menu scene");
    }

    update() {
        this.cursors = this.input.keyboard.createCursorKeys();

        if(this.cursors.space.isDown) {
            this.scene.start("playScene");
            this.sound.removeByKey("menuMusic");
        }
    }
}