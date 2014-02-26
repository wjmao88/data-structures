var makeQueue = function(){
  var instance = {};
  instance.head = 0;
  instance.tail = 0;
  // Use an object with numeric keys to store values
  instance.storage = {};

  _.extend(instance, queueMethods);

  return instance;
};

var queueMethods = {
  enqueue: function(value){
    this.storage[this.tail++] = value;
  },

  dequeue: function(){
    if (this.head === this.tail){
      return undefined;
    }
    var result = this.storage[this.head];
    delete this.storage[this.head++];
    return result;
  },

  size: function(){
    return this.tail - this.head;
  }
};
