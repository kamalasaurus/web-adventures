import Hero from './characters/hero';
import HealthBar from './info/health-bar';
import KeyActions from './input/key-actions';
import { INTERVAL } from './constants/constants';

export default class Game {

  constructor() {

    this.isPlaying = true;
    // this.isMessaging = false;
    // this.isInMenu = false;

    this.drawGame();
    this.resize();

    //this.gameMap = new GameMap(user.coordinates);
    this.hero = new Hero(this, '../sprites/link.png');
    this.healthBar = new HealthBar(this, this.hero, '../sprites/hearts.png');

    this.refreshInterval = window.setInterval(
      this.refresh.bind(this),
      INTERVAL
    );

    this.keyActions = new KeyActions(this, this.hero);
    
    window.onresize = this.resize.bind(this);

  }

  drawGame() {
    var container = document.querySelector('#app');
    var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'game');
    var context = canvas.getContext('2d');

    this.container = container;
    this.canvas = canvas;
    this.context = context;

    container.appendChild(canvas);
  }

  refresh() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.hero.draw();
    this.healthBar.draw();
  }

  resize() {
    this.width = this.context.canvas.width = this.container.offsetWidth;
    this.height = this.context.canvas.height = this.container.offsetHeight;
  }

}