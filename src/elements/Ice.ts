class Ice extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;

    constructor(game:Phaser.Scene, x:number, y:number) {
        super(game, x, y, 'ice');

        this.game = game;

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setImmovable(true);
        // @ts-ignore
        this.body.setAllowGravity(false);
    }
}

export default Ice;