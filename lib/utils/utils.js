const { keys } = Object;

export function newArray(length) {
  return cloneA(new Uint8ClampedArray(length));
}

export function isArray(arr) {
  return arr instanceof Array;
}

export function cloneA(arr) {
  return Array.prototype.slice.call(arr);
}

export function isTrue(bool) {
  return bool;
}

export function exists(el) {
  return !!el;
}

// check if arrays have same values, if redundant
// values, must have same number of redundancy,
// can have arbitrary order
export function equivalent(arr1, arr2) {
  var hist1 = histogram(arr1);
  var hist2 = histogram(arr2);
  var keys1 = keys(hist1);
  var keys2 = keys(hist2);

  return ((keys1.length === keys2.length) &&  // must be same length
          (softEquivalence(keys1, keys2)) &&  // hist guarantees uniqueness, soft guarantees sameness
          (keys1.some((key)=> {
            hist1[key] === hist2[key];
          })) // makes sure each hist is equivalent
         );
}

// satisfies that all the elements of arr1 exist in arr2,
// but doesn't check for redundancy.
// guarantees arr1 is a subset of arr2
export function softEquivalence(arr1, arr2) {
  return arr1.every((el1)=> {
    return arr2.some((el2)=> {
      return el1 === el2;
    });
  });
}

// return array values and number of occurrences
// guarantees unique keys
export function histogram(arr) {
  return arr.reduce((o, el)=> {
    return o[el] ? o[el] += 1 : o[el] = 1, o;
  }, {});
}

// truncate array down to unique values only
export function unique(arr) {
  return arr.reduce((out, el)=> {
    // if the element exists, ignore
    if (contains(out, el)) { return out; }
    return out.push(el), out;
  }, []);
}

// check if all the values in an array are distinct
export function allDistinct(arr) {
  return arr.length === unique(arr).length;
}

export function contains(arr, val) {
  return !!~out.indexOf(val);
}

export function isEmpty(arr) {
  return arr.length === 0;
}
