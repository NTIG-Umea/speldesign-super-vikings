import sprite from '../assets/image/player.png';
import noise from './perlin';
import ground from './ground';

window.cameraX = 500;

export default {
    balls: [],
    player: null,
    gravity: 15,
    moveSpeed: 1,
    friction: 1.4,
    feelGoodFormula: 50, // Magic number that defines the "feel" of te game

    velocity: { x: 0, y: 0 },

    preload(phaser) {
        ground.preload(phaser);
        phaser.load.image(sprite, sprite);
    },

    create(phaser) {
        ground.create(phaser);
        this.player = phaser.add.image(100, 100, sprite);
        this.player.setOrigin(0.5, 1);
        this.velocity.x = this.moveSpeed;
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
                this.player.y = groundPos;
            }

            if (nextGroundPos < this.player.y + this.velocity.y + 2) {
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
                        this.friction * this.gravity * this.velocity.x * deltaTime * -((sy / sx) ** 2);
                }
                console.log((sy / sx))
            }

            while (nextGroundPos < this.player.y + this.velocity.y) {
                this.velocity.y -= deltaTime;
                // this.velocity.x -= deltaTime;
            }

            this.player.y += this.velocity.y;
        }

        if (phaser.input.activePointer.isDown) {
            if (this.gravity != 30) {
                this.gravity = 30;
                this.velocity.y = Math.max(this.velocity.y, 0);
            }
        } else if (this.gravity != 10) {
            this.gravity = 10;
        }

        window.cameraX += deltaTime * this.velocity.x * 10;
        // console.log({ x: this.velocity.x, y: this.velocity.y });
        // console.log({x: this.player.y, y: this.player.y});
    },
};
