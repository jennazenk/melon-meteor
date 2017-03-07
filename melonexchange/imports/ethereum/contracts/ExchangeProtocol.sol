pragma solidity ^0.4.4;

import './ERC20.sol';

contract ExchangeProtocol {

    // CONSTANT METHODS

    function getLastOfferId() constant returns (uint) {}
    function isActive(uint id) constant returns (bool active) {}
    function getOwner(uint id) constant returns (address owner) {}
    function getOffer(uint id) constant returns (uint, ERC20, uint, ERC20) {}

    // NON-CONSTANT METHODS

    function offer(
        uint sell_how_much, ERC20 sell_which_token,
        uint buy_how_much,  ERC20 buy_which_token
    )
        returns (uint id)
    {}
    function buy(uint id, uint quantity) returns (bool) {}
    function cancel(uint id) returns (bool) {}

    // EVENTS

    event ItemUpdate(uint id);
    event Trade(uint sell_how_much, address indexed sell_which_token,
        uint buy_how_much, address indexed buy_which_token);

}