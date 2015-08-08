//https://codetree.net/t/multiple-inheritance-in-es6/2376
//borrowed this, assuming it works (shrug)

export function multiple(_classes){
  class MultipleClasses{}
  
  for (const _class of iterateObject(_classes)){
    const prototypeChain = [];
    let prototype = _class.prototype;
    do{
      prototypeChain.push(prototype);
    }
    while((prototype = prototype.__proto__) !== null)
    prototypeChain.reverse();
    for (const prototype of prototypeChain){
      assignNonEnumerable(MultipleClasses.prototype, prototype);
    }
  }
  
  Object.assign(MultipleClasses.prototype, _classes);
  
  return MultipleClasses;
}

function* iterateObject(obj){
  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys){
    yield obj[key];
  }
}

function assignNonEnumerable(target, source){
  const keys = Object.getOwnPropertyNames(source);
  for (const key of keys){
    Object.defineProperty(target, key, {
      enumerable:false,
      writable:true,
      configurable:true,
      value:source[key]
    });
  }
  const symbols = Object.getOwnPropertySymbols(source);
  for (const symbol of symbols){
    Object.defineProperty(target, symbol, {
      enumerable:false,
      writable:true,
      configurable:true,
      value:source[symbol]
    }); 
  }
}