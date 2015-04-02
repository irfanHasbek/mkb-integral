var mongoose=require("../../../app").mongoose;

var CityScheme=new mongoose.Schema({
    city:String,
    towns:[{townName : String}]
});
module.exports = mongoose.model("citys",CityScheme);