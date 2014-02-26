var makeQueue = function(){
  var instance = {};
  var head = 0;
  var tail = 0;
  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  instance.enqueue = function(value){
    storage[tail++] = value;
  };

  instance.dequeue = function(){
    if (head === tail){
      return undefined;
    }
    var result = storage[head];
    delete storage[head++];
    return result;
  };

  instance.size = function(){
    return tail - head;
  };

  return instance;
};
