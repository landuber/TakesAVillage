var VillagerService = require('../services/villager.service');


_this = this;

//todo: move this to a utility file
getToken = function(hearders) {
    if(headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if(parted.length == 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

exports.getVillagers = async function(req, res, next) {

    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var villagers = await VillagerService.getVillagers({}, page, limit);

        return res.status(200).json({status: 200, data: villagers, message: 'successfully villagers received'});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};





exports.createVillager = async function(req, res, next){

    // Req.Body contains the form submit values.
    if(!req.body.email || 
       !req.body.password ||
       !req.body.firstname ||
       !req.body.lastname ||
       !req.body.address.street ||
       !req.body.address.city ||
       !req.body.address.state ||
       !req.body.address.zip
    ) {
        res.json({ success: false, msg: 'Missing required fields'});
    } else {

        console.log(req.body);
        var villager = {
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            phonenumber: req.body.phonenumber,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                state: req.body.address.state,
                zip: req.body.address.zip
            },
            paymentinfo: { 
                 cardholdername: req.body.paymentinfo.cardholdername,
                 cardnumber: req.body.paymentinfo.cardnumber,
                 expmonth: req.body.paymentinfo.expmonth,
                 expyear: req.body.paymentinfo.expyear,
                 cvv: req.body.paymentinfo.cvv,
                 address:
                  { 
                    street: req.body.paymentinfo.address.street,
                    city: req.body.paymentinfo.address.city,
                    state: req.body.paymentinfo.address.state,
                    zip: req.body.paymentinfo.address.zip 
                  } 
            }
        }

        try {
            // Calling the Service function with the new object from the Request Body
            var createdVillager = await VillagerService.createVillager(villager);
            return res.status(201).json({status: 201, data: createdVillager, message: "Succesfully Created a Villager"});
        } catch(e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({status: 400, message: "Villager Creation was Unsuccesfull"})
        }
    }
}

exports.signInVillager = async function(req, res, next) {
    try {
        var payload = await VillagerService.signInVillager(req.body.email, req.body.password);
        return res.status(201).json({...payload, status:201, message: "Successfully Signed In a Villager"});
    } catch(e) {
            return res.status(401).json({status: 401, message: "Authentication failed."})
    }

};

exports.updateVillager = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;


    var villager = {
        id,
        ShortBio: req.body.shortBio ? req.body.shortBio : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedVillager = await VillagerService.updateVillager(villager)
        return res.status(200).json({status: 200, data: updatedVillager, message: "Succesfully Updated Villager"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeVillager = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await VillagerService.deleteVillager(id)
        return res.status(204).json({status:204, message: "Succesfully Villager Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}
