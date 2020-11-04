import ControllerManager from "../managers/ControllerManager";

class Player extends Phaser.Physics.Arcade.Sprite {

    private game: Phaser.Scene;
    death: unknown;
    dying: boolean;
    movingLeft: boolean;
    movingRight: boolean;
    jumping: boolean;
    pressingUp: boolean;
    public onIce: boolean;
    private controller: ControllerManager;
    private desktopPlaying: boolean;

    constructor(game:Phaser.Scene, x:number, y:number) {
        super(game, x, y, "santa");

        this.game = game;

        game.add.existing(this);
        game.physics.add.existing(this);

        // Config
        this.setBounce(0.1);
        this.setScale(0.6);
        this.setCollideWorldBounds(true);
        // @ts-ignore
        this.body.onWorldBounds = true;
        this.body.world.checkCollision.up = false;
        this.setGravityY(200);
        this.setScrollFactor(1);
        this.setSize(100, 130).setOffset(48, 15);

        // animations
        this.animations();
        
        // controls
        this.controller = new ControllerManager(this, this.game);

        //states
        this.death = false;
        this.dying = false;
        this.movingLeft = false;
        this.movingRight = false;
        this.jumping = false;
        this.pressingUp = false;
        this.onIce = false;
        this.desktopPlaying = this.game.game.device.os.desktop;
    }

    animations() {

        this.game.anims.create({
            key: 'left',
            frames: this.game.anims.generateFrameNumbers('santa', { start: 10, end: 19 }),
            frameRate: 30,
            repeat: -1
        });

        this.game.anims.create({
            key: 'right',
            frames: this.game.anims.generateFrameNumbers('santa', {start: 10, end: 19}),
            frameRate: 30,
            repeat: -1
        });

        this.game.anims.create({
            key: 'turn',
            frames: this.game.anims.generateFrameNumbers('santa', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'jump',
            frames: this.game.anims.generateFrameNumbers('santa', {start: 21, end: 25}),
            frameRate: 10,
            repeat: -1
        });

        this.game.anims.create({
            key: 'death',
            frames: this.game.anims.generateFrameNumbers('santa', {start: 41, end: 55}),
            frameRate: 30,
            repeat: 0
        });
    }

    update() {
        if (this.death) {
            return;
        }

        if (this.dying && !this.death) {
            this.stop();
            return;
        }

        if (this.desktopPlaying) {
            this.controller.getKeyboardInput(this);
        }

        if (this.movingLeft) {
            this.moveLeft();
        } else if (this.movingRight) {
            this.moveRight();
        } else if (this.onIce) {
            this.onIceMove();
        } else {
            this.stop();
        }

        if (this.jumping && !this.pressingUp) {
            this.jump();
            this.pressingUp = true;
            this.jumping = false;
            this.onIce = false;
        }
    }

    moveLeft() {
        this.setVelocityX(-200);
        this.flipX = true;

        if (!this.body.touching.down) {
            this.anims.play('jump', true);
            return;
        }

        this.anims.play('left', true);
    }

    moveRight() {
        this.setVelocityX(200);
        this.flipX = false;

        if (!this.body.touching.down) {
            this.anims.play('jump', true);
            return;
        }

        this.anims.play('right', true);
    }

    stop() {
        if (this.dying) {
            this.setVelocityY(0);
        }

        this.setVelocityX(0);

        if (this.dying) {
            this.anims.play('death', false);

            return;
        }

        if (!this.body.touching.down) {
            this.anims.play('jump', true);
            return;
        }

        this.anims.play('turn', true);
    }

    jump() {
        this.setGravityY(1500)
        this.setVelocityY(-850);
    }

    startDying() {
        this.dying = true;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    onIceMove() {
        if (this.flipX) {
            this.setVelocityX(-270);
            this.movingLeft = true;
        } else {
            this.setVelocityX(270);
            this.movingLeft = false;
        }
    }
}

export default Player;