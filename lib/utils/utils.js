export function newArray(length) {
  return Array.prototype.slice.call(new Uint8ClampedArray(length));
}

export function selectByKey(arr, arrayMap) {
  if (!(arr instanceof Array)) { console.error('requires array'); }
  return arr
    .map((key)=> {
      return arrayMap[String(key)];
    })
    .reduce((output, key)=> {
      if (key && !~output.indexOf(key)) { output.push(key); }
      return output;
    }, []);
}
