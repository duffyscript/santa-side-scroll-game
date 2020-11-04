import Player from "../elements/Player";
import Enemy from "../elements/Enemy";
import IndicatorsManager, {LIVES_TO_START} from "./IndicatorsManager";
import QuestionCube from "../elements/QuestionCube";
import SoundManager from "./SoundManager";
import FinalTable from "../elements/FinalTable";
import Key from "../elements/Key";
import Ice from "../elements/Ice";
import Thorn from "../elements/Thorn";
import Chest from "../elements/Chest";
import {PositionType, SetMapType, StartLevelType} from "../types";

export class LevelManager {
    
    private game: Phaser.Scene;
    indicatorsManager: IndicatorsManager;
    private soundManager: SoundManager;
    level: number;
    private levelComplete: boolean;
    private startX: number;
    private startY: number;
    private mapSize: { width: number; height: number };
    player: Player;
    private platforms: Phaser.GameObjects.Group;
    private playerPlatforms: Phaser.GameObjects.Group;
    private movablePlatforms: Phaser.GameObjects.Group;
    private stars: Phaser.Physics.Arcade.StaticGroup;
    enemies: Enemy[];
    private questionCubes: QuestionCube[];
    thorns: Thorn[];
    ices: Ice[];
    key: Key;
    private finalTable: FinalTable;
    chest: Chest;
    private nextLevel: string | null;
    
    constructor(game:Phaser.Scene) {
        this.game = game;
        this.indicatorsManager = new IndicatorsManager(game);
        this.soundManager = new SoundManager(game);
        this.nextLevel = null;

        // states
        this.level = 1;
        this.levelComplete = false;
        this.startX = null;
        this.startY = null;
        this.mapSize = {
            width: null,
            height: null,
        };

        // Elements
        this.player;
        this.platforms = null;
        this.playerPlatforms = null;
        this.movablePlatforms = null;
        this.stars = null;
        this.enemies = [];
        this.questionCubes = [];
        this.thorns = [];
        this.ices = [];
        this.key = null;
        this.finalTable = null;
        this.chest = null;
    }

    preload() {
        // Sound
        this.soundManager.preload();

        // Images
        this.game.textures.remove('sky');
        this.game.load.image('thorn-left', 'assets/elements/thorn-left.png');
        this.game.load.image('thorn-up', 'assets/elements/thorn-up.png');
        this.game.load.image('thorn-down', 'assets/elements/thorn-down.png');
        this.game.load.image('vase', 'assets/elements/vase.png');
        this.game.load.image('snowman', 'assets/elements/snowman.png');
        this.game.load.image('key', 'assets/elements/key.png');
        this.game.load.image('star', 'assets/elements/star.png');
        this.game.load.image('final-table', 'assets/elements/final-table.png');
        this.game.load.image('monster-green', 'assets/elements/monster-green.png');
        this.game.load.image('brick-wall-square', 'assets/map/brick-wall-square.png');
        this.game.load.image('wall-square', 'assets/map/wall-square.png');
        this.game.load.image('question-square', 'assets/elements/question-square.png');
        this.game.load.image('movable-platform', 'assets/map/movable-platform.png');
        this.game.load.image('tree', 'assets/elements/tree.png');
        this.game.load.image('flower', 'assets/elements/flower.png');
        this.game.load.image('control-left', 'assets/control-left.png');
        this.game.load.image('control-jump', 'assets/control-jump.png');
        this.game.load.image('monster-fly-green', 'assets/elements/monser-fly-green.png');
        this.game.load.image('chest', 'assets/elements/chest.png');
        this.game.load.image('chest-open', 'assets/elements/chest-open.png');
        // this.load.image('monster-blue', 'assets/elements/monster-blue.png');

        this.game.load.spritesheet('santa',
            'assets/elements/santa.png',
            { frameWidth: 200, frameHeight: 146}
        );

        this.game.load.spritesheet('monster-blue',
            'assets/elements/monster-blue.png',
            { frameWidth: 166, frameHeight: 146}
        );
    }

    update() {
        this.player.update();

        if (this.enemies && this.enemies.length !== 0) {
            this.enemiesUpdate();
        }
    }

    startLevel({mapWidth, mapHeight, startX, startY, finishX, finishY, nextLevel}:StartLevelType) {
        this.setMap({mapWidth, mapHeight, startX, startY});
        this.startPlayer();

        if (finishX && finishY) {
            this.finalTable = new FinalTable(this.game, finishX, finishY);
            this.soundManager.stop();
        }

        if (!nextLevel) {
            throw new Error('Config next level!');
        }

        this.nextLevel = nextLevel;

        this.setElementsRules();
        this.joinScreenOnPlayer(this.mapSize.width, this.mapSize.height);
        this.indicatorsManager.showScore();
        this.indicatorsManager.showLives();
        this.indicatorsManager.showStars();

        if (this.indicatorsManager.keyCollected) {
            this.indicatorsManager.showKey();
        }

        setTimeout(() => this.soundManager.playAudio(), 1000);
    }

    setMap({mapWidth, mapHeight, startX, startY}:SetMapType) {
        this.game.physics.world.bounds.width = mapWidth;
        this.setMapSize(mapWidth, mapHeight);
        this.setStartPosition(startX, startY);
    }

    joinScreenOnPlayer(screenWidth:number, screenHeight:number) {
        let mainCamera = this.game.cameras.main;
        mainCamera.setBounds(0, 0, screenWidth, screenHeight);
        mainCamera.startFollow(this.player);
    }

    setStartPosition(x:number, y:number) {
        this.startX = x;
        this.startY = y;
    }

