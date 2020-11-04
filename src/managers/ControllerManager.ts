import Player from "../elements/Player";

export class ControllerManager {

    private game: Phaser.Scene;

    constructor(player:Player, game:Phaser.Scene) {
        this.game = game;

        if (!this.game.game.device.os.desktop) {
            this.getVirtualButtonsInput(player);
        }
    }

    getKeyboardInput(player:Player) {
        let cursors = this.game.input.keyboard.createCursorKeys();

        // Left / right
        player.movingLeft = !!cursors.left.isDown;
        player.movingRight = !!cursors.right.isDown;

        // Jump
        player.jumping = !!(cursors.up.isDown && player.body.touching.down && !player.pressingUp);

        if (cursors.up.isUp) {
            player.pressingUp = false;
        }
    }

    getVirtualButtonsInput(player:Player) {
        // Left button
        const buttonLeft = this.game.add.image(60, (640 - 60), 'control-left').setInteractive();
        // @ts-ignore
        buttonLeft.fixedToCamera = true;
        buttonLeft.setScrollFactor(0);

        buttonLeft.on('pointerdown', () => player.movingLeft = true);
        buttonLeft.on('pointerup', () => player.movingLeft = false);

        // Right button
        const buttonRight = this.game.add.image(170, (640 - 60), 'control-left').setInteractive();
        // @ts-ignore
        buttonRight.fixedToCamera = true;
        buttonRight.setScrollFactor(0);
        buttonRight.flipX = true;
        buttonRight.on('pointerdown', () => player.movingRight = true);
        buttonRight.on('pointerup', () => player.movingRight = false);

        // Jump button
        const buttonJump = this.game.add.image(1024 - 60, (640 - 60), 'control-jump').setInteractive();
        // @ts-ignore
        buttonJump.fixedToCamera = true;
        buttonJump.setScrollFactor(0);
        buttonJump.on('pointerdown', () => player.jumping = true);
        buttonJump.on('pointerup', () => {
            player.jumping = false
            player.pressingUp = false;
        });
    }
}

export default ControllerManager;