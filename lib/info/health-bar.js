import { newArray } from '../utils/utils';

export default class HealthBar {

  constructor(game, hero, img) {
    this.game = game;
    this.hero = hero;
    this.sprite = new Image(384, 128);
    this.sprite.src = img;

    this.dimension = 32;

    this.fullHealth = hero.fullHealth;
    this.currentHealth = hero.currentHealth;
  }

  heart() {
    return [this.sprite, 0, 0, 128, 128,];
  }

  halfHeart() {
    return [this.sprite, 128, 0, 128, 128];
  }

  emptyHeart() {
    return [this.sprite, 256, 0, 128, 128];
  }

  barLength() {
    return Math.floor(this.fullHealth / 2);
  }

  hearts() {
    return Math.floor(this.currentHealth / 2);
  }

  hasHalfHeart() {
    return this.currentHealth % 2;
  }

  currentHealthBar() {
    return newArray(this.barLength())
      .map((e, i)=> {
        if ( i < this.hearts() ) {
          return this.heart();
        } else if ( i === this.hearts() && this.hasHalfHeart()) {
          return this.halfHeart();
        } else {
          return this.emptyHeart();
        }
      });
  }

  draw() {
    this.currentHealthBar().forEach(this.drawHearts.bind(this));
  }

  drawHearts(heart, i) {
    var thisheart = heart.concat([(i * this.dimension), 0, this.dimension, this.dimension]);
    this.game.context.drawImage.apply(this.game.context, thisheart);
  }

}  
