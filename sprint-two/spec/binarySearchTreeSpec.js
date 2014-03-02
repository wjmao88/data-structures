var assert = chai.assert;

describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree(5, null, false);
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  xit("should insert values at the correct location in the tree", function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it("should have a working 'contains' method", function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    assert.isTrue(binarySearchTree.contains(7));
    assert.isFalse(binarySearchTree.contains(8));
  });

  it("should have a working 'remove' method", function(){
    var array = [60,70,850,76,23,330,55,32,88,9,150,6,26,87,3];
    var leftDepth, rightDepth;
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
    }
    console.log(binarySearchTree.toArray());
    console.log('start delete');
    console.log('of big list');
    for (var i=0; i< array.length; i++){
      binarySearchTree.remove(array[i]);
      leftDepth = binarySearchTree.left === null? 0 : binarySearchTree.left.depth();
      rightDepth = binarySearchTree.right === null? 0 : binarySearchTree.right.depth();
      assert.isTrue(binarySearchTree.unbalancedSide() === undefined);
      console.log('deleted ' + array[i]);
      console.log(binarySearchTree.toArray());
    }
  });

  it("should execute a callback on every value in a tree using 'depthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); }
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    assert.notStrictEqual(array, [5,2,3]);
  });

  it("should execute a callback on every value in a tree using 'breadthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); }
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.breadthFirstLog(func);
    assert.notStrictEqual(array, [5,2,3]);
  });

  xit("should find the closest value to a given target", function(){
    var array = [60,70,80,76,23,30,55,32,88,9,100];
    binarySearchTree = binarySearchTree = new BinarySearchTree(50, null, false);
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
    }
    expect(binarySearchTree.closestValue(54)).to.equal(55);
  });

  it("should tell depth", function(){
    var array = [5, 20, 2, 7, 15, 40, 1, 3, 6];
    binarySearchTree = new BinarySearchTree(10, null, false);
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
    }
    expect(binarySearchTree.depth() ).to.equal( 4);
    expect(binarySearchTree.right.depth() ).to.equal( 2);
    expect(binarySearchTree.left.depth() ).to.equal( 3);
  });

  it("should rebalance automatically", function(){
    var array = [1,2,3,4,5,6,7,8,9];
    var leftDepth, rightDepth;
    binarySearchTree.autoRebalance = true;
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
      leftDepth = binarySearchTree.left === null? 0 : binarySearchTree.left.depth();
      rightDepth = binarySearchTree.right === null? 0 : binarySearchTree.right.depth();
      assert.isTrue(binarySearchTree.unbalancedSide() === undefined);
    }
  });
});
