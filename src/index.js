import config from './config';
import Phaser from 'phaser';
import * as animations from './animations';
import logoAnimation from '../assets/animations/logo/logo';
import player from './player';

config.scene = {
    preload,
    create,
    update,
};

const game = new Phaser.Game(config);

function preload() {
    ///Initialize assets here
    /**
     * Add an asset by importing it
     * `import myImage from '../assets/images/MyImage.png'`
     * then add it to phaser
     * `this.load.image('my-image', myImage)`
     */

    this.scene.systems.cameras.main.setBackgroundColor('#777777');
    player.preload(this);
    animations.load(this, logoAnimation);
}

function create() {
    animations.create(game, logoAnimation);
    const sprite = this.add.sprite(400, 300, logoAnimation.key);
    sprite.play(logoAnimation.key);
    sprite.setScale(0.5, 0.5);

    player.create(this);
}

function update(time, deltaTime) {
    player.update(this, time, deltaTime);
}
