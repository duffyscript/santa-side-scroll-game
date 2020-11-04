import SoundManager from "../managers/SoundManager";

class Chest extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;
    private soundManager: SoundManager;

    constructor(game:Phaser.Scene, x:number, y:number, opened:boolean = false) {
        super(game, x, y, opened ? 'chest-open' : 'chest');

        this.game = game;
        this.soundManager = new SoundManager(game);

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        // @ts-ignore
        this.body.setAllowGravity(false);
    }

    collect() {
        this.soundManager.play('collect');
        setTimeout(() => this.destroy(), 500);
    }
}

export default Chest;