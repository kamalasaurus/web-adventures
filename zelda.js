var INTERVAL = 50;

window.game = {

  container: null,
  canvas: null,
  context: null,
  timer: null,

  link: null,

  initialize: function() {
    this.drawGame();
    this.resize();

    this.link = new window.link(this, './sprites/link.png');
    this.healthbar = new window.healthbar(this, this.link, './sprites/hearts.png');
    this.timer = window.setInterval(
      this.refresh.bind(this),
      INTERVAL
    );

    document.addEventListener('keydown', this.link.keydown.bind(this.link));
    document.addEventListener('keyup', this.link.keyup.bind(this.link));
    
  },

  drawGame: function() {
    var container = document.querySelector('header');
    var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'zelda');
    var context = canvas.getContext('2d');

    this.container = container;
    this.canvas = canvas;
    this.context = context;

    container.appendChild(canvas);
  },

  refresh: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.link.draw();
    this.healthbar.draw();
  },

  resize: function() {
    this.width = this.context.canvas.width = this.container.offsetWidth;
    this.height = this.context.canvas.height = this.container.offsetHeight;
  }
}

window.link = function(game, img) {

  var spriteSequenceDirections = window.spriteSequenceDirections;

  this.game = game;
  this.sprite = new Image(442, 390);
  this.sprite.src = img;

  this.animationIndex = 0;
  this.movementTimer = null;

  this.isAttacking = false;

  this.isLeft = false;
  this.isRight = false;
  this.isUp = false;
  this.isDown = true;

  this.fullHealth = 6;
  this.currentHealth = 5;

  this.activeKeys = [];

  this.sequences = {

    stopped: new spriteSequenceDirections(
      [5, 0, 1],
      [2, 0, 1],
      [4, 0, 1],
      [0, 1, 1]
    ),

    moving: new spriteSequenceDirections(
      [8, 1, 6],
      [0, 4, 8],
      [8, 4, 6],
      [0, 1, 8]
    ),

    attacking: new spriteSequenceDirections(
      [8, 3, 5],
      [0, 6, 5],
      [8, 6, 5],
      [0, 3, 6]
    )

  };

  this.position = {
    x: 0,
    y: 60
  };

  this.sequence = window.spritePositions(0, 0, 1);

  this.keydown = function(e) {
    var direction = this.keyCheck[String(e.keyCode)];
    this.activeKeys[e.keyCode] = true;
    if (direction !== undefined) { this.animate.call(this, direction); }
    if (!this.movementTimer)     { this.animationIndex = 0; }
  };

  this.keyup = function(e) {
    this.activeKeys[e.keyCode] = false;
    this.sequence = this.sequences.stopped[this.getDirection()];
    window.clearInterval(this.movementTimer);
    this.movementTimer = null;
  };

  this.animate = function(direction) {
    this.setDirection(direction);
    if (!this.movementTimer) {
      this.sequence = this.sequences.moving[this.getDirection()];
      this.movementTimer = window.setInterval(
        this.move[this.getDirection()].bind(this),
        INTERVAL
      );
    }
  };

  this.attack = function() {
    this.sequence = this.sequences.attacking[this.getDirection()];
  };

  this.move = {
    left:  function() { this.position.x -= 12; }.bind(this),
    right: function() { this.position.x += 12; }.bind(this),
    up:    function() { this.position.y -= 12; }.bind(this),
    down:  function() { this.position.y += 12; }.bind(this),
  };

  this.setDirection = function(direction) {
    this.clearDirections();
    var directions = {
      left:  function() { this.isLeft = true; },
      right: function() { this.isRight = true; },
      up:    function() { this.isUp = true; },
      down:  function() { this.isDown = true; }
    };

    directions[direction].call(this);
  };

  this.clearDirections = function() {
    this.isLeft = false;
    this.isRight = false;
    this.isUp = false;
    this.isDown = false;
  };

  this.getDirection = function() {
    if      (this.isLeft)  { return 'left'; }
    else if (this.isRight) { return 'right'; }
    else if (this.isUp)    { return 'up'; }
    else if (this.isDown)  { return 'down'; }
  };

  this.keyCheck = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '32': 'space'
  };

  this.draw = function() {

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

  };

}

window.spriteSequenceDirections = function(left, up, right, down) {

  var spritePositions = window.spritePositions;

  return {
    left:  spritePositions.apply(this, left),
    up:    spritePositions.apply(this, up),
    right: spritePositions.apply(this, right),
    down:  spritePositions.apply(this, down)
  }
}

window.spritePositions = function(x, y, length) {
  var dimension, xPos, yPos, sequence;

  dimension = 30;
  xPos = x * dimension;
  yPos = y * dimension;
  sequence = Array.prototype.slice
    .call(new Uint8ClampedArray(length))
    .map(function(el, i) {
      return {
        x: ((i * dimension) + xPos),
        y: yPos
      };
    });

  return sequence;
}

window.healthbar = function(game, hero, img) {

  this.game = game;
  this.hero = hero;
  this.sprite = new Image(384, 128);
  this.sprite.src = img;

  this.dimension = 32;

  this.heart = function() { return [this.sprite, 0, 0, 128, 128,]; };
  this.halfHeart = function() { return [this.sprite, 128, 0, 128, 128]; };
  this.emptyHeart = function() { return [this.sprite, 256, 0, 128, 128]; };

  this.fullHealth = hero.fullHealth;
  this.currentHealth = hero.currentHealth;

  this.barLength = function() {
    return Math.floor(this.fullHealth / 2);
  };

  this.hearts = function() {
    return Math.floor(this.currentHealth / 2);
  };

  this.hasHalfHeart = function() {
    return this.currentHealth % 2;
  };

  this.currentHealthBar = function() {
    return Array.prototype.slice
      .call(new Uint8ClampedArray(this.barLength()))
      .map(function(e, i) {
          if ( i < this.hearts() ) {
            return this.heart();
          } else if ( i === this.hearts() && this.hasHalfHeart()) {
            return this.halfHeart();
          } else {
            return this.emptyHeart();
          }
        }.bind(this)
      );
  };

  this.draw = function() {
    this.currentHealthBar().forEach(this.drawHearts.bind(this));
  };

  this.drawHearts = function(heart, i) {
    thisheart = heart.concat([(i * this.dimension), 0, this.dimension, this.dimension]);
    this.game.context.drawImage.apply(this.game.context, thisheart);
  };

}

window.onload = window.game.initialize.bind(window.game);
window.onresize = window.game.resize.bind(window.game);
