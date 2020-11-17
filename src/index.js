import config from './config';
import Phaser from 'phaser';
import * as animations from './animations';
import logoAnimation from '../assets/animations/logo/logo';

config.scene = {
    preload,
    create,
    update,
};

console.log(animations);

new Phaser.Game(config);

function preload() {
    ///Initialize assets here
    /**
     * Add an asset by importing it
     * `import myImage from '../assets/images/MyImage.png'`
     * then add it to phaser
     * `this.load.image('my-image', myImage)`
     */

    console.log(logoAnimation);
    animations.load(this, logoAnimation);
}

function create() {
    animations.create(this, logoAnimation);
    const sprite = this.add.sprite(400, 300, logoAnimation.key);
    sprite.play(logoAnimation.key);
    sprite.setScale(0.5, 0.5);
    sprite.setAnchor(0.5, 0.5);
}

function update() {}
