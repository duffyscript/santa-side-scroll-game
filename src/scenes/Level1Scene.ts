import BlueMonster from "../elements/BlueMonster";
import GreenMonster from "../elements/GreenMonster";
import Thorn from "../elements/Thorn";
import LevelManager from "../managers/LevelManager";
import Ice from "../elements/Ice";
import Key from "../elements/Key";
import {LIVES_TO_START} from "../managers/IndicatorsManager";

class Level1Scene extends Phaser.Scene {

    private levelManager: LevelManager;
    private width: number;
    private height: number;
    private widthMap: number;

    constructor () {
        super('level1-scene');

        this.levelManager = new LevelManager(this);
    }

    preload () {
        this.levelManager.preload();
        this.load.image('sky', 'assets/bg-level1.png');
        this.load.image('ground', 'assets/map/ground1.png');
        this.load.image('ground2', 'assets/map/ground2.png');
        this.load.image('ground3', 'assets/map/ground3.png');
        this.load.image('ground4', 'assets/map/ground4.png');
        this.load.image('ground5', 'assets/map/ground5.png');
        this.load.image('ground6', 'assets/map/ground6.png');
        this.load.image('ground7', 'assets/map/ground7.png');
        this.load.image('ground8', 'assets/map/ground8.png');
        this.load.image('ground9', 'assets/map/ground9.png');
        this.load.image('ground10', 'assets/map/ground10.png');
        this.load.image('ground11', 'assets/map/ground11.png');
        this.load.image('ground12', 'assets/map/ground12.png');
        this.load.image('ground13', 'assets/map/ground13.png');
        this.load.image('ground14', 'assets/map/ground14.png');
        this.load.image('ground15', 'assets/map/ground15.png');
        this.load.image('ground16', 'assets/map/ground16.png');
        this.load.image('ground17', 'assets/map/ground17.png');
        this.load.image('ground18', 'assets/map/ground18.png');
        this.load.image('ground19-1', 'assets/map/ground19-1.png');
        this.load.image('ground19-2', 'assets/map/ground19-2.png');
        this.load.image('ground19-3', 'assets/map/ground19-3.png');
        this.load.image('ground19-4', 'assets/map/ground19-4.png');
        this.load.image('ground19-5', 'assets/map/ground19-5.png');
        this.load.image('tube1', 'assets/map/tube.png');
        this.load.image('tube2', 'assets/map/tube2.png');
        this.load.image('tube3', 'assets/map/tube3.png');
        this.load.image('water1', 'assets/map/water1.png');
        this.load.image('wall1', 'assets/map/wall1.png');
        this.load.image('platform1', 'assets/map/platform1.png');
        this.load.image('platform2', 'assets/map/platform2.png');
        this.load.image('platform-small', 'assets/map/platform-small.png');
        this.load.image('platform-small2', 'assets/map/platform-small2.png');
        this.load.image('ice', 'assets/map/ice.png');
        this.load.image('bushes', 'assets/elements/bushes.png');
        this.load.image('crystal', 'assets/elements/crystal.png');
        this.load.image('bg-terrain', 'assets/map/bg-terrain.png');
        this.load.image('bg-terrain2', 'assets/map/bg-terrain2.png');
        this.load.image('bg-decoration', 'assets/map/bg-decoration.png');
        this.load.image('bush1', 'assets/elements/bush1.png');
        this.load.image('bush2', 'assets/elements/bush2.png');
    }

