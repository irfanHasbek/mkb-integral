var mongoose = require('../../../app').mongoose;

var ProductSchema = new mongoose.Schema({
    firmCode : String,
    group : String,
    code : String,
    name : String,
    pictureUrl : String,
    description : String
});

module.exports = mongoose.model('products', ProductSchema);