var RBT = function(value, parent, auto, debug){
  BinarySearchTree.apply(this, arguments);
  this.value = value;
  this.color = (parent === undefined || parent === null)? 'black' : 'red';
  this.left = null;
  this.right = null;
  this.parent = parent || null;
  this.autoRebalance = true;
  this.debug = debug;
};

(function(){
  RBT.prototype = Object.create(BinarySearchTree.prototype);
  RBT.prototype.contructor = RBT;
}());

RBT.opposite = function(side){
  return side==='left'? 'right': 'left';
};

RBT.isBlack = function(node){
  return (node === null || node.color === 'black');
};

RBT.isRed = function(node){
  return node !== null && node.color === 'red';
};

RBT.prototype.factory = function(value, parent, autoRebalance, debug){
  return new RBT(value, parent, autoRebalance, this.debug);
};

RBT.prototype.toArray = function(arr, head){
  arr = arr || [];
  head = head || 0;
  arr[head] = '{ ' + this.value + ' : ' + this.color + ' }';
  if (this.left !== null){
    this.left.toArray(arr, (head+1)*2-1); //2n
  }
  if (this.right !== null){
    this.right.toArray(arr, (head+1)*2);  //2n+1
  }
  return arr;
};

RBT.prototype.removeSelf = function(){
  var replacingNode = BinarySearchTree.prototype.removeSelf.call(this);
  if (this.color === 'red'){
    //removing a red need no changes
    return;
  }
  //this node is black
  if (replacingNode !== null && replacingNode.color === 'red'){
    //if the replacing node is red, simply color it black
    //to return black-depth of this subtree to its previous level
    replacingNode.color = 'black';
    return;
  }
  var sibling = this.left === replacingNode? this.left : this.right;
  //debugger;
  this.parent.propagatedFrom(sibling);
};

RBT.prototype.propagatedFrom = function(sibling){
  //case 1
  if (this.color === 'black' && sibling !== null && sibling.color === 'red'){
    return this.case1(sibling);
  }
  //case 2
  if (sibling === null || sibling.color === 'black'){
    return this.case2(sibling);
  }
  //case 3
  if (sibling.color === 'black' && sibling.numRedChild() === 1){
    return this.case3(sibling);
  }
  //case 4
  if (sibling.color === 'black' && sibling.right !== null && sibling.right.color ==='red'){
    return this.case4(sibling);
  }
};

RBT.prototype.case1 = function(sibling){
  this.selfRotate(sibling.otherSide());
  this.propagatedFrom(sibling);
};

RBT.prototype.case2 = function(sibling){
  if (  RBT.isBlack(sibling.left) &&
        RBT.isBlack(sibling.right) ) {
    //sibling's children are black
    sibling.color = 'red';
    if (this.color === 'red'){
      //absorb extra black
      this.color = 'black';
      return;
    } else {
      this.propagateUp();
    }
  }
};

RBT.prototype.case3 = function(sibling){
  sibling.selfRotate(sibling.otherSide());
  this.case4(sibling);
};

RBT.prototype.case4 = function(sibling){
  this.selfRotate(sibling.otherSide());
  this.case4(sibling);
};
//===========================
RBT.prototype.propogateUp = function(){
  if (this.parent !== null){
    this.parent.propagatedFrom(this);
  }
};

RBT.prototype.selfRotate = function(direction){
  var to = direction;
  var from = RBT.opposite(direction);
  var values = {};
  values.head = this[from].value;
  values[to] = this.value;
  values[from] = this[from][from].value;
  var nodes = {};
  nodes.middle = this[from][to];
  nodes[to] =this[to];
  nodes[from] = this[from][from];
  //
  this.value = values.head;
  //
  this[to] = this[from];
  //re-assign externals
  this[from] = nodes[from];b
  nodes[from].parent = this;
  this[to][from] = nodes.middle;
  nodes.middle,parent = this[to];
  this[to][to] = nodes[to];
  nodes[to].parent = this[to];
};
//===========================
RBT.prototype.side = function(){
  if (this.parent.left === this) {
    return 'left';
  } else {
    return 'right';
  }
};

RBT.prototype.otherSide = function(){
  if (this.parent.left === this) {
    return 'right';
  } else {
    return 'left';
  }
};

