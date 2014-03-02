var BTree = function(n){
  this.nodes = [];
  this.max = n || 3;
};

BTree.prototype.insert = function(value, fromParent){
  // find the index to insert value
  var index = 0;
  var results = [undefined, value, undefined];
  while( this.nodes[index+1] !== undefined &&
         this.nodes[index+1] < value ){
    index += 2;
  }
  if ( this.nodes[index] !== undefined ){
    //there is a child present, let it insert
    results = this.nodes[index].insert(value, true);
  }
  if (results !== undefined){
    //result is undefined in 2 scenarios
    //1: there is no child tree thus this is a leaf
    //2: result is the set of tree/value as the result of a child's split
    //in both cases try insert here
    results.splice.apply(this.nodes, [index, 1].concat(results));
    if (this.tooFull()){
      //this node is full
      //split the nodes in to two halves
      var splitAt = Math.ceil(this.max/2)*2+1;
      var splitter = this.nodes[splitAt];
      var right = new BTree(this.max);
      for (var i=splitAt+1; i<this.nodes.length; i++){
        right.nodes.push(this.nodes[i]);
      }
      this.nodes.length = splitAt;
      //return the result
      if (fromParent){
        console.log('return node set ' + JSON.stringify([this, splitter, right]));
        return [this, splitter, right];
      } else {
        //in this case this node is the node referenced externally
        //make this to be a parent
        var left = new BTree(this.max);
        left.nodes = this.nodes;
        this.nodes = [left, splitter, right];
      }
    }
    //no extra work for non full node
    return undefined;
  }
};

BTree.prototype.delete = function(value){
  if (value === undefined){
    return undefined;
  }
  var index = this.localIndex(value);
  if (this.nodes[index+1] === undefined){
    //value not found here and no where to go
    return undefined;
  }
  if (this.nodes[index+1] !== undefined && this.nodes[index+1] === value){
    //value is found here
    if (this.nodes[index] === undefined ){
      //leaf
      this.nodes.splice(index, 3, undefined);
      return undefined;
    } else {
      this.nodes[index+1] = undefined;
      var newContent = this.nodes[index].combine(this.nodes[index], undefined, this.nodes[index+2]);
      this.nodes.apply.splice(this.nodes, [index, 3].concat(newContent));
      return undefined;
    }
  } else {
    //value not found here, go deeper
    return this.nodes[index].delete(value);
  }
};

BTree.prototype.tooFull = function(){
  return this.nodes.length > this.max*2+1;
};

BTree.prototype.tooFull = function(){
  return this.nodes.length < (this.max-1)/2;
};

BTree.prototype.split = function(){
  var splitAt = Math.ceil(this.max/2)*2+1;
  var splitter = this.nodes[splitAt];
  var right = new BTree(this.max);
  for (var i=splitAt+1; i<this.nodes.length; i++){
    right.nodes.push(this.nodes[i]);
  }
  this.nodes.length = splitAt;
  return [this, splitter, right];
};

BTree.prototype.combine = function(leftTree, value, rightTree){
  if (value !== undefined){
    leftTree.nodes.push(value);
  }
  leftTree.nodes.concat(rightTree.nodes);
  this.nodes = leftTree.nodes;
  if (this.tooFull){
    return this.split();
  } else {
    return this;
  }
};

BTree.prototype.search = function(value){
  if (value === undefined){
    return false;
  }
  var index = this.localIndex(value);
  if (this.nodes[index+1] !== undefined && this.nodes[index+1] === value){
    //found
    return true;
  }
  if (this.nodes[index] === undefined){
    //end of current array and cannot go deeper
    return false;
  }
  //go deeper
  return this.nodes[index].search(value);
};

BTree.prototype.localIndex = function(value){
  var index = 0;
  while( this.nodes[index+1] !== undefined &&
         this.nodes[index+1] < value ){
    index += 2;
  }
  return index;
};

BTree.prototype.mapify = function(){
  var result = [];
  for (var i=0; i<this.nodes.length; i+=2){
    result[i] = this.nodes[i] === undefined? 'undefined' : this.nodes[i].mapify();
    result[i+1] = this.nodes[i+1];
  }
  return result;
};
