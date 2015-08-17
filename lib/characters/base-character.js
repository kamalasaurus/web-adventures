export default class BaseCharacter {

  constructor(game, img) {
    this.game = game;
    this.sprite = new Image(442, 390);
    this.sprite.src = img;

    this.animationIndex = 0;
    this.movementTimer = null;

    this.isAttacking = false;

    this.isLeft = false;
    this.isRight = false;
    this.isUp = false;
    this.isDown = true;

    this.fullHealth = 6;
    this.currentHealth = 5;

    this.activeKeys = [];

    this.position = {
      x: 0,
      y: 60
    }

    this.sequence = spritePositions(0, 0, 1);

    this.sequences = {

      stopped: new SpriteSequenceDirections(
        [5, 0, 1],
        [2, 0, 1],
        [4, 0, 1],
        [0, 1, 1]
      ),

      moving: new SpriteSequenceDirections(
        [8, 1, 6],
        [0, 4, 8],
        [8, 4, 6],
        [0, 1, 8]
      ),

      attacking: new SpriteSequenceDirections(
        [8, 3, 5],
        [0, 6, 5],
        [8, 6, 5],
        [0, 3, 6]
      )

    }

  }

  animate(direction) {
    this.setDirection(direction);
    if (!this.movementTimer) {
      this.sequence = this.sequences.moving[this.getDirection()];
      this.movementTimer = window.setInterval(
        this.move[this.getDirection()].bind(this),
        INTERVAL
      );
    }
  }

  draw() {

    if (this.sequence[this.animationIndex] === undefined) {
      this.animationIndex = 0;
    }

    this.game.context.drawImage(
      this.sprite,
      this.sequence[this.animationIndex].x, //sprite sheet positions
      this.sequence[this.animationIndex].y,
      30,
      30,
      this.position.x, //canvas position
      this.position.y,
      90,
      90
    );

    if (this.animationIndex < this.sequence.length - 1) {
      this.animationIndex += 1;
    } else {
      this.animationIndex = 0;
    }

  }

}

class SpriteSequenceDirections {

  constructor(left, up, right, down) {
    this.left =  spritePositions.apply(this, left);
    this.up =    spritePositions.apply(this, up);
    this.right = spritePositions.apply(this, right);
    this.down =  spritePositions.apply(this, down);
  }

}

function spritePositions(x, y, length) {
  var dimension, xPos, yPos, sequence;

  dimension = 30;
  xPos = x * dimension;
  yPos = y * dimension;
  sequence = Array.prototype.slice
    .call(new Uint8ClampedArray(length))
    .map((el, i)=> {
      return {
        x: ((i * dimension) + xPos),
        y: yPos
      };
    });

  return sequence;
}
