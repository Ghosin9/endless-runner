class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutScene");
    }

    create() {
        this.cutscene = this.add.tileSprite(0, 0, 13500, game.config.height, "cutscene").setOrigin(0);

        this.atSmashing = false;
        this.counter = 1;
        this.cameraAngle = 1536;
        this.clicking = false;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerup', function () {
            this.updateCounter();
        }, this);

        this.cameras.main.once("camerafadeoutcomplete", () => {
            game.scene.stop("cutScene");
            game.scene.start("menuScene");
        });
    }

    update() {
        //let pointer = this.input.activePointer;

        if(Phaser.Input.Keyboard.JustDown(this.cursors.right) && !this.atSmashing) {
            this.updateCounter();
        }

        if(this.counter == 9 && !this.atSmashing) {
            this.atSmashing = true;

            this.cutSceneSwitch();
        }
    }

    updateCounter() {
        ++this.counter;

        this.cameras.main.pan(this.cameraAngle, 256, 200);

        this.cameraAngle += 1024;
        
        this.clicking = false;
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