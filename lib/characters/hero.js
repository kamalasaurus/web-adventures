import Movement from '../input/movement';
import BaseCharacter from './base-character';

export default class Hero extends BaseCharacter {

  constructor(game, img) {
    super(game, img);
    this.movement = new Movement(this);
  }

}
