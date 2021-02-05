import config from './config';
import Phaser from 'phaser';
import menuPause from './menuPause';
import MainScene from './mainScene';
import Hiscore from './Hiscore';
import './css/fonts.scss';

const game = new Phaser.Game(config);
game.scene.add('MainScene', MainScene, true);
game.scene.add('menuPause', menuPause, false);

(async () => {
    const h2 = document.createElement('h2');
    h2.textContent = 'Topplista';
    h2.style.marginTop = '16px';
    const hiscoreList = document.createElement('ul');

    const response = await new Hiscore('http://localhost:3000').getScore(7);
    const scores = JSON.parse(response).result;

    scores.forEach((score) => {
        const name = score.name;
        const points = score.score;

        const item = document.createElement('li');
        item.textContent = `${name}: ${points}`;
        hiscoreList.appendChild(item);
    });

    document.body.appendChild(h2);
    document.body.appendChild(hiscoreList);
})();
