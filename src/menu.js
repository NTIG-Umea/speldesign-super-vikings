import Phaser from 'phaser';
import background from './background';
import player from './player';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        this.scene.systems.cameras.main.setBackgroundColor('#777777');
        background.preload(this);
        player.preload(this);
        // this.load.image(background0, background0);
        // this.load.image(background1, background1);
        // this.load.image(background2, background2);
    }

    create() {
        // this.add.image(400, 300, background0);
        // this.add.image(400, 300, background1);
        // this.add.image(400, 300, background2);
        background.create(this);

        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.2);

        this.add
            .text(400, 200, 'Jesus Christ Pro\n' + 'Snowboarding 2021', {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 60,
                stroke: 'black',
                strokeThickness: 8,
            })
            .setOrigin(0.5, 0.5);

        const restartButton = this.add
            .text(400, 350, 'Börja Spela', {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 32,
                stroke: '#000000',
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setStyle({
                strokeThickness: 8,
            });
        });
        restartButton.on('pointerout', () => {
            restartButton.setStyle({
                strokeThickness: 0,
            });
        });

        restartButton.on('pointerdown', () => {
            restartButton.on('pointerup', () => {
                this.scene.launch('MainScene');
            });
            setTimeout(() => {
                restartButton.off('pointerup');
            }, 500);
        });
    }

    update(time, deltaTime) {
        background.update(this, time / 1000, deltaTime / 1000);
    }
}
