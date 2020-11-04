import SoundManager from "../managers/SoundManager";

class FinalTable extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;
    private soundManager: SoundManager;

    constructor(game:Phaser.Scene, x:number, y:number) {
        super(game, x, y, 'final-table');

        this.game = game;
        this.soundManager = new SoundManager(game);

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setImmovable(true);
        // @ts-ignore
        this.body.setAllowGravity(false);
    }

    finish() {
        this.soundManager.play('finish');
    }
}

export default FinalTable;