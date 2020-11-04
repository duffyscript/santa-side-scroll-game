import Phaser from "phaser";
import Enemy from "./Enemy";
import {EnemyMovingType} from "../types";

class BlueMonster extends Enemy {
    constructor(game:Phaser.Scene, x:number, y:number, name:string, setMoving:EnemyMovingType) {
        super(game, x, y, name, setMoving);

        this.animationPrefix = 'monster-blue';
        this.setSize(100, 115)
        this.setOffset(35, 25);
        this.setScale(0.5);
    }

    animations() {
        this.game.anims.create({
            key: 'monster-blue-right',
            frames: this.game.anims.generateFrameNumbers('monster-blue', { start: 10, end: 27 }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'monster-blue-left',
            frames: this.game.anims.generateFrameNumbers('monster-blue', { start: 10, end: 27 }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'monster-blue-turn',
            frames: this.game.anims.generateFrameNumbers('monster-blue', { start: 0, end: 9 }),
            frameRate: 10
        });

        this.game.anims.create({
            key: 'monster-blue-attack',
            frames: this.game.anims.generateFrameNumbers('monster-blue', { start: 30, end: 41 }),
            frameRate: 30,
            repeat: -1
        });

        this.game.anims.create({
            key: 'monster-blue-death',
            frames: this.game.anims.generateFrameNumbers('monster-blue', { start: 50, end: 64 }),
            frameRate: 30,
            repeat: -1
        });
    }
}

export default BlueMonster;

