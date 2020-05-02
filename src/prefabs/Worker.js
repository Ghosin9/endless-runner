class Worker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, speed, num) {
        if(num == 1) {
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*2, 
                game.config.height-game.settings.tileOffset), "enemy", "enemy1");

                
        } else { //num == 2
            super(scene, game.config.width+game.settings.tileOffset, Phaser.Math.Between(game.config.height-game.settings.tileOffset*2, 
                game.config.height-game.settings.tileOffset), "enemy", "enemy5");
        }
    }
}