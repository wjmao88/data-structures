var makeStack = function() {
  var instance = {};

  // Use an object with numeric keys to store values
  instance.storage = {};
  instance.mySize = 0; // Hint: set an initial value here

  _.extend(instance, stackMethods);

  return instance;
};

var stackMethods = {
  push: function(value){
    this.storage[this.mySize++] = value;
  },

  pop: function(){
    if (this.mySize === 0){
      return undefined;
    }
    var result = this.storage[--this.mySize];
    this.storage[this.mySize] = undefined;
    return result;
  },

  size: function(){
    return this.mySize;
  }
};
