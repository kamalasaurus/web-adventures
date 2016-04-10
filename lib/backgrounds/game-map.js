export default class GameMap {

  constructor(game, img) {
    this.game = game;
    this.tile = new Image(186, 186);
    this.tile.src = img;
  }

  draw() {
    var pattern = this.game.context.createPattern(this.tile, 'repeat');
    this.game.context.fillStyle = pattern;
    this.game.context.fillRect(0, 0, this.game.width, this.game.height);
  }

}

