// import Phaser from "phaser";

import IntroductionScene from "./scenes/IntroductionScene";
import Level1Scene from "./scenes/Level1Scene";
import Level2Scene from "./scenes/Level2Scene";
import GameOverScene from "./scenes/GameOverScene";
import CongratulationScene from "./scenes/CongratulationScene";

var config:Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 640,
    // pixelArt: true,
    // zoom: 0.9,
    resolution: 2,
    // mode: Phaser.Scale.ScaleModes.FIT,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            // debug: true
        }
    },
    scene: [IntroductionScene, Level1Scene, Level2Scene, GameOverScene, CongratulationScene]
    // scene: [Level2Scene, GameOverScene, CongratulationScene, IntroductionScene, Level1Scene]
};

new Phaser.Game(config);
