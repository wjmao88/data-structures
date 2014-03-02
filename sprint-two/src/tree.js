var makeTree = function(value, parent){
  var newTree = Object.create(treeMethods);
  newTree.value = value;
  newTree.children = undefined;
  newTree.parent = parent || null;
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  this.children = this.children || [];
  this.children.push(makeTree(value, this));
};

treeMethods.contains = function(target){
  if (this.value === target){
    return true;
  }
  //if(this.children === undefined){
  if (!Array.isArray(this.children)){
    return false;
  }
  for (var i=0; i< this.children.length; i++){
    if (this.children[i].contains(target)){
      return true;
    }
  }
  return false;
};

treeMethods.removeFromParent = function(){
  var index = this.parent.children.indexOf(this);
  this.parent.children.splice(index, 1);
  this.parent = null;
}

