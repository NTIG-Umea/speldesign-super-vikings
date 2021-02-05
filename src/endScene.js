import Phaser from 'phaser';
import Hiscore from './Hiscore';

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    preload() {}

    create() {
        const hiscore = new Hiscore();
    }
}
