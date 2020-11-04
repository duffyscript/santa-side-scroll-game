import SoundManager from "../managers/SoundManager";

class Key extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;
    private soundManager: SoundManager;

    constructor(game:Phaser.Scene, x:number, y:number) {
        super(game, x, y, 'key');

        this.game = game;
        this.soundManager = new SoundManager(game);

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        // @ts-ignore
        this.body.setAllowGravity(false);
        this.setAlpha(0);
    }

    collect() {
        this.setAlpha(1);
        this.soundManager.play('collect');
        setTimeout(() => this.destroy(), 500);
    }
}

export default Key;