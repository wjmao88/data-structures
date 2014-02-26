var Queue = function(){
  this.head = 0;
  this.tail = 0;
  // Use an object with numeric keys to store values
  this.storage = {};
};

Queue.prototype.enqueue = function(value){
  this.storage[this.tail++] = value;
};

Queue.prototype.dequeue = function(){
  if (this.head === this.tail){
    return undefined;
  }
  var result = this.storage[this.head];
  delete this.storage[this.head++];
  return result;
};

Queue.prototype.size = function(){
  return this.tail - this.head;
};
