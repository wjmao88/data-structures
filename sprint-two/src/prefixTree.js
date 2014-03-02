var PrefixTree = function(value, parent){
  this.canEnd = false;
  this.value = value;
  this.children = [];
  this.parent = parent || null;
};

PrefixTree.prototype.insert = function(string){
  if (this.parent !== null){
    // strip off first character
    var firstChar = string[0];
    string = string.slice(1);
    // if firstChar is not equal to value
    if( firstChar !== this.value){
      return false;
    }
    // is value empty string
    if( string === ''){
      // set canEnd to true
      this.canEnd = true;
      return true;
    }
  }
  if (!this.anyChildren(this.insert, string)){
    //create new node
    var newChild = new PrefixTree(string[0], this);
    this.children.push(newChild);
    newChild.insert(string);
  }
  return true;
};

PrefixTree.prototype.contains = function(string){
  if (!string){
    return false;
  }
  if (string === this.value){
    return this.canEnd;
  }
  if (this.parent !== null){
    string = string.slice(1);
  }
  if (string.length === 0){
    return false;
  }
  var found = this.anyChildren(this.contains, string);
  return found;
};

PrefixTree.prototype.anyChildren = function(func){
  var flag = false;
  for( var i = 0; i < this.children.length; i++){
    flag = flag || func.apply(this.children[i], Array.prototype.slice.call(arguments, 1));
  }
  return flag;
};

PrefixTree.prototype.predict = function(string){
  var results = [];
  //no string
  if (string === undefined){
    return results;
  }
  //stop after [range] layers are searched beyond the last letter
  // if (string === ''){
  //   if (range === 0){
  //     return [this.value];
  //   } else {
  //     range--;
  //   }
  // }
  //this is an ending, so add this to results
  if ((string === this.value || string === '') && this.canEnd){
    results.push(this.value);
  }
  if (this.parent !== null){
    string = string.slice(1);
  }
  var subResults = [];
  for( var i = 0; i < this.children.length; i++){
    subResults = subResults.concat(this.children[i].predict(string));
  }
  if (this.value !== undefined){
    for (var i = 0; i < subResults.length; i++){
      results.push(this.value + (subResults[i] || ''));
    }
  } else {
    results = subResults;
  }
  console.log('at ' + this.value + ' : ' + results + ' : ' + subResults);
  return results;
};

