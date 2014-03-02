var assert = chai.assert;

describe('prefixTree', function() {
  var prefixTree;

  beforeEach(function() {
    prefixTree = new PrefixTree();
  });

  it('should contain words inserted', function() {
    prefixTree.insert('and');
    assert.isTrue(prefixTree.contains('and'));
  });

  it('should not contain word fragments or not inserted words', function() {
    prefixTree.insert('and');
    assert.isTrue(prefixTree.contains('and'));
    assert.isFalse(prefixTree.contains('an'));
    assert.isFalse(prefixTree.contains('ands'));
  });

  it('should contain word fragments that are also inserted words', function() {
    prefixTree.insert('and');
    prefixTree.insert('an');
    assert.isTrue(prefixTree.contains('and'));
    assert.isTrue(prefixTree.contains('an'));
    assert.isFalse(prefixTree.contains('ands'));
  });

  it('should not contain empty strings', function() {
    prefixTree.insert('and');
    assert.isFalse(prefixTree.contains('not'));
  });

  it('can return an array of words with a given prefix', function() {
    var words = ['and', 'andy', 'anderson'];
    for (var i=0; i<words.length; i++){
      prefixTree.insert(words[i]);
    }
    var results = prefixTree.predict('a', 99);
    assert.deepEqual(results.sort(), words.sort());
  });
});
