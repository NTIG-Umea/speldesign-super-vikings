import Phaser from 'phaser';
import BlurPipeline from '../assets/shaders/pipelines/BlurPipeline';

export default class menuPause extends Phaser.Scene {
    constructor() {
        super({ key: 'menuPause' });
        this.paused = false;
    }

    preload() {}

    create() {
        this.pipeline = this.game.renderer.addPipeline(
            'BlurPipeline',
            new BlurPipeline(this.game)
        );

        this.scene.moveUp();
        this.scene.setVisible(false);

        console.log(this.scene.isSleeping('MainScene'));

        this.add
            .text(400, 200, '🎄 Pausat', {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 60,
            })
            .setOrigin(0.5, 0.5);

        this.addButton(400, 300, 'Återuppta', '🎅', () => {
            this.resume();
        });

        this.addButton(400, 350, 'Tillbaka till Huvudmenyn', '🎅', () => {
            location.reload();
        });

        const esc = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        esc.on('down', () => {
            if (this.paused) {
                this.resume();
            } else {
                this.pause();
            }
        });
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

    pause() {
        if (!this.paused) {
            this.paused = true;

            window.gameCamera.setRenderToTexture(this.pipeline);

            this.scene.pause('MainScene');
            this.scene.setVisible(true);
        }
    }

    resume() {
        if (this.paused) {
            this.paused = false;

            this.scene.resume('MainScene');
            this.scene.setVisible(false);

            window.gameCamera.clearRenderToTexture();
        }
    }
}