RBT.prototype.sibling = function(){
  if (this.parent === null){
    return null;
  }
  return this.parent[this.otherSide()];
};

RBT.prototype.uncle = function(){
  if (this.parent === null){
    return null;
  }
  return this.parent.sibling();
};

//===========================
RBT.prototype.numRedChild = function(){
  var count = 0;
  count += this.left !== null && this.left.color === 'red'? 1 : 0;
  count += this.right !== null && this.right.color === 'red'? 1 : 0;
  return count;
};

RBT.prototype.hasRedChild = function(){
  return (this.left !== null && this.left.color === 'red') ||
        (this.right !== null && this.right.color === 'red');
};

RBT.prototype.rebalance = function(newTree){
  if (this.color === 'black' || newTree.color === 'black'){
    return;
  }
  console.log('start rebalance ' + this.parent.toArray());
  if (  (this.parent.left === undefined || this.parent.left === null || this.parent.left.color === 'black') ||
        (this.parent.right === undefined || this.parent.right === null || this.parent.right.color === 'black')  ){
    var d2 = this.left === newTree? 'left' : 'right';
    var d1 = this.parent.left === this? 'left' : 'right';
    newTree.rotate(d1, d2);
  } else {
    newTree.parent.parent.repaint();
  }
  //console.log('end reblance ' + this.parent.toArray());
};
//===========================
RBT.prototype.repaint = function(){
  console.log('repaint ' + this.value);
  this.left.color = 'black';
  this.right.color = 'black';
  this.color = 'red';
  if (this.parent === null){
    this.color = 'black';
    return;
  }
  if (this.parent.color === 'red') {
    this.parent.parent.repaint();
  }
};

RBT.prototype.rotate = function(d1, d2, blackChildren){
  //rotation occurs when 3 nodes are in a list structure
  //they will be grandparent, parent and child
  //inside this function, the keyword this is the child
  //
  //set up references for the local logic node's parent and children
  var externalChildren = [];
  //set up the children of the current node as a base
  externalChildren[0] = this.left;
  externalChildren[1] = this.right;
  //concatenate the sibling of the child either to the left or right
  //depending on whether the child is a right or left child of parent
  if (this === this.parent.right){
    externalChildren = [this.parent.left].concat(externalChildren);
  } else {
    externalChildren = externalChildren.concat([this.parent.right]);
  }
  //repeat the above step, except for parent and grand parent
  if (this.parent === this.parent.parent.right){
    externalChildren = [this.parent.parent.left].concat(externalChildren);
  } else {
    externalChildren = externalChildren.concat([this.parent.parent.right]);
  }

  //rearrage internal values
  //store values under variables indicative of their final location
  var values = {};
  values['parent'] = d1===d2 ? this.parent.value : this.value;
  if (d1 === d2){
    values[d2] = this.value;
    values[(d2==='left'? 'right' : 'left')] = this.parent.parent.value;
  } else {
    values[d1] = this.parent.value;
    values[d2] = this.parent.parent.value;
  }
  //re-arrange parent and child to be children of grandparent
  var tree = this.parent.parent;
  tree.left = this;
  tree.right = this.parent;
  tree.left.parent = tree;
  tree.right.parent = tree;
  //coloring
  if (blackChildren){
    //grandparent need to be colored red to maintain black balance
    tree.left.color = 'black';
    tree.right.color = 'black';
  } else {
    //grandparent will remain black
    tree.right.color = 'red';
    tree.left.color = 'red';
  }
  //re-assign values to correct location
  tree.value = values['parent'];
  tree.left.value = values['left'];
  tree.right.value = values['right'];
  //re-attach external references to the new internal tree
  tree.left.left = externalChildren[0];
  externalChildren[0] === null? '' : externalChildren[0].parent = tree['left'];
  tree.left.right = externalChildren[1];
  externalChildren[1] === null? '' : externalChildren[1].parent = tree['left'];
  tree.right.left = externalChildren[2];
  externalChildren[2] === null? '' : externalChildren[2].parent = tree['right'];
  tree.right.right = externalChildren[3];
  externalChildren[3] === null? '' : externalChildren[3].parent = tree['right'];
  return tree;
};
