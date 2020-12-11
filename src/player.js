import sprite from '../assets/image/player.png';
import ground from './ground';
import Phaser from 'phaser';

window.cameraX = 500;

export default {
    balls: [],
    player: null,
    gravity: 15,
    friction: 1,
    feelGoodFormula: 50, // Magic number that defines the "feel" of the game
    flipSpeed: 6,
    flipAmount: 0,
    groundOffset: -32, // The offset that the player has to the ground, to make sure the feet follows the ground, and not the body

    velocity: { x: 100, y: -2 },

    preload(phaser) {
        ground.preload(phaser);
        phaser.load.image(sprite, sprite);
    },

    keyTrick: false,
    keyBrace: false,
    keyFlipLeft: false,
    keyFlipRight: false,

    create(phaser) {
        ground.create(phaser);
        this.player = phaser.add.image(100, 200, sprite);

        this.keyTrick = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this.keyBrace = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
        this.keyFlipLeft = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this.keyFlipRight = phaser.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
    },

    update(phaser, time, deltaTime) {
        ground.update(phaser, time, deltaTime);

        if (this.player != null) {
            const groundPos = ground.getGroundHeight(
                this.player.x + window.cameraX
            );
            const nextGroundPos = ground.getGroundHeight(
                this.player.x + window.cameraX + 1
            );

            if (this.player.y < groundPos) {
                this.velocity.y += this.gravity * deltaTime;
            } else if (this.velocity.y > 0) {
                this.velocity.y = 0;
                this.player.y = groundPos + this.groundOffset;
            }

            if (
                nextGroundPos + this.groundOffset <
                this.player.y + this.velocity.y + 2
            ) {
                const sx = 1;
                const sy = nextGroundPos - groundPos;

                if (sy / sx >= 0) {
                    this.velocity.x +=
                        this.gravity *
                        (sy / sx) *
                        deltaTime *
                        this.feelGoodFormula;
                } else {
                    this.velocity.x +=
                        this.friction *
                        this.gravity *
                        this.velocity.x *
                        deltaTime *
                        -((sy / sx) ** 2);
                }

                let deltaAngle = this.player.angle;
                this.player.angle = Math.atan2(sy, sx) * (180 / Math.PI);
                deltaAngle = this.player.angle - deltaAngle;

                if (Math.abs(deltaAngle) > 20) {
                    this.velocity.x =
                        this.velocity.x / 2 +
                        (this.velocity.x / 2) *
                            Math.cos((deltaAngle / 180) * Math.PI);
                }

                if (
                    Math.abs(deltaAngle) < 45 &&
                    Math.abs(this.flipAmount) / 270 > 1
                ) {
                    const flips = Math.floor(
                        (Math.abs(this.flipAmount) + 90) / 360
                    );

                    this.velocity.x += 25 * flips;
                }
                this.flipAmount = 0;
            }

            while (
                nextGroundPos + this.groundOffset <
                this.player.y + this.velocity.y
            ) {
                this.velocity.y -= deltaTime;
            }

            this.player.y += this.velocity.y;
        }

        if (this.keyBrace.isDown) {
            if (this.gravity != 30) {
                this.gravity = 30;
                this.velocity.y = Math.max(this.velocity.y, 0);
            }
        } else {
            if (this.gravity != 10) {
                this.gravity = 10;
            }

            let flip = this.keyFlipRight.isDown - this.keyFlipLeft.isDown;
            if (flip != 0) {
                this.player.angle += flip * this.flipSpeed;
                this.flipAmount += flip * this.flipSpeed;
            }
        }

        window.cameraX += deltaTime * this.velocity.x * 10;
    },
};
