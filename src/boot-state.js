
export default class BootState {

  constructor () {
    console.debug('BootState.constructor called');
  }

  preload (game) {
    game.load.image('logo', './images/phaser.png');
  }

  create (game) {
    console.debug('BootState.create called');
    var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }

}
