var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var node = makeNode(value);
    if (this.head === null){
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  };

  list.removeHead = function(){
    var result = this.head;
    if (this.head !== null){
      this.head = this.head.next;
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
  node.next = null;

  return node;
};
