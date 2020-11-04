import Phaser from "phaser";
import Enemy from "./Enemy";
import {EnemyMovingType} from "../types";

class GreenFlyMonster extends Enemy {
    constructor(game:Phaser.Scene, x:number, y:number, setMoving:EnemyMovingType) {
        super(game, x, y, "monster-fly-green", setMoving);

        // @ts-ignore
        this.body.setAllowGravity(false);
        this.setSize(50, 50)
        this.setOffset(10, 12);

        this.animationPrefix = null;
        this.enemyType = 'fly';
    }

    animations() {
    }
}

export default GreenFlyMonster;

