import { isArray, cloneA, exists } from '../utils/utils';
import { directionMap, interruptionMap, itemMap, actionMap } from '../constants/constants';
const { keys } = Object;

export default class KeyActions {

  constructor(game, hero) {
    this.game = game;
    this.hero = hero;
    this.activeKeys = [];
    this.mouseCoordinates = [];

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('mousemove', this.mousemove.bind(this));
  }

  //KEYPRESS METHODS

  keydown(e) {
    this.keySet(e.keyCode, true);
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

  // the browser engine seems to implicitly limit the amount of keys
  // pressed to 2... since it's a continuously firing event. Still
  // need to check for competing directions if those two keys are
  // left and right, for instance.
  keyAction(type) {
    var directions = this.selectByKey(this.activeKeys, directionMap);
    var interrupts = this.selectByKey(this.activeKeys, interruptionMap);

    if (this.game.isPlaying) {
      this.hero.animate(type, directions, interrupts);
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
