var Graph = function(){
  this.nodes = [];
  this.edges = {}; //[from][to];
};

Graph.prototype.contains = function(node){
  return this.nodes.indexOf(node) > -1;
};

Graph.prototype.addNode = function(newNode, toNode){
  this.nodes.push(newNode);
  if (this.nodes.length === 2){
    toNode = this.nodes[0];
  }
  this.addEdge(newNode, toNode);
};

Graph.prototype.removeNode = function(node){
  var fromIndex = this.nodes.indexOf(node);
  if (fromIndex === -1){
    return false;
  }
  this.nodes.splice(fromIndex, 1);
  for (var toIndex in this.edges[fromIndex]){
    delete this.edges[toIndex][fromIndex];
  }
  delete this.edges[fromIndex];
  return true;
};

Graph.prototype.forEachNode = function(func){
  for( var i = 0; i < this.nodes.length; i++){
    func(this.nodes[i]);
  }
};

Graph.prototype.getEdge = function(fromNode, toNode){
  this.log('get edge');
  if (this.edges[this.nodes.indexOf(fromNode)] === undefined || this.edges[this.nodes.indexOf(toNode)] === undefined){
    return false;
  }
  return this.edges[this.nodes.indexOf(fromNode)][this.nodes.indexOf(toNode)] || false;
};

Graph.prototype.addEdge = function(fromNode, toNode){
  var fromIndex = this.nodes.indexOf(fromNode);
  var toIndex = this.nodes.indexOf(toNode);
  if (fromIndex === -1 || toIndex === -1){
    return false;
  }
  this.edges[fromIndex] = this.edges[fromIndex] || {};
  this.edges[toIndex] = this.edges[toIndex] || {};
  this.edges[fromIndex][toIndex] = true;
  this.edges[toIndex][fromIndex] = true;
  this.log('after add edge');
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  var fromIndex = this.nodes.indexOf(fromNode);
  var toIndex = this.nodes.indexOf(toNode);
  if (fromIndex < 0 || toIndex < 0){
    return false;
  }
  delete this.edges[fromIndex][toIndex];
  delete this.edges[toIndex][fromIndex];
  if (Object.keys(this.edges[fromIndex]).length === 0){
    this.removeNode(fromNode);
  }
  if (Object.keys(this.edges[toIndex]).length === 0){
    this.removeNode(toNode);
  }
  return true;
};

Graph.prototype.log = function(msg){
  // console.log(msg);
  // console.log('nodes ' + JSON.stringify(this.nodes));
  // console.log('edges ' + JSON.stringify(this.edges));
};
