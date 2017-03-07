import { default as Web3 } from 'web3';
json = require('/imports/ethereum/build/contracts/Exchange.json');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var contract = require("truffle-contract");
myContract = contract(json);
// myContract.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'), () => {
//     console.log("Exchange Dapp Initialized, biattchhh");
// });
myContract.setProvider(web3.currentProvider, () => {
    console.log("Provider set");
});