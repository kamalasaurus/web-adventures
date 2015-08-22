import { newArray } from '../utils/utils';
import { INTERVAL } from '../constants/constants';

export default class BaseCharacter {

  constructor(game, img) {
    this.game = game;
    this.sprite = new Image(442, 390);
    this.sprite.src = img;

    this.animationIndex = 0;
    this.movementTimer = null;

    this.activeDirections = [];
    this.activeInterrupts = [];

    this.isLeft = false;
    this.isRight = false;
    this.isUp = false;
    this.isDown = true;

    this.fullHealth = 6;
    this.currentHealth = 5;

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

  animate(type, directions, interrupts) {

    //TODO: set animation index to 0 if directions are different from previous directions.
    //TODO: set animation index to 0 if interrupts are engaged.  Only allow one interrupt.
    //TODO: interrupts can come from multiple sources, not just keydown... accommodate for
    //common mutable state.

    //set movement state to 'stopped' if directions == [] && interrupts == []
    //clear interval when stopped...
    //or always have the interval going, and change the cycles only

    this.setDirection(direction);

    console.log(this);

    if (!this.movementTimer) {
      this.sequence = this.sequences.moving[this.getDirection()];
      this.movementTimer = window.setInterval(
        this.move[this.getDirection()].bind(this),
        INTERVAL
      );
    }

    if (type === 'keydown') {
      if (!this.movementTimer) { this.animationIndex = 0; }
    } else if (type === 'keyup') {
      this.sequence = this.sequences.stopped[this.getDirection()];
      window.clearInterval(this.movementTimer);
      this.movementTimer = null;
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

  stop() {
    this.sequence = this.sequences.stopped[this.getDirection()];
  }

  attack() {
    this.sequence = this.sequences.attacking[this.getDirection()];
  }

  move() {
    return {
      left:  ()=> { this.position.x -= 12; },
      right: ()=> { this.position.x += 12; },
      up:    ()=> { this.position.y -= 12; },
      down:  ()=> { this.position.y += 12; }
    }
  }

  setDirection(direction) {
    this.clearDirections();
    var directions = {
      left:  ()=> { this.isLeft = true; },
      right: ()=> { this.isRight = true; },
      up:    ()=> { this.isUp = true; },
      down:  ()=> { this.isDown = true; }
    };

    directions[direction].call(this);
  }

  clearDirections() {
    this.isLeft = false;
    this.isRight = false;
    this.isUp = false;
    this.isDown = false;
  }

  getDirection() {
    if      (this.isLeft)  { return 'left'; }
    else if (this.isRight) { return 'right'; }
    else if (this.isUp)    { return 'up'; }
    else if (this.isDown)  { return 'down'; }
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
  sequence = newArray(length)
    .map((el, i)=> {
      return {
        x: ((i * dimension) + xPos),
        y: yPos
      };
    });

  return sequence;
}
