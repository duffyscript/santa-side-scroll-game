const COUNT_STARS_TO_LIVE = 40;
export const LIVES_TO_START = 3;

class IndicatorsManager {

    private game: Phaser.Scene;
    livesNumber: number;
    score: number;
    private scoreElement: Phaser.GameObjects.Text | null;
    countLive: Phaser.GameObjects.Text | null;
    countStars: number;
    private countStarsElement: Phaser.GameObjects.Text|null;
    keyCollected: boolean;

    constructor(game:Phaser.Scene) {
        this.game = game;

        // states
        this.livesNumber = 3;
        this.score = 0;
        this.scoreElement = null;
        this.countLive = null;
        this.countStars = 0;
        this.countStarsElement = null;
        this.keyCollected = false;
    }

    changeScore(plusNumber:number) {
        this.score += plusNumber;
        this.scoreElement.setText(this.score.toString());
        this.scorePosition();
    }

    showScore() {
        this.scoreElement = this.game.add.text(16, 16, this.score.toString(), { fontSize: '26px', fill: '#fff', align: 'right' });
        this.scorePosition();
        // @ts-ignore
        this.scoreElement.fixedToCamera = true;
        this.scoreElement.setScrollFactor(0);
    }

    scorePosition() {
        this.scoreElement.x = 1024 - 22 - (this.scoreElement.width);
    }

    showLives() {
        const liveIndicator = this.game.add.sprite(30, 30, 'santa');
        liveIndicator.setScale(.2);
        // @ts-ignore
        liveIndicator.fixedToCamera = true;
        liveIndicator.setScrollFactor(0);

        this.countLive = this.game.add.text(50, 18, this.livesNumber.toString(), { fontSize: '26px', fill: '#fff' });
        // @ts-ignore
        this.countLive.fixedToCamera = true;
        this.countLive.setScrollFactor(0);
    }

    showStars() {
        const starIndicator = this.game.add.sprite(100, 30, 'star');
        starIndicator.setScale(.5);
        // @ts-ignore
        starIndicator.fixedToCamera = true;
        starIndicator.setScrollFactor(0);

        this.countStarsElement = this.game.add.text(120, 18, this.countStars.toString(), { fontSize: '26px', fill: '#fff' });
        // @ts-ignore
        this.countStarsElement.fixedToCamera = true;
        this.countStarsElement.setScrollFactor(0);
    }

    addStar() {
        this.countStars++;
        this.countStarsElement.setText(this.countStars.toString());
    }

    showKey() {
        const keyIndicator = this.game.add.sprite(30, 640 - 30, 'key');
        keyIndicator.setScale(.5);
        // @ts-ignore
        keyIndicator.fixedToCamera = true;
        keyIndicator.setScrollFactor(0);
    }

    checkCountStars() {
        if (this.countStars === COUNT_STARS_TO_LIVE) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.countStars = 0;
                    this.countStarsElement.setText(this.countStars.toString());
                    this.livesNumber++;
                    this.countLive.setText(this.livesNumber.toString());

                    resolve(true);
                }, 1000);
            });
        }

        return false;
    }
}

export default IndicatorsManager;