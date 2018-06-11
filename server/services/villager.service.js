var fs = require('fs');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var Villager = require('../models/villager.model');

_this = this;

exports.getVillagers = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };

    try {
        var villagers = await Villager.paginate(query, options);
        return villagers;
    } catch(e) {
        throw Error('Error while Paginating Villagers');
    }
};


exports.createVillager = async function(villager) {
    
    // Creating a new villager 
    var villager = new Villager({
        email: villager.email,
        password: villager.password,
        firstname: villager.firstname,
        middlename: villager.middlename,
        lastname: villager.lastname,
        phonenumber: villager.phonenumber,
        address: {
            street: villager.address.street,
            city: villager.address.city,
            state: villager.address.state,
            zip: villager.address.zip
        },
        paymentinfo: {
            address: {
                street: villager.paymentinfo.address.street,
                city: villager.paymentinfo.address.city,
                state: villager.paymentinfo.address.state,
                zip: villager.paymentinfo.address.zip
            },
            cardholdername: villager.paymentinfo.cardholdername,
            cardnumber: villager.paymentinfo.cardnumber,
            expmonth:  villager.paymentinfo.expmonth,
            expyear:  villager.paymentinfo.expyear,
            cvv:  villager.paymentinfo.cvv
        }
    });

    try {
        var savedVillager = await villager.save();
        return savedVillager;
    } catch(e) {
        console.log(villager);
        console.log(e);
        throw Error('Error while creating a villager');
    }
};

exports.signInVillager = async function(email, password) {
    //todo: change to private key instead of secretkey
    //var RSA_PRIVATE_KEY = fs.readFileSync('./config/private.key');
    try {
        var villager = await Villager.findOne({ email: email });
        if(!villager) {
            throw Error('villager not found');
        } else {
            var isMatch =  await villager.comparePassword(password);
            if(isMatch) {
                return { 
                    villager: villager,
                    expiresIn: 7200, 
                    token: 'JWT ' + jwt.sign({}, config.secret, {
                        expiresIn: '2h',
                        subject: villager.email
                    })
                };
            } else {
                throw Error('Wrong password');
            }
        }
    } catch(e) {
        throw Error('Error while signing in')
    }
};

exports.updateVillager = async function(villager) {
    var id = villager.id;

    try {
        var oldVillager = await Villager.findById(id);
    } catch(e) {
        throw Error('Error occured while Finding the villager');
    }

    if(!oldVillagero) {
        return false;
    }

    // Edit the villager
    oldVillager.shortBio = villager.shortBio;

    try {
        var savedVillager = await oldVillager.save();
        return savedVillager;
    } catch(e) {
        throw Error('Error occured while updating the villager');
    }
};


exports.deleteVillager = async function(id) {
    try {
        var deleted = await Villager.remove({_id: id});
        if(deleted.result.n === 0) {
            throw Error('Villager could not be deleted');
        }
    } catch(e) {
        throw Error('Error occured while deleting the villager');
    }
};
