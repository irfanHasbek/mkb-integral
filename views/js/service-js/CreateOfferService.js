var CreateOfferModel = require('../Model-js/CreateOfferModel');
var SequenceModel = require('../Model-js/SequenceModel');
function CreateOfferService()
{
    
}

CreateOfferService.prototype.addNew = function(offer, callback){
    var newOffer = new CreateOfferModel(offer);
    //console.log(JSON.stringify(newOffer));
    SequenceModel.findOne({name : 'teklifNoSeq'}, function(errSeq, seq){
        var counter = 0;
        var newSeq = false;
        if(errSeq || seq == null){
            counter = 1;
            newSeq = true;
        }else{
            counter = seq.cnt;   
        }
        newOffer.offerNo = counter;
        newOffer.save(function(errOffer, addedOffer){
            if(errOffer || addedOffer == null){
                callback(false,errOffer);
                return;
            }
            counter += 1;
            if(!newSeq){
                SequenceModel.update({_id : seq._id , name : 'teklifNoSeq', cnt : counter}, function(errorSeqUpdate){
                    if(errorSeqUpdate){
                        callback(false,errorSeqUpdate);
                        return;
                    }
                    callback(true, addedOffer);
                });   
            }
            else{
                new SequenceModel({name : 'teklifNoSeq', cnt : counter}).save(function(errorSaveSeq, newestSeq){
                    if(errorSaveSeq){
                        callback(false,errorSaveSeq);
                        return;
                    }
                    callback(true, addedOffer);
                });   
            }
        });
    });
}
CreateOfferService.prototype.update = function(offer, callback){
    CreateOfferModel.update({_id :offer._id},offer, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success');
    });
}
CreateOfferService.prototype.updateDates = function(id,dates,basket,callback){
    CreateOfferModel.findOne({_id :id}, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        for(var i=0;i<respOffer.basket.length;i++){
            if(respOffer.basket[i]._id==basket._id){
                respOffer.basket[i].note=basket.note;
            
            }
        }
       respOffer.dates.deliveryDate=dates.deliveryDate;
       respOffer.dates.startJobDate=dates.startJobDate;
        respOffer.save(function(errSave,respSave){
            if(errSave){
                callback("false",error);
                return;
            }
            callback("true","success");
        });
    });
}
CreateOfferService.prototype.updateProductNote = function(id,basket,dates,callback){
    CreateOfferModel.findOne({_id :id}, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        for(var i=0;i<respOffer.basket.length;i++){
            if(respOffer.basket[i]._id==basket._id){
               respOffer.basket[i].note=basket.note;
            
            }
        }
        respOffer.dates.deliveryDate=dates.deliveryDate;
        respOffer.save(function(errSave,respSave){
            if(errSave){
                callback("false",error);
                return;
            }
            callback("true","success");
        });
    });
}
CreateOfferService.prototype.updateStatus = function(id, offerStatus, callback){
    CreateOfferModel.findOne({ _id : id }, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        respOffer.offerStatus = offerStatus;
        respOffer.save(function(errorSave, responseSave){
            if(errorSave){
                callback(false, error);
                return; 
            }
            callback(true, 'success');
        });
    });
}
CreateOfferService.prototype.updateJobStatus = function(id,jobStatus,personInfo, callback){
    CreateOfferModel.findOne({ _id : id}, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        respOffer.status.job = jobStatus;
        if(jobStatus=="devam_eden"){
        respOffer.personPrepareJobInfo.personId=personInfo.personId;
        respOffer.personPrepareJobInfo.personName=personInfo.personName;
        }else{
            respOffer.personAcceptJobInfo.personId=personInfo.personId;
            respOffer.personAcceptJobInfo.personName=personInfo.personName;
        }
        respOffer.save(function(errorSave, responseSave){
            if(errorSave){
                callback(false, error);
                return; 
            }
            callback(true, 'success');
        });
    });
}
CreateOfferService.prototype.addActivity = function(id, activity, callback){
    var activityObj = {activities : [activity]};
    CreateOfferModel.update({ _id : id },{$pushAll : activityObj} ,function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        callback(true, 'success : affected row : ' + respOffer);
    });
}
CreateOfferService.prototype.removeActivity = function(id,activityId,callback){
    CreateOfferModel.update({_id:id},{$pull : {activities:{_id:activityId}}},function(error,respOffer){
        if(error){
            callback(false,error);
            return;
        }
        callback("true","success : affected row : "+respOffer);
    });
}
CreateOfferService.prototype.updateOfferCase = function(id, offerStatus, acceptPerson, forwardingInfo, acceptOfferDate, callback){
    CreateOfferModel.findOne({ _id : id }, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        respOffer.status['offerCase'] = offerStatus.offerCase;
        respOffer.status['job'] = offerStatus.job;
        respOffer.status['losingReason'] = offerStatus.losingReason;
        respOffer.status['winFirm'] = offerStatus.winFirm;
        respOffer.forwardingInfo['forwardId'] = forwardingInfo.forwardId;
        respOffer.forwardingInfo['forwardLabel'] = forwardingInfo.forwardLabel;
        
        respOffer.personAcceptOfferInfo['personId'] = acceptPerson.personId;
        respOffer.personAcceptOfferInfo['personName'] = acceptPerson.personName;
        
        respOffer.dates['acceptOfferDate'] = acceptOfferDate;
        
        respOffer.save(function(errorSave, responseSave){
            if(errorSave){
                callback(false, error);
                return; 
            }
            callback(true, 'success');
        });
    });
}
CreateOfferService.prototype.updateOfferCaseForConfirm = function(id, offerCase, callback){
    CreateOfferModel.findOne({ _id : id }, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        respOffer.status['offerCase'] = offerCase;
        
        respOffer.save(function(errorSave, responseSave){
            if(errorSave){
                callback(false, error);
                return; 
            }
            callback(true, 'success');
        });
    });
}
CreateOfferService.prototype.updateOfferCaseForCancel = function(id, offerCase, callback){
    CreateOfferModel.findOne({ _id : id }, function(error,respOffer){
     if(error){
            callback(false, error);
            return;
        }
        respOffer.status['offerCase'] = offerCase;
        respOffer.status['job'] = '';
        respOffer.status['losingReason'] = '';
        respOffer.status['winFirm'] = '';
        respOffer.forwardingInfo['forwardId'] = '';
        respOffer.forwardingInfo['forwardLabel'] = '';
        
        respOffer.personAcceptOfferInfo['personId'] = '';
        respOffer.personAcceptOfferInfo['personName'] = '';
        
        respOffer.dates['acceptOfferDate'] = '';
        
        respOffer.save(function(errorSave, responseSave){
            if(errorSave){
                callback(false, error);
                return; 
            }
            callback(true, 'success');
        });
    });
}
CreateOfferService.prototype.remove = function(offerId,callback){
    CreateOfferModel.remove({_id:offerId._id},function(error){
        if(error){
            callback(false, error);
            return;
        }
        callback(true,"teklif tanımı silindi.");
    });
}
CreateOfferService.prototype.removeAll = function(callback){
    CreateOfferModel.remove(function(error){
        if(error){
            //conso
            callback(false, error);
            return;
        }
        callback(true, "Tüm teklifler silindi.");
    });
}

