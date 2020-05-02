class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutScene");
    }

    create() {
        this.add.image("cutscene").setOrigin(0);

        this.atSmashing = false;
        this.counter = 1;

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this,this.cursors.right) && !this.atSmashing) {
            ++this.counter;
        }

        if(this.counter == 8) {
            this.atSmashing = true;
        }
    }
}