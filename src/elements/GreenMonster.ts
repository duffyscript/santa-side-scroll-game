import Phaser from "phaser";
import Enemy from "./Enemy";
import {EnemyMovingType} from "../types";

class GreenMonster extends Enemy {
    constructor(game:Phaser.Scene, x:number, y:number, setMoving:EnemyMovingType) {
        super(game, x, y, "monster-green", setMoving);

        this.animationPrefix = null;

        this.setSize(50, 50)
        this.setOffset(10, 12);
    }

    animations() {
    }
}

export default GreenMonster;