CreateOfferService.prototype.listAll = function(criteria,callback){
    CreateOfferModel.find({ firmCode : criteria }, function(error, offers){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, offers);
    });
}

CreateOfferService.prototype.getOffer = function(offerId, callback){
    CreateOfferModel.findOne({ _id : offerId }, function(error, offer){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, offer);
    });
}

CreateOfferService.prototype.search = function(criteria, callback){
    CreateOfferModel.find(criteria,function(error, offers){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, offers);
    });
}
CreateOfferService.prototype.searchArr = function(criteria, callback){
    //console.log("criteria : " + JSON.stringify(criteria));
    CreateOfferModel.find({"status.offerCase" : { $in : criteria.statusList },firmCode:criteria.firmCode,"customerInfo.customerId":criteria.custId }, function(error, offers){
        if(error){
            //console.log("error : " + JSON.stringify(error));
            //console.log("product : " + JSON.stringify(products));
            callback(false, error);
            return;
        }
        callback(true, offers);
    });
}
CreateOfferService.prototype.searchandGetCount = function(criteria, callback){
    CreateOfferModel.count(criteria,function(error, offers){
        if(error){
            callback(false, error);
            return;
        }
        callback(true, offers);
    });
}

CreateOfferService.prototype.updateActivity = function(activityId, status, note, callback){
    CreateOfferModel.update({ 'activities._id' : activityId }, {$set : { 'activities.$.activityStatus' : status, 'activities.$.note' : note}},        function(error, affectedRow){
         if(error){
            callback(false, error);
            return;
         }
         callback(true, affectedRow);
    });
}

CreateOfferService.prototype.updatePdfInfo = function(offerId, _pdfInfo, callback){
    CreateOfferModel.update({ '_id' : offerId }, { 'pdfInfo.pdfStatus' : _pdfInfo.pdfStatus, 'pdfInfo.pdfUrl' : _pdfInfo.pdfUrl }, function(error, affectedRow){
         if(error){
            callback(false, error);
            return;
         }
         callback(true, affectedRow);
    });
}

module.exports = CreateOfferService;