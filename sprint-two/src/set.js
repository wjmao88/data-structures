var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = undefined;
  set.hasUndefined = false;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
  this._storage = this._storage || {};
  this._storage[JSON.stringify(item)] = item;
  if (item === undefined){
    this.hasUndefined = true;
  }
};

setPrototype.contains = function(item){
  if (item === undefined){
    return this.hasUndefined;
  }
  return this._storage && this._storage[JSON.stringify(item)] !== undefined;
};

setPrototype.remove = function(item){
  delete this._storage[JSON.stringify(item)];
  if (item === undefined){
    this.hasUndefined = false;
  }
};
