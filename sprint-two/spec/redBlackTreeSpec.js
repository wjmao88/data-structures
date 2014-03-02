var assert = chai.assert;

describe("redBlackTree", function() {
  var redBlackTree;

  beforeEach(function() {
    redBlackTree = new RedBlackTree(5, null, true, function(){
      console.log('debugger');
      console.log(redBlackTree.toArray());
    });
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(redBlackTree.insert).to.be.a('function');
    expect(redBlackTree.contains).to.be.a('function');
    expect(redBlackTree.depthFirstLog).to.be.a('function');
  });


  it("should have a working 'contains' method", function(){
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    assert.isTrue(redBlackTree.contains(7));
    assert.isFalse(redBlackTree.contains(8));
  });

  it("should execute a callback on every value in a tree using 'depthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); }
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.depthFirstLog(func);
    assert.notStrictEqual(array, [5,2,3]);
  });

  it("should execute a callback on every value in a tree using 'breadthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); }
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.breadthFirstLog(func);
    assert.notStrictEqual(array, [5,2,3]);
  });

  it("should find the closest value to a given target", function(){
    var array = [60,70,80,76,23,30,55,32,88,9,100];
    redBlackTree = new RedBlackTree(50);
    for (var i=0; i< array.length; i++){
      redBlackTree.insert(array[i]);
    }
    expect(redBlackTree.closestValue(54)).to.equal(55);
  });

  it("should rebalance automatically", function(){
    var array = [60,70,850,76,23,330,55,32,88,9,150,6,26,87,3];
    var leftDepth, rightDepth;
    for (var i=0; i< array.length; i++){
      redBlackTree.insert(array[i]);
      leftDepth = redBlackTree.left === null? 0 : redBlackTree.left.depth();
      rightDepth = redBlackTree.right === null? 0 : redBlackTree.right.depth();
      assert.isTrue(redBlackTree.isBalanced());
    }
    console.log(redBlackTree.toArray());
  });

  it("should be deleting", function(){
    var array = [1,2,3,4,7];
    var leftDepth, rightDepth;
    for (var i=0; i< array.length; i++){
      redBlackTree.insert(array[i]);
    }
    console.log(redBlackTree.toArray());
    console.log('start delete');
    for (var i=0; i< array.length; i++){
      redBlackTree.remove(array[i]);
      leftDepth = redBlackTree.left === null? 0 : redBlackTree.left.depth();
      rightDepth = redBlackTree.right === null? 0 : redBlackTree.right.depth();
      assert.isTrue(redBlackTree.isBalanced());
      console.log(redBlackTree.toArray());
    }
    console.log(redBlackTree.toArray());
  });

  xit("should rebalance when deleting", function(){
    var array = [60,70,850,76,23,330,55,32,88,9,150,6,26,87,3];
    var leftDepth, rightDepth;
    for (var i=0; i< array.length; i++){
      redBlackTree.insert(array[i]);
    }
    console.log(redBlackTree.toArray());
    console.log('start delete');
    for (var i=0; i< array.length; i++){
      redBlackTree.remove(array[i]);
      leftDepth = redBlackTree.left === null? 0 : redBlackTree.left.depth();
      rightDepth = redBlackTree.right === null? 0 : redBlackTree.right.depth();
      assert.isTrue(redBlackTree.isBalanced());
      console.log(redBlackTree.toArray());
    }
    console.log(redBlackTree.toArray());
  });

});
