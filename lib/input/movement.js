var keyCheck = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down',
  '32': 'space'
};

export default class Movement {

  constructor(character) {
    this.character = character;
  }

  keydown(e) {
    var direction = keyCheck[String(e.keyCode)];
    character.activeKeys[e.keyCode] = true;
    if (direction !== undefined)  { character.animate.call(this, direction); }
    if (!character.movementTimer) { character.animationIndex = 0; }
  }

  keyup(e) {
    character.activeKeys[e.keyCode] = false;
    character.sequence = character.sequences.stopped[this.getDirection()];
    window.clearInterval(character.movementTimer);
    character.movementTimer = null;
  }

  attack() {
    character.sequence = character.sequences.attacking[this.getDirection()];
  }

  move() {
    return {
      left:  ()=> { character.position.x -= 12; },
      right: ()=> { character.position.x += 12; },
      up:    ()=> { character.position.y -= 12; },
      down:  ()=> { character.position.y += 12; }
    }
  }

  setDirection(direction) {
    this.clearDirections();
    var directions = {
      left:  ()=> { character.isLeft = true; },
      right: ()=> { character.isRight = true; },
      up:    ()=> { character.isUp = true; },
      down:  ()=> { character.isDown = true; }
    };

    directions[direction].call(this);
  }

  clearDirections() {
    character.isLeft = false;
    character.isRight = false;
    character.isUp = false;
    character.isDown = false;
  }

  getDirection() {
    if      (character.isLeft)  { return 'left'; }
    else if (character.isRight) { return 'right'; }
    else if (character.isUp)    { return 'up'; }
    else if (character.isDown)  { return 'down'; }
  }

}
