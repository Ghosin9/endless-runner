class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "assets/";

        //menu assets

        //gameplay assets
        this.load.image("bird", "bird.png");
        this.load.image("dirt", "dirt.png");
        this.load.image("background", "spongebob.png");
        this.load.image("net", "volleyball.png");
    }

    create() {
        this.scene.start("playScene");
    }
}