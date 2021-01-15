import config from './config';
import Phaser from 'phaser';
import menuPause from './menuPause';
import menu from './menu';
import * as animations from './animations';
import logoAnimation from '../assets/animations/logo/logo';
import player from './player';
import background from './background';
import MainScene from './mainScene';

const game = new Phaser.Game(config);
game.scene.add('MainScene', MainScene, true)
game.scene.add('menuPause', menuPause, false)