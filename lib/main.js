import Hero from './characters/hero';
import HealthBar from './info/health-bar';

()=> {
  var hero = new Hero();
  var healthBar = new HealthBar(hero);
  console.log('game');
}();
