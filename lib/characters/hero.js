import BaseCharacter from './base-character';

export default class Hero extends BaseCharacter {

  // Hero movement is controlled by the KeyActions class
  // Hero is attached at a new game instance. Should be
  // interchangeable if there are multiple heroes.  

  constructor(game, img) {
    super(game, img);
    // always favor composition for multiple inheritance
    // by saying this.blah = new Blah(this, ...)

    // user data will require a database query
    // store to indexedDb, only occasionally update the
    // server with updated user data.
    // or if they explicitly hit save.

    // this.inventory = new Inventory(user.hero);
    // this.status = new Status(user.hero);
  }

}
