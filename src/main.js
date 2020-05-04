/*
Collaborators: Windows XP Sound Error- Ly Phung, Mia Kennedy, Vivian Pham 
Game Title: 9to5, An Endless Quitter
5/3/20
CMPM 120/ARTG 120
Creative Tilt:
Does your game do something technically interesting? Are you particularly proud of a programming technique you implemented? 
Did you look beyond the class examples and learn how to do something new? (5)

Our endless runner implements horizontal movement, as well as vertical movement, which most endless runners do not. 
We are definitely proud of our game and with the way it plays. The programming techniques we used really helped to organize our 
game and divide out tasks to fit our individual strengths and weaknesses. A few things that we learned how to implement: 
variable height jumps, camera fade outs, scaling difficulty, random generation, local browser storage, physics colliders, 
custom hitboxes and texture atlas animation. 


Does your game have a great visual style? Does it use music or art that you created? 
Are you trying something new or clever with the endless runner form? (5)

The game has a cohesive and polished visual style that evolved throughout our development. All music, art, and sound 
effects were originally created within our team. The music created is meant to emphasize the overall feel of the game; 
and was created to incorporate aspects of an office environment, as well as bring through the theme of an unsatisfied worker 
wanting to escape their corporate job and lifestyle. With the help of sound effects to fully emerge the player into the 
world of the game during play. The art was created with an intention to show how constantly being in a mundane corporate setting 
can blind someone from noticing the potential and possibilities of being in a stress free environment of the outside world. 
Implementing storyline cutscenes (opening of the game), an alternate running mode (a faster “box” mode), and obstacles with 
various difficulties (ex: coworkers speech bubbles, paper-balls in the box mode) are some features in our game that we feel exceeds 
the common elements seen in an endless runner. We wanted to break away from your simple jump and dodge endless runner game, and 
elevate it to something that is more complex but yet still simple. From introducing a strong narrative to implementing unique 
elements, we feel that these incorperations would help strengthen our game’s aesthetic while keeping it in a compact and easy 
to grasp form, as most endless runners are.
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