class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "assets/";

        //menu assets

        //gameplay assets
        this.load.atlas("player", "player.png", "player.json");

        this.load.image("foreground", "foreground.png");
        this.load.image("floor", "foreground_floor.png");
        this.load.image("background", "background.png");

        this.load.atlas("objects", "objects.png", "objects.json");

        this.load.image("score", "score.png");
    }

    create() {
        this.scene.start("playScene");
    }
}