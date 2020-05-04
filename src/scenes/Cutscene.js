class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutScene");
    }

    create() {
        this.cutscene = this.add.tileSprite(0, 0, 13500, game.config.height, "cutscene").setOrigin(0);

        this.atSmashing = false;
        this.counter = 1;
        this.cameraAngle = 1536;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerup', function () {
            game.scene.stop("cutScene");
            game.scene.start("menuScene");
        }, this);

        this.cameras.main.once("camerafadeoutcomplete", () => {
            game.scene.stop("cutScene");
            game.scene.start("menuScene");
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.updateCounter();
            },
            callbackScope: this,
            repeat: 8,
        });
    }

    update() {
        //let pointer = this.input.activePointer;

        if(Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            game.scene.stop("cutScene");
            game.scene.start("menuScene");
        }

        if(this.counter == 9 && !this.atSmashing) {
            this.atSmashing = true;

            this.cutSceneSwitch();
        }
    }

    updateCounter() {
        if (!this.atSmashing){
            ++this.counter;

            this.cameras.main.pan(this.cameraAngle, 256, 200);

            this.cameraAngle += 1024;
        }
    }

    cutSceneSwitch() {

        this.sound.play("smash");

        this.time.addEvent({
            delay: 200,
            callback: () => {
                this.cutscene.tilePositionX += 1024;
            },
            callbackScope: this,
            repeat: 3,
        });

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.cameras.main.fadeOut(1000);
            },
            callbackScope: this,
        });
    }
}