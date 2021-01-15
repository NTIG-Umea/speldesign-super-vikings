import Phaser from 'phaser';

export default class menuPause extends Phaser.Scene {
    constructor() {
        super({ key: 'menuPause' });
    }

    preload() {}

    create() {
        this.add.image(400, 300, '../assets/image/background-1.png');

        console.log(this.scene.isSleeping('MainScene'));

        this.add
            .text(400, 200, 'Pause Menu Test', {
                align: 'center',
                fill: 'white',
                fontFamily: 'sans-serif',
                fontSize: 48,
            })
            .setOrigin(0.5, 0);

        const esc = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
        esc.on('down', () => {
            this.scene.switch('MainScene');
        });
    }
}
