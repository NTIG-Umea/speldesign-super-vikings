import sprite from '../assets/image/player.png';
import { Noise } from 'noisejs';

const noise = new Noise(Math.random());

window.cameraX = 0;

export default {
    balls: [],
    player: null,
    gravity: 15,
    moveSpeed: 500,

    velocity: { x: 0, y: 0 },

    preload(phaser) {
        phaser.load.image(sprite, sprite);
    },

    create(phaser) {
        this.player = phaser.add.image(100, 100, sprite);
        this.generateGroundValues(4, 1, 5);
    },

    update(phaser, _time, deltaTime) {
        if (this.player != null) {
            // eslint-disable-next-line prettier/prettier
            const ground = this.getGroundHeightPerlin( (this.player.x + this.time) / 100 ) * 100 - 48;
            // eslint-disable-next-line prettier/prettier
            const nextGround = this.getGroundHeightPerlin( (this.player.x + this.time + deltaTime * this.moveSpeed) / 100 ) * 100 - 48;

            while (nextGround < this.player.y + this.velocity.y) {
                this.velocity.y -= deltaTime;

                if (nextGround - ground > 0) {
                    // Fysiks her
                }
            }

            if (this.player.y < ground) {
                this.velocity.y += this.gravity * deltaTime;
                // this.moveSpeed += this.gravity * deltaTime;
            } else if (this.velocity.y > 0) {
                console.log('test');
                this.velocity.y = 0;
                this.player.y = ground;
            }

            this.player.x += this.velocity.x;
            this.player.y += this.velocity.y;
        }

        this.balls.forEach((ball, index) => {
            ball.x = index * 10;
            // eslint-disable-next-line prettier/prettier
            ball.y = this.getGroundHeightPerlin((ball.x + this.time) / 100) * 100;
        });

        if (phaser.input.activePointer.isDown) {
            if (this.gravity != 40) {
                this.gravity = 40;
            }
        } else if (this.gravity != 10) {
            this.gravity = 10;
        }

        window.cameraX += deltaTime * this.moveSpeed;
    },

    groundValues: [],
    generateGroundValues(complexity, min, max) {
        this.groundValues = [];
        for (let i = 0; i < complexity; i++) {
            this.groundValues[i] = Math.random() * (max - min) + min;
        }
        this.groundValues.sort((a, b) => b - a);
    },

    getGroundHeight(x) {
        return this.groundValues.reduce(
            (acc, val, i) => acc + Math.sin(x / parseFloat(val)) * i
        );
    },

    getGroundHeightPerlin(x) {
        return this.groundValues.reduce((acc, val, i) => {
            // console.log({ acc, val, i, noise: noise.simplex2(x / val, 0) * i });
            return (
                acc +
                (noise.simplex2(x / val, 0) * i) / this.groundValues.length
            );
        });
    },
};
