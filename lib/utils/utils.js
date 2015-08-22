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

// same arrays values but can be different orders
export function equivalent(arr1, arr2) {
  if (allDistinct(arr1) !== allDistinct(arr2)) {
    return false;
  }

  return arr1.every((el1)=> {
    return arr2.some((el2)=> {
      return el1 == el2;
    });
  });
}

// truncate array down to unique values only
export function unique(arr) {
  return arr.reduce((out, el)=> {
    // if the element exists, ignore
    if (~out.indexOf(el)) { return out; }
    return out.push(el), out;
  }, []);
}

// check if all the values in an array are distinct
export function allDistinct(arr) {
  return arr.length === unique(arr).length;
}
