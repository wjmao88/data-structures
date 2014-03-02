var assert = chai.assert;
var expect = chai.expect;

describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree(5, null);
  });

  it("should find the closest value to a given target", function(){
    var array = [60,70,80,76,23,30,55,32,88,9,100];
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
    }
    console.log(binarySearchTree.toArray())
    expect(binarySearchTree.findClosest(54).value).to.equal(23);
  });

  it("should tell depth", function(){
    var array = [20, 2, 7, 15, 40, 1, 3, 6];
    for (var i=0; i< array.length; i++){
      binarySearchTree.insert(array[i]);
    }
    expect(binarySearchTree.depth()).to.equal( 4);
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
