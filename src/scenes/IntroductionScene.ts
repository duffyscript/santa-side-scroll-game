export default class IntroductionScene extends Phaser.Scene {

    constructor () {
        super('introduction-scene')
    }

    preload () {
        this.load.image('sky', 'assets/bg1.png');
        this.load.image('control', 'assets/control.png');

        this.load.spritesheet('santa',
            'assets/elements/santa.png',
            { frameWidth: 200, frameHeight: 146}
        );
    }

    create () {
        let { width, height } = this.sys.game.canvas;

        this.add.image(width / 2, height / 2, 'sky');
        this.add.text((width / 2) - 300, height / 2 - 200, 'Santa side scroll', { fontSize: '64px', fill: '#fff' });
        this.add.sprite((width / 2) , 297, 'santa');
        let button = this.add.rectangle(512, 420, 300, 100);
        button.setStrokeStyle( 4, 0xffffff);
        button.setInteractive();
        let buttonText = this.add.text(450, 398, 'START', { fontSize: '42px', fill: '#fff' });
        this.add.image(width / 2, height - 60, 'control');

        button.on('pointerdown', () => this.scene.start('level1-scene'));
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