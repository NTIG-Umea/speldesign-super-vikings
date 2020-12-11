import Phaser from 'phaser';

export default class menuPause extends Phaser.Scene {
  constructor () {
    super({ key: 'pause' });
  }

  create () {
    this.add.image(400, 300, 'sky');

    console.log(this.scene.isSleeping('play'));

    this.add.text(400, 200, 'Pause Menu Test', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0);

      const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      esc.on('down', () => {
        this.scene.switch('play')
      });
  }
}