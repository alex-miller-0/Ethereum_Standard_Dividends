# EthereumStandardDividends
Drafting a set of crowdsale smart contracts that release quarterly dividends

This is just a side project to learn a bit of Solidity programming. This is a set of contracts that can create tokens based on ether deposits and then, after the crowdsale period, allow token holders to withdraw dividends on a quarterly basis. (Essentially I am forking pieces of the DAO and Digix contracts). It is pretty bare bones.

## Writing and Deploying a Smart Contract

Ethereum smart contracts are written in [Solidity](http://solidity.readthedocs.io/en/latest/), which is a programming language made to write like strongly typed javascript, so it is quite easy to learn. Solidity programs compile to Ethereum Virtual Machine (EVM) code, which can be deployed directly to the blockchain via [geth](https://github.com/ethereum/go-ethereum/wiki/Geth) using web3.js in the geth console or through [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) via the `eth_sendTransaction` endpoint. Note that this is also the endpoint you would use to just send some ether to another account, except here you're including EVM code for data and sending to an empty address:

    // Request
    curl -X POST  --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{ \
        "from": <your address>, \
        "to": <empty address>, \
        "gas": <int in hex>, \
        "gasPrice": <int in hex>, \
        "value": <amount of ether to pay deployment gas, in hex>, \
        "data": <EVM code of your contract> \
    }],"id":1}' geth_host:RPC_port

    // Result
    {
      "id":1,
      "jsonrpc": "2.0",
      "result": <address of deployed contract>
    }

## State of a Contract
The contract, once deployed to the blockchain, has a static state that can be viewed for free by `call`ing its address. To change the state by, e.g. purchasing tokens with ether in this case, requires you to send a transaction to the address with a function call in the `data` parameter. Once the block containing the transaction is mined, the function call will be executed and if all is successful, the state of the contract living on the blockchain will be forever changed (and now viewable to everyone in the world, assuming they are synced).


### Testing

This is built with [Truffle](https://github.com/ConsenSys/truffle) and [TestRPC](https://github.com/ethereumjs/testrpc).

To deploy and test contracts on a local chain, run the following from the root directory of this repo:

    testrpc --debug
    truffle deploy

Unit tests are executed using:

    truffle test

