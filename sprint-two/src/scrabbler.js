var Scrabbler = function(){
  this.tree = new PrefixTree();
};

Scrabbler.prototype.loadArrayDictionary = function(dictionary){
  for (var word = 0; word< dictionary.length; i++){
    this.tree.put(dictionary[word]);
  }
};

Scrabbler.prototype.scrabbleBest = function(){

};

Scrabbler.prototype.scrabbleAll = function(letters){
  var result = {};

  var arr = [];
  for (var i=0; i<letters.length; i++){

  }
  return result;
};
