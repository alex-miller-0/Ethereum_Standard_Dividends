# EthereumStandardDividends
A draft at a set of crowdsale contracts to release quarterly dividends

This is just a side project to learn a bit of Solidity programming and to create a set of contracts that can create tokens based on ether deposits and then, after the crowdsale period, allow token holders to withdraw dividends on a quarterly basis. (Essentially I am forking pieces of the DAO and Digix contracts).

This is built with [Truffle](https://github.com/ConsenSys/truffle) and [TestRPC](https://github.com/ethereumjs/testrpc).

To deploy and test contracts on a local chain, run the following from the root directory of this repo:

    testrpc --debug
    truffle deploy

Unit tests are executed using:

    truffle test

