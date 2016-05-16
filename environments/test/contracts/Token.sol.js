// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"}],
    binary: "606060405260f8806100116000396000f3606060405260e060020a600035046318160ddd8114602e57806370a08231146036578063a9059cbb14605c575b005b605260015481565b600160a060020a03600435166000908152602081905260409020545b6060908152602090f35b6052600435602435600060003411156072576002565b600160a060020a03331681526020819052604081205482901080159060975750600082115b1560f257604080822080548490039055600160a060020a03808516808452918320805485019055606084815233909116907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602090a35060015b9291505056",
    unlinked_binary: "606060405260f8806100116000396000f3606060405260e060020a600035046318160ddd8114602e57806370a08231146036578063a9059cbb14605c575b005b605260015481565b600160a060020a03600435166000908152602081905260409020545b6060908152602090f35b6052600435602435600060003411156072576002565b600160a060020a03331681526020819052604081205482901080159060975750600082115b1560f257604080822080548490039055600160a060020a03808516808452918320805485019055606084815233909116907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602090a35060015b9291505056",
    address: "0xc907b173857974770039fc53f31de4159bacc7ec",
    generated_with: "2.0.9",
    contract_name: "Token"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Token error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Token = Contract;
  }

})();
