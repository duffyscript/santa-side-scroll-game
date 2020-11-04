import Phaser from "phaser";

class SoundManager {
    private game: Phaser.Scene;
    private gameAudio: Phaser.Sound.BaseSound;
    private sound: Phaser.Sound.BaseSound;

    constructor(game: Phaser.Scene) {
        this.game = game;

        // Sounds
        this.sound = null;
        this.gameAudio = null;
    }

    preload() {
        this.game.load.audio('collect', 'assets/sounds/collect.wav');
        this.game.load.audio('game', 'assets/sounds/jingle-bells.mp3');
        this.game.load.audio('finish', 'assets/sounds/finish.wav');
        this.game.load.audio('new-live', 'assets/sounds/new-live.wav');
    }

    playAudio() {
        this.gameAudio = this.game.sound.add('game', {
            loop: true
        });
        this.gameAudio.play();
    }

    stopAudio() {
        if (this.gameAudio) {
            this.gameAudio.stop();
        }
    }

    play(name: string) {
        this.sound = this.game.sound.add(name);
        this.sound.play();
    }

    stop() {
        if (this.sound) {
            this.sound.stop();
            this.sound = null;
        }
    }
}

export default SoundManager;