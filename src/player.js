import sprite from '../assets/image/player.png';
import noise from './perlin';
import ground from './ground';

window.cameraX = 0;

export default {
    balls: [],
    player: null,
    gravity: 15,
    moveSpeed: 1,

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

            while (nextGroundPos < this.player.y + this.velocity.y) {
                this.velocity.y -= deltaTime;
            }

            if (Math.abs(this.player.y - nextGroundPos) <= 2) {
                const sx = 1;
                const sy = nextGroundPos - groundPos;
                const vx = this.velocity.x;
                const vy = this.velocity.y;
                const O = Math.atan((sx * vy - sy * vx) / (vx * sx + vy * sy));
                this.velocity.x = Math.sqrt(this.velocity.x**2 + this.velocity.y**2) * Math.PI/2 - O;
                console.log({O});
            }

            if (this.player.y < groundPos) {
                this.velocity.y += this.gravity * deltaTime;
            } else if (this.velocity.y > 0) {
                this.velocity.y = 0;
                this.player.y = ground;
            }

            this.player.y += parseInt(this.velocity.y);
        }

        if (phaser.input.activePointer.isDown) {
            if (this.gravity != 40) {
                this.gravity = 40;
                this.velocity.y = Math.max(this.velocity.y, 0);
            }
        } else if (this.gravity != 10) {
            this.gravity = 10;
        }

        window.cameraX += deltaTime * this.velocity.x;
        console.log({x: this.player.y, y: this.player.y});
    },
};
