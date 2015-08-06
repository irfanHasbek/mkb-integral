var mongoose = require('../../../app').mongoose;

var SequenceModel = new mongoose.Schema({
    name : String,
    cnt : Number 
});

module.exports = mongoose.model('sequence', SequenceModel);
