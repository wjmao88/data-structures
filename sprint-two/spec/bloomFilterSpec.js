var expect = chai.expect;

describe("bloomFilter", function() {
  var hashTable;
  var people = [["Steven", "Tyler"], ["George", "Harrison"], ["Mr.", "Doob"], ["Dr.", "Sunshine"], ["John", "Resig"], ["Brendan", "Eich"], ["Alan", "Turing"], ['A', 'HAHA'], ['B', 'HAHA'], ['C', 'HAHA'], ['D', 'HAHA'], ['E', 'HAHA']];


  beforeEach(function() {
    hashTable = new BloomFilter();
  });

  it("should have methods named 'insert', 'remove', and 'retrieve", function() {
    expect(hashTable.insert).to.be.a('function');
    expect(hashTable.remove).to.be.a('function');
    expect(hashTable.retrieve).to.be.a('function');
  });

  it("should store values that were inserted", function() {
    hashTable.insert("Steven", "Seagal");
    expect(hashTable.retrieve("Steven")).to.equal("Seagal");
  });

  it("should not contain values that were not inserted", function() {
    hashTable.insert("Steven", "Spielberg");
    expect(hashTable.retrieve("Steven")).not.to.equal("Seagal");
  });

  it("should not contain values that were removed", function() {
    hashTable.insert("Steven", "Tyler");
    hashTable.remove("Steven");
    expect(hashTable.retrieve("Steven")).to.equal(null);
  });

  it("should handle hash function collisions", function(){
    expect(window.getIndexBelowMaxForKey).to.be.ok;
    var v1 = 'val1', v2 = 'val2';
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(v2);
  });

  // (Extra credit! Remove the extra 'x' when you want the following tests to run)
  it("should double in size when needed", function() {
    for (var i = 0; i < people.length; i++){
      var firstName = people[i][0], lastName = people[i][1];
      hashTable.insert(firstName,lastName);
    }
    expect(hashTable.table._limit).to.equal(16);
  });

  it("should halve in size when needed", function() {
    for (var i = 0; i < people.length; i++){
      var firstName = people[i][0], lastName = people[i][1];
      hashTable.insert(firstName,lastName);
    }
    expect(hashTable.table._limit).to.equal(16);
    hashTable.remove("George");
    hashTable.remove("Dr.");
    hashTable.remove("Steven");
    hashTable.remove("John");
    hashTable.remove("Mr.");
    hashTable.remove("A");
    hashTable.remove("B");
    hashTable.remove("C");
    hashTable.remove("D");
    expect(hashTable.table._limit).to.equal(8);
  });
});
