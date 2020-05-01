class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "assets/";

        //menu assets

        //gameplay assets
        this.load.atlas("player", "player.png", "player.json");

        this.load.atlas("objects", "objects.png", "objects.json");
        this.load.atlas("papers", "paper.png", "paper.json");

        this.load.atlas("enemies", "enemy.png", "enemy.json");

        //background, floor and foreground
        this.load.image("foreground", "foreground.png");
        this.load.image("floor", "foreground_floor.png");
        this.load.image("background", "background.png");

        //menu stuff
        this.load.image("score", "score.png");
        this.load.image("esc", "esc.png");
        this.load.image("pause", "pause.png");

        //sound assets
        this.load.path = "assets/sound/";

        this.load.audio("music", "GamePlay.wav");
        this.load.audio("jump1", "sfx_jump_1.wav");
        this.load.audio("jump2", "sfx_jump_2.wav");
        this.load.audio("paperCrumble1", "sfx_crumpled_paper_1.wav");
        this.load.audio("paperCrumble2", "sfx_crumpled_paper_2.wav");
        this.load.audio("paperHit", "sfx_paper_hit.wav");
        this.load.audio("plantHit", "sfx_plant_hit.wav");
        this.load.audio("select", "sfx_select.wav");
        this.load.audio("suitcaseJump", "sfx_suitcase_jump.wav");
        this.load.audio("deskHit", "sfx_desk_hit.wav");
    }

    create() {
        this.scene.start("playScene");
    }
}