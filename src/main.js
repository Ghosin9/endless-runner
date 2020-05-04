/*
Collaborators: Windows XP Sound Error- Ly Phung, Mia Kennedy, Vivian Pham 
Game Title: 9to5, An Endless Quitter
5/3/20
CMPM 120/ARTG 120
Creative Tilt:
Does your game do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (5)
Does your game have a great visual style? Does it use music or art that you created? Are you trying something new or clever with the endless runner form? (5)



*/

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
            //debug: true,
            gravity: {
                x: 0,
                y: 2500,
            }
        }
    },

    scene: [Load, Cutscene, Menu, Instruction, Play, Pause, GameOver],
};

let game = new Phaser.Game(config);

game.settings = {
    gameOver: false,
    highScore: 0,

    tileOffset: 100,
    textOffset: 64,
}