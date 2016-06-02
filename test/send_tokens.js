/*
Send ether from an account to the contract.
*/

function sendEther(contract, account, cb){
  contract.createTokenProxy.call(account, {"value":5, "from": account})
  .then(function(success){
    assert.equals(success, true, "Token creation failed.")
  })
  .then(cb).catch(cb);
}

/*
Check the balance of an account and assert that it is the expected number.
*/
function checkBalance(account, expected_balance, cb){
  var tokenCreation = TokenCreation.deployed();
  tokenCreation.balanceOf.call(account)
  .then(function(balance) {
    assert.equal(balance.valueOf(), expected_balance,
     "Account didn't have ", expected_balance, " balance.");
  })
  .then(cb).catch(cb);
};

/*
Check the total number of tokens created by the contract.
*/
function checkTokenSupply(expected_tokens, cb){
  var tokenCreation = TokenCreation.deployed();
  tokenCreation.totalSupply.call()
  .then(function(supply){
    assert.equal(supply.c[0], expected_tokens,
      "Contract did not create the expected number of tokens.");
  })
  .then(cb).catch(cb);
};


contract('TokenCreation', function(accounts) {

  it("Send 5 ether from account 1. \
    Make sure contract is updated and \
    that account 1 has 5 tokens.", function(cb){

    var CLOSING_TIME = 1500000000;
    var MIN_TOKENS = 100;
    var ACCOUNT_1_DEPOSIT = 5;
    var TRANSFER_NUM = 3;

    TokenCreation.new(MIN_TOKENS, CLOSING_TIME, {from: accounts[1]})
    .then(function(contract){


      // Account 1: Deposit 5 eth --> get 5 tokens
      contract.createTokenProxy.sendTransaction(accounts[1],
        {"value":ACCOUNT_1_DEPOSIT, "from": accounts[0]})
      .then(function(txn_id){})

      // Contract: Make sure it has 5 tokens
      contract.totalSupply.call()
      .then(function(supply){
        assert.equal(supply.c[0], ACCOUNT_1_DEPOSIT,
          "Contract did not create the expected number of tokens.");
      })

      // Account 1: Make sure he has 5 tokens
      contract.balanceOf.call(accounts[1])
      .then(function(balance){
        assert.equal(balance.valueOf(), ACCOUNT_1_DEPOSIT,
         "Account didn't have ", ACCOUNT_1_DEPOSIT, " balance.");
      })

      // Account 1: Transfer 3 tokens to Account 2
      contract.transfer.sendTransaction(accounts[2], TRANSFER_NUM, {from: accounts[1]})
      .then(function(txn_id){})

      // Account 2: Make sure he has 3 tokens
      a1_balance = TRANSFER_NUM;
      contract.balanceOf.call(accounts[2])
      .then(function(balance) {
        assert.equal(balance.valueOf(), a1_balance,
         "Account didn't have "+a1_balance+" balance.");
      })

      // Account 1: Make sure he has 2 tokens
      a2_balance = ACCOUNT_1_DEPOSIT-TRANSFER_NUM;
      contract.balanceOf.call(accounts[1])
      .then(function(balance) {
        assert.equal(balance.valueOf(), a2_balance,
         "Account didn't have "+a2_balance+" balance.");
      })
      .then(cb).catch(cb);

    })
    .catch(cb);
  });

});
/*


  it("Check funding period", function(cb){
    var tokenCreation = TokenCreation.deployed();
    tokenCreation.closingTime.call()
    .then(function(closing_time){
      console.log("closing time", closing_time)
    })
    .then(cb).catch(cb);
  })
*/
