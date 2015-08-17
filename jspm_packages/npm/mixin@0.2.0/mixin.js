/* */ 
var util = require("util");
function mixin(base, mixin) {
  var ctor = base;
  if (base.constructors) {
    for (var i in base.constructors) {
      if (base.constructors[i] === mixin)
        return base;
    }
    base.constructors.unshift(mixin);
  } else {
    base.constructors = [mixin, base];
    ctor = base.prototype.constructor = mixin_constructor(base.name, base);
    ctor.__proto__ = base;
  }
  ctor.prototype = insert_proto(base.prototype, mixin.prototype);
  insert_proto(ctor.__proto__, mixin);
  if (mixin.hasOwnProperty('included')) {
    var incl = mixin.included.call(mixin, ctor);
    if (incl) {
      ctor = incl;
    }
  }
  return ctor;
}
function mixin_constructor(name, ctor) {
  var str = "function __ctor() { var c = ctor.constructors; for (var i in c) { c[i].apply(this, arguments); } }";
  eval(str.replace(/__ctor/, name));
  return eval(name);
}
function insert_proto(base, mixin) {
  var copy = copyInto({}, mixin);
  copy.__mixed_in = true;
  for (var p = base,
      prev = base; p.__mixed_in; prev = p, p = p.__proto__) {}
  if (p == base) {
    p.__mixed_in = true;
  }
  copy.__proto__ = prev.__proto__;
  prev.__proto__ = copy;
  return base;
}
function copyInto(copy, obj) {
  var names = Object.getOwnPropertyNames(obj);
  for (var i in names) {
    var p = names[i];
    if (p !== 'prototype') {
      var descr = Object.getOwnPropertyDescriptor(obj, p);
      Object.defineProperty(copy, p, descr);
    }
  }
  return copy;
}
mixin.copyInto = copyInto;
function inspect_protos(obj, name) {
  console.log(name + " = " + util.inspect(obj));
  var i = 0;
  while (obj.__proto__) {
    obj = obj.__proto__;
    console.log("  __proto__[" + i + "] = " + util.inspect(obj));
    ++i;
  }
}
function alias(obj, method, suffix, f) {
  if (obj[method + "_without_" + suffix]) {
    throw (method + "_without_" + suffix + " already defined.");
  }
  var was = obj[method];
  obj[method + "_without_" + suffix] = was;
  obj[method + "_with_" + suffix] = obj[method] = f;
}
mixin.alias = alias;
module.exports = mixin;
