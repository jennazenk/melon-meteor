import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Data } from '../imports/api/data.js';
import '/imports/startup/client/startup-ethereum.js';

import './main.html';


//User infos from metamask
var userAddress = web3.eth.accounts[0];
web3.eth.getBalance(userAddress, function(err, res) {
    if (!err) {
        Session.set('balance', web3.fromWei(res, "ether").toNumber() + " ETH");
    } else {
        console.log(err);
    }
})

var exchangeInstance;


exchange.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
    exchangeInstance = instance;
    return exchangeInstance.getLastOfferId()
}).then(function(lastOfferId) { //Get last offer id for last two offers
    Session.set('lastOfferId', lastOfferId.toNumber());
    Session.set('secondLastId', lastOfferId.toNumber() - 1);
    return exchangeInstance.isActive(lastOfferId)
}).then(function(bool) {    //isActive function on last offer
    Session.set('isActive1', bool);
    return exchangeInstance.isActive(Session.get('secondLastId'))
}).then(function(bool) { //isActive function on second last offer
    Session.set('isActive2', bool);
    return exchangeInstance.getOwner(Session.get('lastOfferId'))
}).then(function(owner) { //getOwner on last offer
    Session.set('getOwner1', owner);
    return exchangeInstance.getOwner(Session.get('secondLastId'))
}).then(function(owner) { //getOwner on second last offer
    Session.set('getOwner2', owner);
    return exchangeInstance.getOffer(Session.get('lastOfferId'))
}).then(function(offer) { //getting the data for last offer
    Session.set('getOffer', offer);
    Session.set('buyQty', offer[2] / (Math.pow(10, 18))); //TODO : get precision directly from contract
    Session.set('sellToken', offer[1]);
    Session.set('buyToken', offer[3]);
    Session.set('sellQty', offer[0] / (Math.pow(10, 8))); //TODO : get precision directly from contract
    return asset.at(Session.get('sellToken')) //instantiation of asset at sell token address
}).then(function(sellAssetInstance) {
    return sellAssetInstance.name()
}).then(function(name) {
    Session.set('sellToken', name);
    return asset.at(Session.get('buyToken')) //instantiation of asset at buy token address
}).then(function(buyAssetInstance) {
    return buyAssetInstance.name()
}).then(function(name) {
    Session.set('buyToken', name);

})



Template.offers.helpers({
    'account': function() {
        return web3.eth.accounts;
    },
    'balance': function() {
        return Session.get('balance');
    },
    'exchange': function() {
        return exchangeProtocolContract;
    },
    'lastId': function() {
        return Session.get('lastOfferId');
    },
    'secondLastId': function() {
        return Session.get('secondLastId');
    },
    'isActive1': function() {
        if(Session.get('isActive1') == false) return "Inactive"
        if(Session.get('isActive1') == true) return "Active"
    },
    'isActive2': function() {
        if(Session.get('isActive2') == false) return "Inactive"
        if(Session.get('isActive2') == true) return "Active"    
    },
    'owner1': function() {
        return Session.get('getOwner1')
    },
    'owner2': function() {
        return Session.get('getOwner2')
    },
    'buyToken': function() {
        return Session.get('buyToken');
    },
    'buyQty': function() {
        return Session.get('buyQty');
    },
    'sellToken': function() {
        return Session.get('sellToken');
    },
    'sellQty': function() {
        return Session.get('sellQty');
    }
})

