import BootState from './boot-state';

export default class MainGame {

  start () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
    game.state.add('boot', new BootState());
    game.state.start('boot');
  }

}
