import { multiple } from '../utils/multiple';
import Movement from '../input/movement';
import BaseCharacter from './base-character';

export default class Hero extends multiple({BaseCharacter, Movement}) {

  constructor() {
    super();
    super.BaseCharacter();
    super.Movement();
    console.log('hero');
  }

}
