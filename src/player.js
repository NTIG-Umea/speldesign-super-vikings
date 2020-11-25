import sprite from '../assets/image/player.png';
import ground from '../assets/image/ground.png';
import { Noise } from 'noisejs';

const noise = new Noise(Math.random());

export default {
    balls: [],
    player: null,

    preload(phaser) {
        phaser.load.image(sprite, sprite);
        phaser.load.image(ground, ground);
    },
    create(phaser) {
        this.player = phaser.add.image(100, 100, sprite);
        for (let i = 0; i < 800; i += 10) {
            const ball = phaser.add.image(0, 0, ground);
            ball.setOrigin(0, 0);
            this.balls.push(ball);
        }

        this.generateGroundValues(4, 1, 5);
    },
    update(phaser, time) {
        if (this.player != null) {
            this.player.y =
                this.getGroundHeightPerlin((this.player.x + time) / 300) * 100 -
                48;
        }

        this.balls.forEach((ball, index) => {
            ball.x = index * 10;
            ball.y = this.getGroundHeightPerlin((ball.x + time) / 300) * 100;
        });
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
