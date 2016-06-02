/*
Deploy a contract and verify that the params are correct.
*/
contract('TokenCreation', function(accounts) {
  var CLOSING_TIME = 1500000000;
  var MIN_TOKENS = 100;

  it("Deploy contract with correct params.", function(cb){

    TokenCreation.new(MIN_TOKENS, CLOSING_TIME, {from: accounts[0]})
    .then(function(contract){
      contract.closingTime.call().then(function(closing_time){
        assert.equal(closing_time.c[0], CLOSING_TIME, "Closing time incorrect.")
      })
      contract.minTokensToCreate.call().then(function(minTokens){
        assert.equal(minTokens.c[0], MIN_TOKENS, "Minimum tokens to create incorrect.")
      })
      .then(cb).catch(cb);
    })
    .catch(cb);

  })
});
