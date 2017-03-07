import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Data } from '../imports/api/data.js';
import '/imports/startup/client/startup-ethereum.js';

import './main.html';

// myContract.deployed().then((instance) => {
//     var deployed = instance;
//     return deployed;
// })

myContract.at("0x9646756721bf3eb9c46fdf8b19f59d9f6a29c614").then(function(instance) {
    console.log(instance);
})

Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
    counter() {
        return Template.instance().counter.get();
    },
    data() {
        console.log(Data.find())
        return Data.find({});
    }
});

Template.hello.events({
    'click button' (event, instance) {
        // increment the counter when button is clicked
        instance.counter.set(instance.counter.get() + 1);
    },
});

console.log("Accounts", web3.eth.accounts);
