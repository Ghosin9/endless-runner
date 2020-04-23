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
    width: 840,
    height: 525,

    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0,
            }
        }
    },

    scene: [Load, Menu, Play],
};

let game = new Phaser.Game(config);

game.settings = {
    gameOver: false,
}