    create () {
        this.width = this.sys.game.canvas.width;
        this.height = this.sys.game.canvas.height;
        this.widthMap = this.width * 8;

        // background elements
        this.add.image(this.widthMap / 2, this.height / 2, 'sky');
        this.add.image(1197, 304, 'tree');
        this.add.image(1389, 375, 'flower');
        this.add.image(1906, (this.height - 240 / 2), 'bushes');
        this.add.image(2217, 272, 'crystal');
        this.add.image(2697, 356, 'bg-terrain');
        this.add.image(4946, 496, 'bg-terrain2');
        this.add.image(2561, 144, 'vase');
        this.add.image(3688, 368, 'snowman');
        this.add.image(4066, 375, 'flower');
        this.add.image(6381, (this.height - 96 / 2), 'bush1');
        this.add.image(6559, (this.height - 240 / 2), 'bush2');
        this.add.image(7880, 64, 'bg-decoration');

        // watter / bg
        this.add.rectangle(676, (this.height - 144 / 2), 240, 144, 0x52A8E2);
        this.add.rectangle(5283, (this.height - 65 / 2), 387, 65, 0x52A8E2);
        this.add.rectangle(5961, (this.height - 135 / 2), 398, 135, 0x52A8E2);
        this.add.rectangle(7175, (this.height - 96 / 2), 980, 96, 0x52A8E2);

        // Groups
        let platforms = this.physics.add.staticGroup();
        platforms.create(4282, 200, 'platform-small');
        // platforms.create(4282, 150, 'platform-small');
        // platforms.create(4290, 270, 'platform-small2');
        platforms.create(120, 500, 'ground');
        platforms.create(460, 550, 'ground2');
        platforms.create(700, 300, 'ground3');
        platforms.create(1335, (this.height - 240 / 2), 'ground4');
        platforms.create(2745, (this.height - 160 / 2), 'ground5');
        platforms.create(2263, (this.height - 192 / 2), 'ground6');
        platforms.create(2619, 215, 'ground7');
        platforms.create(3806, (this.height - 240 / 2), 'ground8');
        platforms.create(4378, 234, 'ground9');
        platforms.create(4474, 42, 'ground10');
        platforms.create(4443, (this.height - 48 / 2), 'ground11');
        platforms.create(4778, (this.height - 480 / 2), 'ground12');
        platforms.create(4874, 304, 'ground13');
        platforms.create(4970, 376, 'ground14');
        platforms.create(4922, (this.height - 48 / 2), 'ground15');
        platforms.create(5042, (this.height - 96 / 2), 'ground16');
        platforms.create(5621, (this.height - 144 / 2), 'ground17');
        platforms.create(6254, (this.height - 192 / 2), 'ground18');
        platforms.create((this.widthMap - 624 / 2), 208, 'ground19-1');
        platforms.create((this.widthMap - 576 / 2), 280, 'ground19-2');
        platforms.create((this.widthMap - 144 / 2), 328, 'ground19-3');
        platforms.create((this.widthMap - 96 / 2), 424, 'ground19-4');
        platforms.create((this.widthMap - 576 / 2), (this.height - 144 / 2), 'ground19-5');
        platforms.create(1341, 352, 'wall1');
        platforms.create(1772, 295, 'platform1');
        platforms.create(2003, 166, 'platform1');
        platforms.create(2217, 321, 'platform1');
        platforms.create(6922, 334, 'platform1');
        platforms.create(2940, 292, 'brick-wall-square');
        platforms.create(4683, 472, 'brick-wall-square');
        platforms.create(4474, 352, 'brick-wall-square');
        platforms.create(4683, 216, 'brick-wall-square');
        platforms.create(3806, 266, 'wall-square');
        platforms.create(3656, 174, 'wall-square');
        platforms.create(3956, 174, 'wall-square');
        platforms.create(5189, 464, 'wall-square');
        platforms.create(5354, 464, 'wall-square');
        platforms.create(7192, 376, 'wall-square');
        platforms.create(7363, 340, 'wall-square');
        platforms.create(7496, 520, 'wall-square');
        platforms.create(7544, 520, 'wall-square');
        platforms.create(7592, 520, 'wall-square');
        platforms.create(5957, 390, 'platform2');

        // Enemies
        let enemies = [];
        enemies.push(new GreenMonster(this, 840, 450, {y: {from: 430, to: this.height - 40}, pause: 2000}));
        enemies.push(new BlueMonster(this, 1494, 356, {x: {from: 1409, to: 1585}, pause: 2000}));
        enemies.push(new BlueMonster(this, 2824, 360, {x: {from: 2631, to: 2846}, pause: 3000}));
        enemies.push(new GreenMonster(this, 3478, 400, {y: {from: 335, to: this.height - 40}, pause: 2000}));
        enemies.push(new GreenMonster(this, 4138, 620, {y: {from: 335, to: this.height - 40}, pause: 2000}));
        enemies.push(new BlueMonster(this, 4794, 121, {x: {from: 4742, to: 4873}, pause: 1000}));
        enemies.push(new BlueMonster(this, 5632, 400, {x: {from: 5515, to: 5720}, pause: 500}));
        enemies.push(new GreenMonster(this, 6470, 290, {y: {from: 289, to: 551}, pause: 1000}));
        enemies.push(new GreenMonster(this, 6652, 599, {y: {from: 338, to: this.height - 40}, pause: 1000}));
        enemies.push(new BlueMonster(this, 7750, 400, {x: {from: 7721, to: 7960}, pause: 500}));

        let playerPlatforms = this.physics.add.staticGroup();

        // tubes
        playerPlatforms.create(839, 550, 'tube1');
        playerPlatforms.create(3476, (this.height - 288 / 2), 'tube2');
        playerPlatforms.create(4136, (this.height - 288 / 2), 'tube2');
        playerPlatforms.create(6470, (this.height - 336 / 2), 'tube3');
        playerPlatforms.create(6651, (this.height - 288 / 2), 'tube2');

        // Movable platform
        let movablePlatform = this.physics.add.image(3323, 419, 'movable-platform');
        movablePlatform.setImmovable(true);
        // @ts-ignore
        movablePlatform.body.setAllowGravity(false);

        this.tweens.timeline({
            targets: movablePlatform.body.velocity,
            loop: -1,
            tweens: [
                { x: -150, y: 0, duration: 2000, ease: 'Stepped' },
                { x: 150, y: 0, duration: 2000, ease: 'Stepped' },
            ]
        });

        let movablePlatforms = movablePlatform;

        this.levelManager = Object.assign(this.levelManager, {
            platforms,
            playerPlatforms,
            movablePlatforms,
            enemies
        });

        // Stars
        this.levelManager.createStars([
            {x: 309, y: 200},
            {x: 625, y: 114},
            {x: 765, y: 114},
            {x: 1335, y: 159},
            {x: 1335, y: 99},
            {x: 2217, y: 214},
            {x: 2217, y: 166},
            {x: 2577, y: 83},
            {x: 2625, y: 83},
            {x: 2673, y: 83},
            {x: 3146, y: 257},
            {x: 3194, y: 257},
            {x: 3656, y: 50},
            {x: 3956, y: 50},
            {x: 4474, y: 184},
            {x: 4683, y: 320},
            {x: 4877, y: 520},
            {x: 6221, y: 232},
            {x: 6269, y: 232},
            {x: 6922, y: 122},
            {x: 6922, y: 74},
            {x: 7363, y: 108},
            {x: 7363, y: 156},
            {x: 8024, y: 24},
            {x: 8120, y: 24},
            {x: 8168, y: 24},
            {x: 8168, y: 72},
            {x: 8168, y: 120},
        ]);

        // Question cubes
        this.levelManager.createQuestionCubes([
            {x: 695, y: 114},
            {x: 3806, y: 61},
            {x: 4877, y: 472},
            {x: 6922, y: 180},
            {x: 8072, y: 24},
        ]);

        // Thorns
        let thorns = [];
        thorns.push(new Thorn(this, 2585, 470, 'left'));
        thorns.push(new Thorn(this, 3561, 385));
        thorns.push(new Thorn(this, 4000, 385));
        thorns.push(new Thorn(this, 7731, 318, 'down'));
        thorns.push(new Thorn(this, 7778, 318, 'down'));

        this.levelManager.thorns = thorns;

        // Ices
        let ices = [];
        ices.push(new Ice(this, 2456, 590));
        this.levelManager.ices = ices;

        // Key
        this.levelManager.key = new Key(this, 4282, 25);

        // Level init
        this.levelManager.startLevel({
            mapWidth: this.width * 8,
            mapHeight: this.height,
            startX: 100,
            startY: 300,
            finishX: 8009,
            finishY: 472,
            nextLevel: 'level2-scene'
        });
    }

    update() {
        this.levelManager.update();
    }
}

export default Level1Scene;