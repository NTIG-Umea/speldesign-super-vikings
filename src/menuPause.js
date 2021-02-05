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

        const resumeButton = this.add
            .text(400, 300, 'Återuppta', {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 32,
                stroke: '#000000',
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        resumeButton.on('pointerover', () => {
            resumeButton.setStyle({
                strokeThickness: 8,
            });
        });
        resumeButton.on('pointerout', () => {
            resumeButton.setStyle({
                strokeThickness: 0,
            });
        });

        resumeButton.on('pointerdown', () => {
            resumeButton.on('pointerup', () => {
                this.resume();
            });
            setTimeout(() => {
                resumeButton.off('pointerup');
            }, 500);
        });

        const quitButton = this.add
            .text(400, 350, 'Tillbaka till Huvudmenyn', {
                align: 'center',
                fill: 'white',
                fontFamily: 'Balsamiq Sans, sans-serif',
                fontSize: 32,
                stroke: '#000000',
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        quitButton.on('pointerover', () => {
            quitButton.setStyle({
                strokeThickness: 8,
            });
        });
        quitButton.on('pointerout', () => {
            quitButton.setStyle({
                strokeThickness: 0,
            });
        });

        quitButton.on('pointerdown', () => {
            quitButton.on('pointerup', () => {
                location.reload();
            });
            setTimeout(() => {
                quitButton.off('pointerup');
            }, 500);
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
