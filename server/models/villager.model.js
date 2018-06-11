var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');

var addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true }, 
    zip: { type: String, required: true }
});

var paymentInfoSchema = new mongoose.Schema({
    address: addressSchema,
    cardholdername: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expmonth: { type: String, required: true },
    expyear: { type: String, required: true },
    cvv: { type: String, required: true },
});

var villagerSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    phonenumber: { type: String, required: true},
    address: addressSchema, 
    paymentinfo: paymentInfoSchema
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

villagerSchema.pre('save', function (next) {
    var villager = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(villager.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                villager.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

villagerSchema.methods.comparePassword = function comparePassword(passw) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passw, this.password, function(err, isMatch) {
           if(err) { 
               reject(err); 
           } else {
               resolve(isMatch);
           }
        });
    });
}

villagerSchema.plugin(mongoosePaginate)
const Villager = mongoose.model('villager', villagerSchema);

module.exports = Villager;
