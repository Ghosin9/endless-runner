class Collectable extends Phaser.GameObjects.Sprite {
    constructor(scene, speed) {
        super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*1.5, 
            game.config.height-game.settings.tileOffset/2), "objects");

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        
    }
}