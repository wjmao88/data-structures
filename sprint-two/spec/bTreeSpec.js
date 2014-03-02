var assert = chai.assert;

describe('B-Tree', function() {
  var btree;

  beforeEach(function() {
    btree = new BTree();
  });

  it('should contain words inserted', function() {
    btree.insert(10);
    assert.isTrue(btree.search(10));
    btree.insert(34);
    btree.insert(88);
    btree.insert(1);
    btree.insert(32);
    btree.insert(1245);
    assert.isTrue(btree.search(32));
    assert.isFalse(btree.search(101111));
  });

  it('should delete words', function() {
    btree.insert(10);
    btree.insert(34);
    btree.insert(88);
    btree.insert(1);
    btree.insert(32);
    btree.insert(1245);
    assert.isTrue(btree.search(32));
    btree.delete(32);
    assert.isFalse(btree.search(32));
  });

  it('should console log a mapify', function() {
    btree.insert(10);
    btree.insert(15);
    btree.insert(22);
    btree.insert(34);
    btree.insert(88);
    btree.insert(1);
    btree.insert(34);
    btree.insert(1245);
    btree.insert(12);
    btree.insert(340);
    btree.insert(15);
    btree.insert(7);
    btree.insert(11);
    btree.insert(34);
    btree.insert(99);
    btree.insert(123);
    btree.insert(2);
    btree.insert(54);
    btree.insert(23);
    console.log(JSON.stringify(btree.mapify(), null, 2));
    assert.isTrue(true);
  });

});
