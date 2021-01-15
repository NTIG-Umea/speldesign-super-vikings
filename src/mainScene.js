import * as animations from './animations';
import logoAnimation from '../assets/animations/logo/logo';
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

        this.scene.systems.cameras.main.setBackgroundColor('#777777');
        background.preload(this);
        player.preload(this);
        animations.load(this, logoAnimation);
    }

    create() {
        this.scene.launch('menuPause');

        animations.create(this, logoAnimation);
        const sprite = this.add.sprite(400, 300, logoAnimation.key);
        sprite.play(logoAnimation.key);
        sprite.setScale(0.5, 0.5);

        background.create(this);
        player.create(this);
    }

    update(time, deltaTime) {
        // if (this.scene.isVisible('menuPause')) {
        //     this.scene.setVisible(false, 'menuPause');
        // }

        background.update(this, time / 1000, deltaTime / 1000);
        player.update(this, time / 1000, deltaTime / 1000);
    }
}

export default MainScene