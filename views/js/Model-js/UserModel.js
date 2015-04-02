var mongoose = require('../../../app').mongoose;

var UserSchema = new mongoose.Schema({
    firmCode : String,
    name : String,
    surname : String,
    email : String,
    password : String,
    role : String,
    task : String,
    gsm1 : String,
    gsm2 : String,
    pictureUrl : String,
    accountType : String,
    isActive : String
});

module.exports = mongoose.model('users', UserSchema);
