var expect = chai.expect;
var assert = chai.assert;

describe("set", function() {
  var set;

  beforeEach(function() {
    set = makeSet();
  });

  it("should have methods named 'add', 'contains', and 'remove'", function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it("should add values to a set", function(){
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    assert.isTrue(set.contains("Danny Glover"));
    assert.isTrue(set.contains("Susan Sarandon"));
  });

  it("should remove values from a set", function(){
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    assert.isFalse(set.contains('Mel Gibson'));
  });

  it("should accept non-string values", function(){
    set.add(6);
    set.add([6]);
    set.add({6:6});
    set.add(true);
    set.add(null);
    assert.isTrue(set.contains(6));
    assert.isTrue(set.contains([6]));
    assert.isTrue(set.contains({6:6}));
    assert.isTrue(set.contains(true));
    assert.isTrue(set.contains(null));
  });

  it("should not confuse string and non string values", function(){
    set.add(6);
    set.add('6');
    set.remove('6');
    assert.isTrue(set.contains(6));
    assert.isFalse(set.contains('6'));
  });


  it("should keep track of undefined", function(){
    set.add(undefined);
    assert.isTrue(set.contains(undefined));
    set.add('undefined');
    set.remove('undefined');
    assert.isTrue(set.contains(undefined));
    set.remove(undefined);
    assert.isFalse(set.contains(undefined));
  });
});
