contract('TokenCreation', function(accounts) {
  it("Should start with 0 tokens.", function(done) {
    var tokenCreation = TokenCreation.deployed();
    tokenCreation.balanceOf.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Account didn't have 0 balance.");
    }).then(done).catch(done);
  });
  it("Add 5 ether.", function(done){
    var tokenCreation = TokenCreation.deployed();
    tokenCreation.createTokenProxy(accounts[0], {"value":5, "from": accounts[0]}).then(function(balance){
    }).then(done).catch(done);
  });
  it("Should now have 5 tokens.", function(done) {
    var tokenCreation = TokenCreation.deployed();
    tokenCreation.balanceOf.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 5, "Account didn't have 0 balance.");
    }).then(done).catch(done);
  });

});
