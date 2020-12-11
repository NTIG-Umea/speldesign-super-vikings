import background0 from '../assets/image/background-0.png';
import background1 from '../assets/image/background-1.png';
import background2 from '../assets/image/background-2.png';
import background3 from '../assets/image/background-3.png';

const layers = [background0, background1, background2, background3];

export default {
    preload(phaser) {
        layers.forEach((layer, i) => {
            phaser.load.image(layer, layer);
        });
    },

    create(phaser) {
        layers.forEach((layer, i) => {
            layers[i] = phaser.add.tileSprite(400, 300, 800, 600, layer);
        });
    },

    update(phaser, time, deltaTime) {
        layers.forEach((layer, i) => {
            layer.tilePositionX = window.cameraX * i / 50 + 800;
        });
    },
};
