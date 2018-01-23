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
        Email: villager.email,
        Password: villager.password,
        FirstName: villager.firstname,
        MiddleName: villager.middlename,
        LastName: villager.lastname,
        Street: villager.street,
        City: villager.city,
        State: villager.state,
        Zip: villager.zip,
        SSN: villager.ssn,
        ShortBio: villager.shortbio
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
        var villager = await Villager.findOne({ Email: email });
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
                        subject: villager.Email
                    })
                };
            } else {
                throw Error('Wrong password');
            }
        }
    } catch(e) {
        console.log('Error while signing in');
        throw Error('Error while signing in')
    }
};

exports.updateTodo = async function(villager) {
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
