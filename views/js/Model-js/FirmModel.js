var mongoose = require('../../../app').mongoose;

var FirmSchema = new mongoose.Schema({
    firmCode : String,
    name : String,
    logoUrl : String,
    email : String,
    password : String,
    competentInformation : {
        name : String,
        task : String,
        gsm : String,
        email : String
    },
    contactInformation : {
        address : String,
        city : String,
        state : String,
        businessTel : String,
        fax : String,
        web : String
    }
});

module.exports = mongoose.model('firm', FirmSchema);
