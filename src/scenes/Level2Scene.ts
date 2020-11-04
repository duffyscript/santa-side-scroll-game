import LevelManager from "../managers/LevelManager";
import {levelInitType} from "../types";
import GreenFlyMonster from "../elements/GreenFlyMonster";
import Chest from "../elements/Chest";

export default class Level2Scene extends Phaser.Scene {

    private levelManager: LevelManager;

    constructor () {
        super('level2-scene');
        this.levelManager = new LevelManager(this);
    }

    init({score, livesNumber, keyCollected, countStars}:levelInitType) {
        if (!score || !livesNumber || !keyCollected) {
            return;
        }

        this.levelManager.indicatorsManager.score = score;
        this.levelManager.indicatorsManager.livesNumber = livesNumber;
        this.levelManager.indicatorsManager.countStars = countStars;
        this.levelManager.indicatorsManager.keyCollected = keyCollected;
    }

    preload () {
        this.levelManager.preload();
        this.load.image('sky', 'assets/bg-level2.png');
        this.load.image('ground', 'assets/map/ground1.png');
        this.load.image('ground-level2', 'assets/map/ground-level2.png');
    }

    create () {
        let { width, height } = this.sys.game.canvas;

        // Background
        this.add.image((width * 4) / 2, height / 2, 'sky');

        // Groups
        let platforms = this.physics.add.staticGroup();
        platforms.create(120, 500, 'ground');
        platforms.create(400 + 3695 / 2, height - 240 / 2, 'ground-level2');

        // Enemies
        let chest = new Chest(this, width * 4 - 400, 350, this.levelManager.indicatorsManager.keyCollected);

        this.levelManager = Object.assign(this.levelManager, {
            platforms,
            chest
        });

        // Level init
        this.levelManager.startLevel({
            mapWidth: width * 4,
            mapHeight: height,
            startX: 100,
            startY: 300,
            finishX: width * 4 - 200,
            finishY: 376,
            nextLevel: 'congratulation-scene'
        });
    }

    update() {
        if (this.levelManager.enemies) {
            this.destroyEnemies();
        }

        if (this.levelManager.player?.body?.x > 600 && this.levelManager.enemies?.length < 2) {
            this.createEnemies();
        }

        this.levelManager.update();
    }

    createEnemies() {
        if (this.levelManager.enemies.length === 0 || this.levelManager.enemies[0].body.x < this.cameras.main.worldView.x + 1024 / 2) {
            let startPosX = this.levelManager.player.body.x + 1024 / 2 + 100;
            let endPosX = this.levelManager.player.body.x - 1024 / 2 - 100;
            let enemy = new GreenFlyMonster(this, startPosX - 1, 340, {x: {from: endPosX, to: startPosX}});
            this.levelManager.enemies.push(enemy);
        }
    }

    destroyEnemies() {
        this.levelManager.enemies.map((enemy, index) => {
            if (enemy.body && enemy.body.x < this.cameras.main.worldView.x || enemy.death) {
                enemy.destroy();
                this.levelManager.enemies.splice(index, 1);
            }
        });
    }
}