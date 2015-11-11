import { isArray, cloneA, exists, removeUndefineds, contains } from '../utils/utils';
import { directionMap, interruptionMap, itemMap, actionMap } from '../constants/constants';
const { keys } = Object;

export default class KeyActions {

  constructor(game, hero) {
    this.game = game;
    this.hero = hero;
    this.activeKeys = [];
    this.mouseCoordinates = [];

    this.lastDirection = 'down';

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('mousemove', this.mousemove.bind(this));
  }

  //KEYPRESS METHODS

  keydown(e) {
    this.keySet(e.keyCode, true);
    this.setLastDirection(e.keyCode);
    this.keyAction(e.type);
  }

  keyup(e) {
    this.keySet(e.keyCode, false);
    this.keyAction(e.type);
  }

  keySet(keycode, isPressed) {
    var newSet = cloneA(this.activeKeys);
    newSet[keycode] = isPressed ? String(keycode) : null;
    this.activeKeys = newSet;
  }

  setLastDirection(keycode) {
    if (directionMap[String(keycode)]) {
      this.lastDirection = directionMap[String(keycode)];
    }
  }

  clarifiedDirections() {
    var directions = removeUndefineds(this.selectByKey(this.activeKeys, directionMap));
    var decidedDirections = this.decideDirections(directions);
    return decidedDirections;
  }

  decideDirections(directions) {
    if (contains(directions, 'left') && contains(directions, 'right')) {
      if (contains(['left', 'right'], this.lastDirection)) {
        var newDirs = directions.filter((dir)=> {
          return !contains(['left', 'right'], dir);
        });
        newDirs.push(this.lastDirection);
        return newDirs;
      }
    } else if (contains(directions, 'up') && contains(directions, 'down')) {
      if (contains(['up', 'down'], this.lastDirection)) {
        var newDirs = directions.filter((dir)=> {
          return !contains(['up', 'down'], dir);
        });
        newDirs.push(this.lastDirection);
        return newDirs;
      }
    } else {
      return directions;
    }
  }

  // the browser engine seems to implicitly limit the amount of keys
  // pressed to 2... since it's a continuously firing event. Still
  // need to check for competing directions if those two keys are
  // left and right, for instance.
  keyAction(type) {
    var directions = this.clarifiedDirections();
    var interrupts = removeUndefineds(this.selectByKey(this.activeKeys, interruptionMap));
    // reevaluate spriteDirection here incase opposing directions were held dowun for duration,
    // and one was released. This forces the sprite to turn.
    var spriteDirection = directions.length === 1 ? directions[0] : this.lastDirection;

    if (this.game.isPlaying) {
      this.hero.animate(type, directions, interrupts, spriteDirection);
    }
  }

  // expects arr = ['1', '2', ..., 'N'], vals must be stringed keys
  selectByKey(arr, arrayMap) {
    return arr
      .filter(exists)
      .map((el)=> {
        return arrayMap[el];
      });
  }

  //MOUSE METHODS

  click(e) {
    console.log(e.target);
  }

  mousemove(e) {
    this.mouseCoords([e.pageX, e.pageY]);
  }

  mouseCoords(coords) {
    if (!isArray(coords)) { return this.mouseCoordinates; }

    if (coords.every(Number.isFinite)) {
      this.mouseCoordinates = coords;
    }
  }

}

