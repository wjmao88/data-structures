var Stack = function() {
  // Use an object with numeric keys to store values
  this.storage = {};
  this.mySize = 0; // Hint = set an initial value here
};

Stack.prototype.push = function(value){
  this.storage[this.mySize++] = value;
};

Stack.prototype.pop = function(){
  if (this.mySize === 0){
    return undefined;
  }
  var result = this.storage[--this.mySize];
  this.storage[this.mySize] = undefined;
  return result;
};

Stack.prototype.size = function(){
  return this.mySize;
};
