import { mix } from './perlin';

export default {
    pointLabel: null,
    multLabel: null,
    multLabelFading: false,
    points: 0,
    multiplier: 1,
    displayMultiplier: 1,
    maxMultiplier: 8,
    minScale: 1,
    maxScale: 1.25,

    addPoints(amount, useMultiplier) {
        if (useMultiplier) {
            this.points += amount * (this.multiplier / (this.maxMultiplier / 2));
        } else {
            this.points += amount;
        }

        this.pointLabel.scale = Math.min(
            Math.max(this.pointLabel.scale + amount / 1000, this.minScale),
            this.maxScale
        );
    },

    increaseMultiplier(amount) {
        this.multiplier = Math.min(
            this.multiplier + amount,
            this.maxMultiplier
        );
        this.displayMultiplier = this.multiplier;
        this.multLabel.scale = Math.min(
            Math.max(this.multLabel.scale + 1, this.minScale),
            this.maxScale
        );
    },

    resetMultiplier() {
        this.multiplier = 1;
        this.multLabelFading = true;
    },

    preload(phaser) {},

    create(phaser) {
        this.pointLabel = phaser.add.text(20, 20, 'Points', {
            fontFamily: 'Balsamiq Sans',
            fontSize: '24px',
        });
        this.multLabel = phaser.add.text(20, 50, 'Multiplier', {
            fontFamily: 'Balsamiq Sans',
            fontSize: '24px',
        });
    },

    update(phaser, time, deltaTime) {
        this.pointLabel.text = Math.floor(this.points);
        this.multLabel.text = this.displayMultiplier + 'X';

        if (this.multiplier > 1) {
            this.multLabel.alpha = 1;
            this.multLabel.visible = true;
            this.multLabel.scale = Math.min(
                Math.max(this.multLabel.scale - deltaTime, this.minScale),
                this.maxScale
            );
        } else {
            this.multLabel.alpha -= deltaTime * 2;
        }

        this.pointLabel.scale = Math.min(
            Math.max(this.pointLabel.scale - deltaTime, this.minScale),
            this.maxScale
        );
    },
};
