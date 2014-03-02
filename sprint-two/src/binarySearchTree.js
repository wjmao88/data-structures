var BinarySearchTree = function(value, parent, auto, debug){
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = parent || null;
  this.autoRebalance = auto === undefined? true : auto;;

  this.debug = function(){
    console.log('bst');
  };
};

BinarySearchTree.prototype.factory = function(value, parent, autoRebalance){
  return new BinarySearchTree(value, parent, autoRebalance, this.debug);
};

BinarySearchTree.prototype.insert = function(value){
  if (this.value === value){
    return;
  }
  var side = this.value > value ? 'left' : 'right';
  if (this[side] === null){
    this[side] = this.factory(value, this, this.autoRebalance);
    //this.autoRebalance? this.rebalance(this[side]) : '';
  } else {
    this[side].insert(value);
  }
  // every insert is reblancing every child starting from node
  //
  this.autoRebalance? this.rebalance(this[side]) : '';
};

BinarySearchTree.prototype.contains = function(value){
  return this.findNode(value) !== undefined;
};

BinarySearchTree.prototype.findNode = function(value){
  if (this.value === value){
    return this;
  }
  var side = this.value > value ? 'left' : 'right';
  if (this[side] === null){
    return undefined;
  }
  return this[side].findNode(value);
};

BinarySearchTree.prototype.remove = function(value){
  //value target is the node with the value to be deleted
  var valueTarget = this.findNode(value);
  //console.log('remove self');
  //console.log(valueTarget.toArray());
  if (valueTarget === undefined){
    return;
  }
  //node target is the actual node that needs to disappeare from the tree
  var nodeTarget = valueTarget.predecessor();
  if (nodeTarget.parent === null){
    nodeTarget = valueTarget.successor();
    if (nodeTarget === valueTarget){
      //no predecessor nor successor
      return;
    }
  }
  valueTarget.value = nodeTarget.value;
  nodeTarget.removeSelf();
  //console.log('remove self end');
  //console.log(valueTarget.toArray());
};

BinarySearchTree.prototype.removeSelf = function(){
  var leaf = this.left === null? this.right : this.left;
  var side = this.parent.left === this? 'left' : 'right';
  if (leaf !== null){
    leaf.parent = this.parent;
  }
  this.parent[side] = leaf;
  return leaf;
};

BinarySearchTree.prototype.depthFirstLog = function(func){
  if (this.left !== null){
    this.left.depthFirstLog(func);
  }
  func(this.value);
  if (this.left !== null){
    this.left.depthFirstLog(func);
  }
};

BinarySearchTree.prototype.breadthFirstLog = function(func){
  var arr = [];
  this.toArray(arr, 0);

  for (var i=0; i< arr.length; i++){
    func(arr[i]);
  }
};

BinarySearchTree.prototype.toArray = function(arr, head){
  arr = arr || [];
  head = head || 0;
  arr[head] = this.value;
  if (this.left !== null){
    this.left.toArray(arr, (head+1)*2-1); //2n
  }
  if (this.right !== null){
    this.right.toArray(arr, (head+1)*2);  //2n+1
  }
  return arr;
};

BinarySearchTree.prototype.closestValue = function(value){
  var left, right;
  if (this.left !== null){
    left = this.left.closestValue(value);
  }
  if (this.right !== null){
    right = this.right.closestValue(value);
  }
  var closest = this.value;
  if (left && left !== null && Math.abs(left - value) < Math.abs(closest - value)){
    closest = left;
  }
  if (right && right !== null && Math.abs(right - value) < Math.abs(closest - value)){
    closest = right;
  }
  return closest;
};

BinarySearchTree.prototype.depth = function(){
  return Math.max(this.leftDepth(), this.rightDepth()) + 1;
};

BinarySearchTree.prototype.leftDepth = function(){
  return this.left === null? 0 : this.left.depth();
};

BinarySearchTree.prototype.rightDepth = function(){
  return this.right === null? 0 : this.right.depth();
};

BinarySearchTree.prototype.isBalanced = function(leftDepth,rightDepth){
  return ( leftDepth < rightDepth && ((leftDepth === 0 && rightDepth < 2) || (leftDepth !== 0 && leftDepth * 2 >= rightDepth))  ) ||
        ( rightDepth < leftDepth && ((rightDepth === 0 && leftDepth < 2) || (rightDepth !== 0 && rightDepth * 2 >= leftDepth))  ) ||
        rightDepth === leftDepth;
};

BinarySearchTree.prototype.rebalance = function(){
  console.log('bst rebalance');
  //determine depth on either side
  var leftDepth = this.leftDepth();
  var rightDepth = this.rightDepth();
  if (this.isBalanced(leftDepth,rightDepth)) {
    return false;
  }
  //not balanced,
  //find the sidemost leaf
  var side = leftDepth > rightDepth? 'left' : 'right';
  var leafSide = leftDepth > rightDepth? 'right' : 'left';
  var sidemostLeaf = this[side].sidemostLeaf(leafSide);

  //save and replace value of head with value of the sidemost leaf
  var oldHeadValue = this.value;
  this.value = sidemostLeaf.value;

  //removing sidemost leaf and attach its child to its parent
  sidemostLeaf.parent[leafSide] = sidemostLeaf[side];
  if (sidemostLeaf[side] !== null){
    sidemostLeaf[side].parent = sidemostLeaf.parent;
  }
  //resinert revious value of head
  this.insert(oldHeadValue);
  return true;
};

BinarySearchTree.prototype.sidemostLeaf = function(side){
  var most = this;
  while( most[side] !== null){
    most = most[side];
  }
  return most;
};

BinarySearchTree.prototype.predecessor = function(){
  if (this.right === null){
    return this;
  }
  return this.right.sidemostLeaf('left');
};
BinarySearchTree.prototype.successor = function(){
  if (this.left === null){
    return this;
  }
  return this.left.sidemostLeaf('right');
};



