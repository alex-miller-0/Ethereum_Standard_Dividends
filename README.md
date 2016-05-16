# EthereumStandardDividends
Drafting a set of crowdsale contracts that release quarterly dividends

This is just a side project to learn a bit of Solidity programming. This is a set of contracts that can create tokens based on ether deposits and then, after the crowdsale period, allow token holders to withdraw dividends on a quarterly basis. (Essentially I am forking pieces of the DAO and Digix contracts). It is pretty bare bones.

This is built with [Truffle](https://github.com/ConsenSys/truffle) and [TestRPC](https://github.com/ethereumjs/testrpc).

To deploy and test contracts on a local chain, run the following from the root directory of this repo:

    testrpc --debug
    truffle deploy

Unit tests are executed using:

    truffle test

