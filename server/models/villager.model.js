var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');

var VillagerSchema = new mongoose.Schema({
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password:  {
        type: String,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    MiddleName: {
        type: String
    },
    LastName: {
        type: String,
        required: true
    },
    Street: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Zip: {
        type: String,
        required: true
    },
    SSN: {
        type: String,
        required: true
    },
    ShortBio: {
        type: String
    }
});

/*
VillagerSchema.pre('save', async function hashPassword(next) {  
  try {
    const villager = this;

    // only hash the password if it has been modified (or is new)
    if (!villager.isModified('Password')) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await bcrypt.hash(villager.Password, salt);

    // override the cleartext password with the hashed one
    user.Password = hash;
    return next();
  } catch (e) {
    return next(e);
  }
});
*/

VillagerSchema.pre('save', function (next) {
    var villager = this;
    console.log(villager);
    if (this.isModified('Password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(villager.Password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                villager.Password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

VillagerSchema.methods.comparePassword = function comparePassword(passw) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passw, this.Password, function(err, isMatch) {
           if(err) { 
               reject(err); 
           } else {
               resolve(isMatch);
           }
        });
    });
}

VillagerSchema.plugin(mongoosePaginate)
const Villager = mongoose.model('Villager', VillagerSchema);

module.exports = Villager;
