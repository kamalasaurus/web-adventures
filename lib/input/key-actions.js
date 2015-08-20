import { selectByKey } from '../utils/utils';
const { keys } = Object;

export default class KeyActions {

  constructor(game, hero) {
    this.game = game;
    this.hero = hero;
    this.activeKeys = [];

    document.addEventListener('keydown', this.keypress.bind(this));
    document.addEventListener('keyup', this.keypress.bind(this));
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('mousemove', this.mousemove.bind(this));

  }

  keypress(e) {

    if (e.type === 'keydown') {
      console.log(e.keyCode);
      this.activeKeys[e.keyCode] = true;

      ///////
      // if (!this.hero.movementTimer) { this.hero.animationIndex = 0; }
    } else if (e.type === 'keyup') {
      this.activeKeys[e.keyCode] = false;

      ///////
      // this.hero.sequence = hero.sequences.stopped[this.getDirection()];
      // window.clearInterval(hero.movementTimer);
      // this.hero.movementTimer = null;
    }

    var directions = selectByKey(this.activeKeys, directionMap);
    var interrupts = selectByKey(this.activeKeys, interruptionMap);

    if (this.game.isPlaying) {
      this.hero.animate(directions, interrupts);
    }
    
  }

  click(e) {
    console.log(e.target);
  }

  mousemove(e) {
    console.log(e.pageX);
    console.log(e.pageY);
  }

}

const directionMap = {
  '37' : 'left',     //left arrow
  '38' : 'up',       //up arrow
  '39' : 'right',    //right arrow
  '40' : 'down',     //down arrow
  '65' : 'left',     //a
  '87' : 'up',       //w
  '68' : 'right',    //d
  '83' : 'down',     //s
};

const interruptionMap = {
  '32' : 'melee',   //space bar
  '9'  : 'ranged',  //tab
  '16' : 'dodge',   //shift
};

const itemMap = {
  '48' : 'zero',
  '49' : 'one',
  '50' : 'two',
  '51' : 'three',
  '52' : 'four',
  '53' : 'five',
  '54' : 'six',
  '55' : 'seven',
  '56' : 'eight',
  '57' : 'nine',
};

const actionMap = {
  '27' : 'cancel',   //escape
  '88' : 'x',
  '17' : 'control',
  '18' : 'option',
  '224': 'command',
};

