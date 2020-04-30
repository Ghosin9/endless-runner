class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "assets/";

        //menu assets

        //gameplay assets
        this.load.atlas("player", "player.png", "player.json");

        //object assets
        this.load.atlas("objects", "objects.png", "objects.json");

        //background, floor and foreground
        this.load.image("foreground", "foreground.png");
        this.load.image("floor", "foreground_floor.png");
        this.load.image("background", "background.png");

        //score backgorund
        this.load.image("score", "score.png");

        //sound assets
        this.load.path = "assets/sound/";
        this.load.audio("jump", "jump.wav");
        this.load.audio("paperCrumble", "PaperCrumble.wav");
        this.load.audio("paperHit", "PaperHit.wav");
        this.load.audio("plantHit", "PlantCrash.wav");
        this.load.audio("staple", "Stapler.wav");
        this.load.audio("suitcaseJump", "SuitcaseJump.wav");
        this.load.audio("deskHit", "TableHit.wav");
    }

    create() {
        this.scene.start("playScene");
    }
}