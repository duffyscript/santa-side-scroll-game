import {EnemyMovingType} from "../types";

const DEFAULT_GRAVITY = -100;
const DEFAULT_SPEED = 150;

abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    protected game: Phaser.Scene;
    death: boolean;
    dying: boolean;
    killedThePlayer: boolean;
    enableMove: boolean;
    private isMoving: boolean;
    isPaused: boolean;
    private pauseComplete: boolean;
    moveDirection: string;
    private moving: EnemyMovingType;
    protected animationPrefix: string | null;
    protected enemyType: string;

    constructor(game:Phaser.Scene, x:number, y:number, name:string, setMoving:EnemyMovingType) {
        super(game, x, y, name);

        this.game = game;

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setGravityY(DEFAULT_GRAVITY);

        // animations
        this.animations();

        //states
        this.enemyType = 'land';
        this.death = false;
        this.dying = false;
        this.killedThePlayer = false;
        this.enableMove = false;
        this.isMoving = false;
        this.isPaused = false;
        this.pauseComplete = true;
        this.moveDirection = 'right';
        this.animationPrefix = null;
        this.moving = {
            x: {
                from: null,
                to: null
            },
            y: {
                from: null,
                to: null
            },
            pause: 0,
            speed: DEFAULT_SPEED
        }

        if (setMoving) {
            this.setMoving(setMoving);
        }
    }

    setMoving({x = null, y = null, pause = 0, speed = DEFAULT_SPEED}) {
        this.isMoving = true;

        this.moving = {
            x,
            y,
            pause,
            speed
        }

        if (this.enemyType) {
            this.enableMove = true;
        }

        if (y && !x) {
            this.enableMove = true;
            this.moveDirection = 'up';
        }
    }

    update() {
        if (this.death || !this.body) {
            return;
        }

        if (this.killedThePlayer || this.dying || this.isPaused) {
            this.stop();
            return;
        }

        if (this.isMoving && this.enableMove) {
            this.move();
        }
    }

    move() {
        if (this.moving.x) {
            this.moveHorizontal();
        }

        if (this.moving.y) {
            this.moveVertical();
        }
    }

    moveHorizontal() {
        const checkStart = this.x <= this.moving.x.from;
        const checkEnd = this.x >= this.moving.x.to;

        if ((checkStart || checkEnd) && this.moving.pause && !this.isPaused && this.pauseComplete) {
            this.isPaused = true;
            this.pauseComplete = false;
            setTimeout(() => {this.isPaused = false;}, this.moving.pause);
        } else if (checkStart || this.x < this.moving.x.to && this.moveDirection === 'right') {
            this.moveRight();
        } else if (checkEnd || this.moveDirection === 'left') {
            this.moveLeft();
        }

        if (!checkStart && !checkEnd) {
            this.pauseComplete = true;
        }
    }

    moveVertical() {
        const checkStart = this.y <= this.moving.y.from;
        const checkEnd = this.y >= this.moving.y.to;

        if ((checkStart || checkEnd) && this.moving.pause && !this.isPaused && this.pauseComplete) {
            this.isPaused = true;
            this.pauseComplete = false;
            setTimeout(() => {this.isPaused = false;}, this.moving.pause);
        } else if (checkStart || this.y < this.moving.y.to && this.moveDirection === 'down') {
            this.moveDown();
        } else if (checkEnd || this.moveDirection === 'up') {
            this.moveUp();
        }

        if (this.y > this.moving.y.from + 10 && this.y < this.moving.y.to - 10) {
            this.pauseComplete = true;
        }
    }

    moveLeft() {
        this.setVelocityX(-this.moving.speed);
        this.flipX = true;
        this.moveDirection = 'left';

        if (this.animationPrefix) {
            this.anims.play(this.animationPrefix + '-left', true);
        }
    }

    moveRight() {
        this.setVelocityX(this.moving.speed);
        this.flipX = false;
        this.moveDirection = 'right';

        if (this.animationPrefix) {
            this.anims.play(this.animationPrefix + '-right', true);
        }
    }

    moveUp() {
        this.setVelocityY(-this.moving.speed);
        this.flipX = true;
        this.moveDirection = 'up';
        this.setGravityY(4000);
        // this.anims.play('monster-blue-left', true);
    }

    moveDown() {
        this.setVelocityY(this.moving.speed);
        this.flipX = true;
        this.moveDirection = 'down';
        this.setGravityY(-4000);
    }

    stop() {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.setGravityY(-200);

        if (this.animationPrefix) {
            if (this.killedThePlayer) {
                this.anims.play(this.animationPrefix + '-attack', true);
                return;
            }

            if (this.dying) {
                this.anims.play(this.animationPrefix + '-death', true);
                return;
            }

            this.anims.play(this.animationPrefix + '-turn');
        }
    }

    public die() {
        this.setVelocityX(0);
        this.setVelocityY(-30);
        this.dying = true;

        setTimeout(() => {
            this.death = true;
            this.destroy();
        }, 450);
    }

    protected animations() {
        throw new Error('You have to implement the method animations');
    }
}

export default Enemy;
