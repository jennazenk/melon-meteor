var ERC20Protocol = artifacts.require("./ERC20Protocol.sol");
var ERC20 = artifacts.require('./ERC20.sol');
var Asset = artifacts.require('./Asset.sol');
var MutexUser = artifacts.require('./MutexUser.sol');
var SafeMath = artifacts.require('./SafeMath.sol');
var ExchangeProtocol = artifacts.require('./ExchangeProtocol.sol');
var Exchange = artifacts.require('./Exchange.sol');

// Constructor arguments for Asset.sol
var name = "test";
var symbol = "TST";
var decimals = 0;

module.exports = function(deployer) {
  // Deploy the Assets with proper links and construction
  deployer.deploy(ERC20Protocol);
  deployer.link(ERC20Protocol, ERC20);
  deployer.deploy(ERC20);
  deployer.link(ERC20, Asset);
  deployer.deploy(Asset, name, symbol, decimals);

  deployer.deploy(MutexUser);
  deployer.deploy(SafeMath);
  deployer.deploy(ExchangeProtocol);
  deployer.link(SafeMath, MutexUser, ExchangeProtocol, Exchange);
  deployer.deploy(Exchange);

};