    finish() {
        if (this.levelComplete) {
            return;
        }

        this.levelComplete = true;
        this.soundManager.stopAudio();
        this.finalTable.finish();

        this.game.cameras.main.fadeOut(1000, 0, 0, 0);
        this.game.cameras.main.on('camerafadeoutcomplete', () => this.goNextLevel(this.nextLevel), this);
    }

    goNextLevel(name:string) {
        this.level++;

        if (name === 'congratulation-scene') {
            this.resetBaseStates();
        }

        this.game.scene.start(name, {
            score: this.indicatorsManager.score,
            livesNumber: this.indicatorsManager.livesNumber,
            countStars: this.indicatorsManager.countStars,
            keyCollected: this.indicatorsManager.keyCollected,
            level: this.level,
        });
    }

    async playerDied() {
        let isDeath = await this.player.startDying();
        this.player.death = isDeath;

        this.indicatorsManager.livesNumber--;
        this.indicatorsManager.countLive.setText(this.indicatorsManager.livesNumber.toString());
        this.soundManager.stopAudio();

        if (isDeath) {
            this.restartLevel();

            if (this.indicatorsManager.livesNumber === 0) {
                this.resetBaseStates();
                this.game.scene.start('game-over-scene');
            }
        }
    }

    startPlayer() {
        this.player = new Player(this.game, this.startX, this.startY);
    }

    setElementsRules() {
        if (this.platforms) {
            this.game.physics.add.collider(this.player, [this.platforms, this.playerPlatforms, this.movablePlatforms]);
        }

        if (this.platforms && this.enemies) {
            this.game.physics.add.collider(this.enemies, this.platforms, (enemy:Enemy) => enemy.enableMove = true);
        }

        if (this.questionCubes) {
            this.game.physics.add.collider(this.player, this.questionCubes, async (player:Player, cube:QuestionCube) => {
                if (player.body.touching.up) {
                    cube.collectStars();
                    this.soundManager.play('collect');
                    this.indicatorsManager.addStar();

                    let starsToNewLive = await this.indicatorsManager.checkCountStars();

                    if (starsToNewLive) {
                        this.soundManager.play('new-live');
                    }
                }
            }, null, this);
        }

        if (this.enemies) {
            this.game.physics.add.collider(this.enemies, this.player, (enemy:Enemy) => {
                if (enemy.body.touching.up && enemy.moveDirection !== 'up' || enemy.isPaused) {
                    if (!enemy.dying) {
                        this.player.jump();
                        enemy.die();
                        this.indicatorsManager.changeScore(100);
                    }
                } else {
                    if (!this.player.dying) {
                        this.playerDied();
                        enemy.killedThePlayer = true;
                    }
                }
            }, null, this);
        }

        if (this.stars) {
            this.game.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        }

        if (this.thorns) {
            this.game.physics.add.overlap(this.player, this.thorns, () => {
                if (!this.player.dying) {
                    this.playerDied();
                }
            }, null, this);
        }

        if (this.ices) {
            this.game.physics.add.collider(this.player, this.ices, (player:Player) => player.onIce = true);
        }

        if (this.key) {
            let keyCollider = this.game.physics.add.overlap(this.player, this.key, (player:Player, key:Key) => {
                key.collect();
                this.collectKey();
                this.game.physics.world.removeCollider(keyCollider);
            }, null, this);
        }

        if (this.chest) {
            let chestCollider = this.game.physics.add.overlap(this.player, this.chest, (player:Player, chest:Chest) => {
                if (this.indicatorsManager.keyCollected) {
                    chest.collect();
                    this.indicatorsManager.changeScore(2000);
                    this.game.physics.world.removeCollider(chestCollider);
                }
            }, null, this);
        }

        if (this.finalTable) {
            this.game.physics.add.overlap(this.player, this.finalTable, this.finish, null, this);
        }

        this.game.physics.world.on('worldbounds', () => {
            // @ts-ignore
            if (!this.player.body.onFloor()) {
                return;
            }

            this.player.death = true;
            this.playerDied();
            this.player.destroy();
        }, this);
    }

    enemiesUpdate() {
        this.enemies.map(enemy => enemy.update());
    }

    restartLevel() {
        this.game.cameras.main.fadeOut(1000, 0, 0, 0);

        this.game.cameras.main.on('camerafadeoutcomplete', function () {
            this.game.scene.restart();
        }, this);
    }

    setMapSize(width:number, height:number) {
        this.mapSize = {
            width,
            height
        }
    }

    createStars(positions:PositionType[]) {
        if (positions.length === 0) {
            return;
        }

        this.stars = this.game.physics.add.staticGroup({
            key: 'star',
            repeat: positions.length - 1
        });

        this.stars.children.iterate((star:Phaser.Physics.Arcade.Sprite, index:number) => {
            star.setX(positions[index].x);
            star.setY(positions[index].y);
        });

        this.stars.refresh();
    }

    async collectStar(player:Player, star:Phaser.Physics.Arcade.Sprite) {
        star.disableBody(true, true);
        this.indicatorsManager.addStar();
        this.soundManager.play('collect');
        let starsToNewLive = await this.indicatorsManager.checkCountStars();

        if (starsToNewLive) {
            this.soundManager.play('new-live');
        }
    }

    collectKey() {
        this.indicatorsManager.keyCollected = true;
        this.indicatorsManager.showKey();
    }

    createQuestionCubes(positions:PositionType[]) {
        positions.map(({x, y}:{x:number, y:number}) => {
            this.questionCubes.push(new QuestionCube(this.game, x, y));
        });
    }

    resetBaseStates() {
        this.indicatorsManager.score = 0;
        this.indicatorsManager.livesNumber = LIVES_TO_START;
        this.indicatorsManager.keyCollected = false;
        this.indicatorsManager.countStars = 0;
        this.level = 1;
    }
}

export default LevelManager;