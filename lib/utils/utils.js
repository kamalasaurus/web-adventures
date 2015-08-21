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
