### EthereumStandardDividends

This is a personal side project to learn a bit of Solidity programming. The project contains a set of contracts that can create tokens based on ether deposits and then, after the crowdsale period, allow token holders to withdraw dividends on a quarterly basis. (Essentially I am forking pieces of the DAO and Digix contracts). It is pretty bare bones.

# Background

Deploying and interacting with a smart contract on the Ethereum blockchain is easier than you might expect. The best way to do this is using [geth](https://github.com/ethereum/go-ethereum/wiki/Geth). Many people like to interact with geth in the `geth console`, but I prefer using [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) because it lets me put deployment into a workflow.

### Writing and Deploying a Smart Contract

Ethereum smart contracts are written in [Solidity](http://solidity.readthedocs.io/en/latest/), which is a programming language made to write like strongly typed javascript, so it is quite easy to learn. Solidity programs compile to Ethereum Virtual Machine (EVM) code, which can be deployed directly to the blockchain via geth using web3.js in the geth console or through JSON-RPC via the `eth_sendTransaction` endpoint. Note that this is also the endpoint you would use to just send some ether to another account, except here you're including EVM code for data and sending to an empty address:

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

### State of a Contract

The contract, once deployed to the blockchain, has a static state that can be viewed for free by sending a request to `eth_call` using the address of the contract and compiled data specifying the get method or the parameter of interest. This will send a transaction to your copy of the blockchain, but will not broadcast the transaction. Therefore, this consumes zero gas and simply queries your client to parse the state hash. Using JSON-RPC:

    // Request
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{ \
        "to": <empty address>, \
        "data": <EVM code containing your data call, optional> \
    }],"id":1}'

    // Result
    {
      "id":1,
      "jsonrpc": "2.0",
      "result": "0x0"
    }

Changing the state of the contract (e.g. by purchasing tokens with ether in this case) requires your transaction to the contract to be *mined*. Thus, you need to send a transaction (again using `eth_sendTransaction`) to the address with enough ether (the `value` argument) to cover the gas cost. Once the block containing the transaction is successfully mined in the next block, the function call will be executed and if all is successful, the state of the contract living on the blockchain will be forever changed and publically viewable to everyone in the world, assuming they are synced. 

# Contracts

This project contains two sets of contracts. 

**Token** contracts were forked from [The DAO](https://github.com/slockit/DAO) and are meant to comply with [ERC 20](https://github.com/ethereum/EIPs/issues/20) standards. They represent fungible tokens that are purchased during a crowdsale period. A minimum number of tokens must be purchased before the crowdsale ends; otherwise, all ether is refunded. 

**Dividend** contracts **(TODO)** are forked from the [Digix DAO](https://github.com/DigixGlobal/digixdao-contracts) and allow token holders to request a share of the revenue collected during the previous quarter. To claim dividends, the token holders must send a number of tokens to the dividends contract at the end of the quarter. Strictly speaking, these are not dividends, but are instead *rewards*, as they must be requested by the holder.

# Testing and Development

This project is built with [Truffle](https://github.com/ConsenSys/truffle) and [TestRPC](https://github.com/ethereumjs/testrpc).

To deploy and test contracts on a local chain, run the following from the root directory of this repo:

    testrpc --debug
    truffle deploy

Unit tests are executed using:

    truffle test

