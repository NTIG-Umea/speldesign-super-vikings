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

        this.addButton(400, 350, 'Börja Spela', '🎅', () => {
            this.scene.launch('MainScene');
        });
    }

    update(time, deltaTime) {
        background.update(this, time / 1000, deltaTime / 1000);
    }

    addButton(x, y, label, emoji, onClick) {
        const button = this.add
            .text(x, y, label, {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 32,
                stroke: '#000000',
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        const icon = this.add
            .text(x - button.width / 2 - 25, y, emoji, {
                align: 'center',
                fontSize: 32,
                padding: {
                    left: 5,
                    right: 5, 
                    top: 5,
                    bottom: 5,
                },
            })
            .setOrigin(0.5, 0.5)
            .setVisible(false);

        button.on('pointerover', () => {
            button.setStyle({
                strokeThickness: 8,
            });
            icon.setVisible(true);
        });
        button.on('pointerout', () => {
            button.setStyle({
                strokeThickness: 0,
            });
            icon.setVisible(false);
        });

        button.on('pointerdown', () => {
            button.on('pointerup', () => {
                onClick();
            });
            setTimeout(() => {
                button.off('pointerup');
            }, 500);
        });
    }
}
