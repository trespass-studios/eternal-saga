import MainGame from './game';

// Game entry point
window.onload = function() {
  var game = new MainGame();
  game.start();
};
