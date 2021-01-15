import ground from '../assets/image/ground.png';
import noise from './perlin';

window.toffset = 0;

export default {
    pillars: [],
    shader: null,

    preload(phaser) {
        phaser.load.image(ground, ground);
    },

    create(phaser) {
        for (let i = 0; i < 800; i += 2) {
            const groundPillar = phaser.add.image(0, 0, ground);
            groundPillar.x = i;
            groundPillar.setOrigin(0, 0);
            this.pillars.push(groundPillar);
        }
    },

    update(phaser, time, deltaTime) {
        this.pillars.forEach((element) => {
            element.y = this.getGroundHeight(element.x + window.cameraX);
        });
    },

    getGroundHeight(x) {
        return noise.perlin(x / 400) * 300 + 300;
    }
};
