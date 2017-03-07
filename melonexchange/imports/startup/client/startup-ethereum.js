import { default as Web3 } from 'web3';
Exchange = require('/imports/ethereum/build/contracts/Exchange.json');
Asset = require('/imports/ethereum/build/contracts/Asset.json');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var contract = require("truffle-contract");
exchange = contract(Exchange);
// exchange.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'), () => {
//     console.log("Exchange Dapp Initialized, biattchhh");
// });
exchange.setProvider(web3.currentProvider, () => {
    console.log("Provider set");
});


asset = contract(Asset);
asset.setProvider(web3.currentProvider, () => {
    console.log("Provider set");
});