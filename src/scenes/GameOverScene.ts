export default class GameOverScene extends Phaser.Scene {

    constructor () {
        super('game-over-scene');
    }

    preload () {
        this.load.image('sky', 'assets/bg1.png');
    }

    create () {
        let { width, height } = this.sys.game.canvas;
        this.add.image(width / 2, height / 2, 'sky');
        this.add.text(340, height / 2 - 100, 'GAME OVER', { fontSize: '64px', fill: '#fff' });
        let button = this.add.rectangle(512, 420, 300, 100);
        button.setStrokeStyle( 4, 0xffffff);
        button.setInteractive();
        let buttonText = this.add.text(422, 398, 'RESTART', { fontSize: '42px', fill: '#fff' });

        button.on('pointerdown', () => this.scene.start('introduction-scene'));
        button.on('pointerover', () => {
            button.setFillStyle(0xffffff);
            buttonText.setFill('#3A8494');
        });
        button.on('pointerout', () => {
            button.setFillStyle(0xffffff, 0);
            buttonText.setFill('#fff');
        });
    }
}