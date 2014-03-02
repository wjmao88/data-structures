var BloomFilter = function(m, h){
  this.table = new HashTable();
  this.m = m || 18;
  this.h = h || 3;
  this.filter = [];
};

BloomFilter.prototype.insert = function(k, v){
  var hashes = this.hash(k);
  this.table.insert(k, v);
  this.changeFilter(hashes, 1);
};

BloomFilter.prototype.remove = function(k){
  var hashes = this.hash(k);
  if (this.wasHashed(hashes)){
    this.table.remove(k);
    this.changeFilter(hashes, -1);
    return true;
  }
  return false;
};

BloomFilter.prototype.retrieve = function(k){
  var hashes = this.hash(k);
  if (this.wasHashed(hashes)){
    return this.table.retrieve(k);
  }
  return null;
};

BloomFilter.prototype.wasHashed = function(hashes){
  var hits = 0;
  for (var i=0; i<hashes.length; i++){
    if (this.filter[hashes[i]] > 0 ){
      hits++;
    }
  }
  console.log(hits + ' hits on ' + hashes);
  console.log(this.filter);
  return hits === hashes.length;
};

BloomFilter.prototype.changeFilter = function(hashes, change){
  for (var i=0; i<hashes.length; i++){
    this.filter[hashes[i]] = this.filter[hashes[i]] || 0;
    this.filter[hashes[i]] += change;
  }
};

BloomFilter.prototype.hash = function(str){
  var hashes = [];
  for (var n=0; n<this.h; n++){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash<<n) + hash + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }
    hashes.push(hash % this.m);
  }
  console.log(str + ' hashes to ' + hashes);
  return hashes;
};
