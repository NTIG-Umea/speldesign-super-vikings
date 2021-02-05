import config from './config';
import Phaser from 'phaser';
import menuPause from './menuPause';
import MainScene from './mainScene';
import EndScene from './endScene';
import './css/fonts.scss';

const game = new Phaser.Game(config);
game.scene.add('MainScene', MainScene, true);
game.scene.add('menuPause', menuPause, false);
game.scene.add('endScene', EndScene, false);
