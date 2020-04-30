// Ly Phung 
// Mia Kennedy
// Vivian Pham 
// 4/20/20
// CMPM 120
// Game Title: 
// Creative Tilt:
// insert creative tilt here.

let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,

    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 2500,
            }
        }
    },

    scene: [Load, Menu, Play],
};

let game = new Phaser.Game(config);

game.settings = {
    gameOver: false,
    highScore: 0,

    tileOffset: 100,
    textOffset: 64,
}