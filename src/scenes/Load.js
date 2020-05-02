class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.path = "assets/";

        //menu assets
        this.load.image("gameOver", "gameOver.png");
        this.load.image("pauseScreen", "pausebg.png");
        this.load.image("mainMenu", "menu.png");
        this.load.image("score", "score.png");
        this.load.image("escButton", "esc.png");
        this.load.image("pauseButton", "pause.png");

        //cutscene
        this.load.image("cutscene", "cutscene/cutscene_combined.png");

        //gameplay assets
        this.load.atlas("player", "player.png", "player.json");
        this.load.atlas("objects", "objects.png", "objects.json");
        this.load.atlas("papers", "paper.png", "paper.json");

        this.load.atlas("enemies", "enemy.png", "enemy.json");

        //background, floor and foreground
        this.load.image("foreground", "foreground.png");
        this.load.image("floor", "foreground_floor.png");
        this.load.image("sky", "background_1.png");
        this.load.image("city", "background_2.png");

        //sound assets
        this.load.path = "assets/sound/";

        this.load.audio("music", "GamePlay.wav");
        this.load.audio("menuMusic", "menuMusic.wav");
        this.load.audio("jump1", "sfx_jump_1.wav");
        this.load.audio("jump2", "sfx_jump_2.wav");
        this.load.audio("paperCrumble1", "sfx_crumpled_paper_1.wav");
        this.load.audio("paperCrumble2", "sfx_crumpled_paper_2.wav");
        this.load.audio("paperHit", "sfx_paper_hit.wav");
        this.load.audio("plantHit", "sfx_plant_hit.wav");
        this.load.audio("select", "sfx_select.wav");
        this.load.audio("suitcaseJump", "sfx_suitcase_jump.wav");
        this.load.audio("deskHit", "sfx_desk_hit.wav");
        this.load.audio("smash", "smash.wav");
        this.load.audio("xp", "xpSound.mp3");

    }

    create() {
        this.sound.play("xp");

        let textConfig = {
            fontSize: "30px",
            align: "center"
        };

        this.add.text(game.config.width/4, game.config.height/2-game.settings.textOffset, "a game by", textConfig);
        this.add.text(game.config.width/4, game.config.height/2, "windows xp error sound", textConfig);
        this.add.text(game.config.width/4, game.config.height/2+game.settings.textOffset, "click anywhere to continue", textConfig);

        //from nathan alticekrejheahkjrjeareajrkaerjkeaj https://github.com/nathanaltice/AVeryCapableGame/blob/master/src/main.js
        let pointer = this.input.activePointer;
        this.input.on('pointerdown', (pointer) => {
            // start next scene and pass data
            this.scene.start("menuScene");
        });
    }
}