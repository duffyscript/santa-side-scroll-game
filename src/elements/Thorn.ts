class Thorn extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;

    constructor(game:Phaser.Scene, x:number, y:number, direction:string = 'up') {
        super(game, x, y, 'thorn-' + direction);

        this.game = game;

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setImmovable(true);
        // @ts-ignore
        this.body.setAllowGravity(false);
    }
}

export default Thorn;