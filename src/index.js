import config from './config.js';
import Phaser from 'phaser';

config.scene = {
    preload,
    create,
};

new Phaser.Game(config);

function preload() {}

function create() {
    this.add.image(200, 200, 'test');
}
