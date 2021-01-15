import * as animations from './animations';
import player from './player';
import background from './background';

class MainScene extends Phaser.Scene {
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
        player.preload(this);
    }

    create() {
        this.scene.launch('menuPause');

        background.create(this);
        player.create(this);
    }

    update(time, deltaTime) {
        background.update(this, time / 1000, deltaTime / 1000);
        player.update(this, time / 1000, deltaTime / 1000);
    }
}

export default MainScene