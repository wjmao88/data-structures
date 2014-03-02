var HashTable = function(){
  this._limit = 2;
  this._storage = makeLimitedArray(this._limit);
  this.occupied = 0;
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined){
    return null;
  }
  return this._storage.get(i)[k] || null;
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined){
    this._storage.set(i, {});
    this.occupied++;
  }
  this._storage.get(i)[k] = v;
  this.rehash();
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined){
    return null;
  }
  delete this._storage.get(i)[k];
  if (Object.keys(this._storage.get(i)).length === 0){
    this._storage.set(i, undefined);
    this.occupied--;
  }
  this.rehash();
};

HashTable.prototype.rehash = function(){
  var newStorage;
  var newLimit;
  if (this.occupied/this._limit >= 0.75){
    newLimit = this._limit * 2;
    newStorage = makeLimitedArray(newLimit);
  } else if (this.occupied/this._limit < 0.25 && this._limit !== 1) {
    newLimit = this._limit / 2;
    newStorage = makeLimitedArray(newLimit);
  } else {
    return;
  }
  //console.log('old occupied ' + this.occupied + ' out of ' + this._limit);
  this.occupied = 0;
  var context = this;
  this._storage.each(function(bucket){
    if (bucket === undefined){
      return;
    }
    var keys = Object.keys(bucket);
    for (var i=0; i< keys.length; i++){
      var hash = getIndexBelowMaxForKey(keys[i], newLimit);
      if (newStorage.get(hash) === undefined){
        newStorage.set(hash, {});
        context.occupied++;
      }
      newStorage.get(hash)[keys[i]] = context.retrieve(keys[i]);
    }
  });
  //console.log('new occupied ' + this.occupied  + ' out of ' + newLimit);
  this._storage = newStorage;
  this._limit = newLimit;
};
