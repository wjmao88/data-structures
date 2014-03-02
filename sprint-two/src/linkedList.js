var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToHead = function(value){
    var node = makeNode(value);
    if (this.head === null){
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
  };

  list.addToTail = function(value){
    var node = makeNode(value);
    if (this.head === null){
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }
  };

  list.removeHead = function(){
    var result = this.head;
    if (this.head !== null){
      this.head = this.head.next;
      this.head.previous = null;
    }
    return result;
  };

  list.removeTail = function(){
    var result = this.tail;
    if (this.tail !== null){
      this.tail = this.tail.previous;
      this.tail.next = null;
    }
    return result;
  };

  list.contains = function(target, node){
    node = node || this.head;
    if (node === null){
      return false;
    }
    if (node.value === target){
      return true;
    }
    if (node === list.tail){
      return false;
    }
    return this.contains(target, node.next);
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.previous = null;
  node.next = null;

  return node;
};
