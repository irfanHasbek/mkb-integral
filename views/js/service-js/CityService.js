var CityModel=require('../Model-js/CityModel');

function CityService(){}

CityService.prototype.addNew = function(City, callback){
    var newCity=new CityModel({city : City.city});
    newCity.save(function(err, addedCity){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCity);
    });
}
CityService.prototype.bulkInsert = function(City, callback){
    var newCity=new CityModel(City);
    newCity.save(function(err, addedCity){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCity);
    });
}
CityService.prototype.removeAll = function(callback){
    CityModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm iller silindi.");
    });
}
 CityService.prototype.remove = function(cityId,callback){
    CityModel.remove({_id:cityId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"il silindi.");
    });
}
CityService.prototype.listAll = function(callback){
    CityModel.find({}, function(error, Citys){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, Citys);
    });
}
CityService.prototype.addTown = function(city, callback) {
            var newTown={"towns":[{townName:city.townName}]};
            CityModel.update({_id: city._id},{$pushAll : newTown},function(err, town){
                if(err){
                       callback(false,err);
                   return;
                }
                callback(true,town,"ilçe basarı ile eklendi");
            });
         },
CityService.prototype.removeTown = function(resp, callback) {
    CityModel.update({ _id : resp.cityId },{$pull :{ towns : {townName : resp.townName}}}, function(err, city) {
        console.log(JSON.stringify(city));
        if(err) {
            callback(false,err);
           return;
         }
        callback(true,city,"ilçe başarı ile silindi");
    });
}
CityService.prototype.getTowns =function(resp, callback) {
    CityModel.find({_id : resp._id}, function(err, city) {
      if(err){
        callback(false,err);
        return;
      }
        callback(true,city);
    });
 }


module.exports = CityService;