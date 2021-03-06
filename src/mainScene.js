import Phaser from 'phaser';
import * as animations from './animations';
import player from './player';
import background from './background';
import pointManager from './pointManager';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        ///Initialize assets here
        /**
         * Add an asset by importing it
         * `import myImage from '../assets/images/MyImage.png'`
         * then add it to phaser
         * `this.load.image('my-image', myImage)`
         */
        
        this.load.atlas('pack-result', 'pack-result.png', 'pack-result.json');
        this.scene.systems.cameras.main.setBackgroundColor('#777777');
        background.preload(this);
        pointManager.preload(this);
        player.preload(this);
    }

    create() {
        window.gameCamera = this.cameras.add();
        window.gameCamera.setName('GameCamera');

        this.scene.launch('menuPause');

        background.create(this);
        pointManager.create(this);
        player.create(this);
    }

    update(time, deltaTime) {
        background.update(this, time / 1000, deltaTime / 1000);
        pointManager.update(this, time / 1000, deltaTime / 1000);
        player.update(this, time / 1000, deltaTime / 1000);
    }
}
