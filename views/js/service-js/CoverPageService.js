var CoverPageModel=require('../Model-js/OfferCoverPageModel');

function CoverPageService()
{
    
}
CoverPageService.prototype.addNew = function(CoverPage, callback){
    var newCoverPage = new CoverPageModel(CoverPage);
    newCoverPage.save(function(err, addedCoverPage){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,addedCoverPage);
    });
}
CoverPageService.prototype.removeAll = function(callback){
    CoverPageModel.remove(function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, "Tüm kapak sayfalari silindi.");
    });
}
 CoverPageService.prototype.remove = function(coverPageId,callback){
    CoverPageModel.remove({_id:coverPageId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"kapak sayfasi silindi.");
    });
}
CoverPageService.prototype.listAll = function(firmCode,callback){
    CoverPageModel.find({firmCode:firmCode}).exec(function(error, CoverPage){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, CoverPage);
    });
}
CoverPageService.prototype.search = function(criteria,callback){
    CoverPageModel.find(criteria).exec(function(error, CoverPage){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, CoverPage);
    });
}
CoverPageService.prototype.update = function(CoverPage, callback){
    CoverPageModel.update(CoverPage, function(err, affectedRow){
        if(err){
            callback(false,error);
            return;
        }
        callback(true,affectedRow);
    });
}
module.exports = CoverPageService;