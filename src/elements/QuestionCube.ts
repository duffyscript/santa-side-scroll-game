import SoundManager from "../managers/SoundManager";
import {PositionType} from "../types";

const STARS_IN_CUBE = 5;

class QuestionCube extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;
    private soundManager: SoundManager;
    private stars: number;
    private position: PositionType;

    constructor(game:Phaser.Scene, x:number, y:number) {
        super(game, x, y, 'question-square');

        this.game = game;
        this.soundManager = new SoundManager(game);

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setImmovable(true);
        // @ts-ignore
        this.body.setAllowGravity(false);

        // states
        this.stars = STARS_IN_CUBE;
        this.position = {
            x,
            y
        }
    }

    collectStars() {
        this.stars--;
        let star = this.game.physics.add.image(this.position.x, this.position.y, 'star');
        this.soundManager.play('collect');

        setInterval(() => star.destroy(), 200);

        if (this.stars === 0) {
            this.destroy();
        }
    }
}

export default QuestionCube;