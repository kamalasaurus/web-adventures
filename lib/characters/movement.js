import { moveVectors } from '../constants/constants';
import { softEquivalence } from '../utils/utils';

export default class Movement {

  constructor(character, game) {
    this.character = character;
    this.game = game;
    this.x = 0;
    this.y = 60;
    this.directions = [];
    this.moveVector = [0, 0];
  }

  setDirection(directions) {
    // softEquivalence has two functions:
    // 1) don't bother recalculating if the same
    // 2) more importantly, if a negating direction has
    //  already been fed in, the directions[] will store
    //  the two negating values.  If someone is lazy and
    //  holds both keys for a long period of time, it
    //  won't oscillate between the two values.
    if (!softEquivalence(directions, this.directions)) {
      this.directions = directions;
      var vectors = directions.map(this.mapDirs);
      var dir = this.checkVecs(vectors);
      this.moveVector = this.combine(dir);
    }
  }

  mapDirs(dir) {
    return moveVectors[dir];
  }

  checkVecs(vecs) {

    var mVec = this.moveVector;

    if (this.totalMag(mVec) === 0) {
      return vecs;
    }

    // test if directions negate the previous direction.
    // if they do, return the new direction.

    var testArr = vecs.map((vec)=> {
      var test = [vec];
      test.push(this.moveVector);
      return this.totalMag(this.addVec(test));
    });

    var idx = testArr.indexOf(0);

    return ~idx ? [vecs[idx]] : vecs;

  }

  totalMag(vec) {
    return vec.reduce((sum, val)=> {
      return sum += val;
    }, 0);
  }

  combine(vecs) {
    return this.norm(this.addVec(vecs));
  }

  // vectors must be of the same dimension (1 x 2)
  // [[x,y], [x,y]]
  // Does Javascript have vector addition? Could remove the map.
  // Could generalize to N dimensions by initializing sum w/ 0s of
  // vecs[0].length...  unnecessary for now.
  addVec(vecs) {
    return vecs.reduce((sum, vec)=> {
      if (vec === undefined) { return sum; }
      return vec.map((v, i)=> {
        return v + sum[i];
      });
    }, [0, 0]);
  }

  norm(vec) {
    var mag = this.magnitude(vec) || 1;
    return vec.map((val)=> {
      return val/mag;
    });
  }

  magnitude(vec) {
    var hyp = vec.reduce((acc, val)=> {
      return acc += Math.pow(val, 2);
    }, 0);

    return Math.pow(hyp, (1/2));
  }

  scale(val) {
    return 12 * val;
  }

  move(directions) {
    return ()=> {
      this.x += this.scale(this.moveVector[0]);
      this.y += this.scale(this.moveVector[1]);
    }
  }

  reset() {
    this.directions = [];
    this.moveVector = [0, 0];
  }

}

