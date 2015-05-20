var CreateOfferService = require("../service-js/CreateOfferService");
var FirmModel = require("../Model-js/FirmModel");
var cos = new CreateOfferService();

function createOffer(type, req) {

    var offerObj = {
        firmCode: req.session.user.firmCode,
        offerDate: req.body.offerDate,
        offerStatus: req.body.offerStatus,
        offerTopic: req.body.offerTopic,
        customerInfo: {
            customerId: req.body.customerId,
            customerName: req.body.customerName
        },
        competentInfo: {
            competentId: req.body.competentId
        },
        personPrepareOfferInfo: {
            personId: req.body.personId,
            personName: req.body.personName
        },
        basket: [],
        cost: {
            generalDiscount: req.body.generalDiscount,
            roundingDiscount: req.body.productRoundingDiscount,
            sum: req.body.sum,
            kdv: req.body.productKDV,
            total: req.body.total
        },
        payMethod: {
            payMethod: req.body.payMethod,
            note: req.body.note,
            vade : req.body.vade
        },
        activities: [],
        coverDescription : req.body.coverDescription
    };
    if(type == 'update') {
        offerObj._id = req.body._id;
        offerObj['status.offerCase'] = 'onay_bekleyen_teklifler';
    }else{
        offerObj.state="Sistem";
        offerObj.offerNo = '';
        offerObj['personAcceptOfferInfo.personId'] = '';
        offerObj['personAcceptOfferInfo.personName'] = '';
        offerObj['personPrepareJobInfo.personId'] = '';
        offerObj['personPrepareJobInfo.personName'] = '';
        offerObj['personAcceptJobInfo.personId'] = '';
        offerObj['personAcceptJobInfo.personName'] = '';
        offerObj['status.offerCase'] = 'onay_bekleyen_teklifler';
        offerObj['status.job'] = '';
        offerObj['status.losingReason'] = '';
        offerObj['status.winFirm'] = '';
        offerObj['forwardingInfo.forwardId'] = '';
        offerObj['forwardingInfo.forwardLabel'] = '';
        offerObj['dates.deliveryDate'] = '';
        offerObj['dates.startJobDate'] = '';
        offerObj['dates.acceptOfferDate'] = '';
        offerObj['pdfInfo.pdfStatus'] = 'false';
        offerObj['pdfInfo.pdfUrl'] = '';
    }
    offerObj.basket = JSON.parse(req.body.basket);
    return offerObj;
}

function createB2bOffer(type,req) { 

    var offerObj = {
        firmCode: req.session.customer.firmCode,
        offerDate: req.body.offerDate,
        customerInfo: {
            customerId: req.body.customerId,
            customerName: req.body.customerName
        },
        childCustomerInfo:{
            childCustomerId :req.body.childCustomerId,
            childCustomerName :req.body.childCustomerName
        },
        competentInfo: {
            competentId: req.body.competentId
        },
        personPrepareOfferInfo: {
            personId: req.session.customer._id,
            personName: req.session.customer.customerName
        },
        basket: [],
        cost: {
            generalDiscount: req.body.generalDiscount,
            sum: req.body.sum,
            kdv: req.body.productKDV,
            total: req.body.total
        },
        payMethod: {
            payMethod: req.body.payMethod,
            note: req.body.note,
            vade : req.body.vade
        },
        activities: [],
    };
    if(type == 'update') {
        offerObj._id = req.body._id;
         offerObj['status.offerCase'] = 'onay_bekleyen_teklifler';
    }else{
        offerObj.state = "B2b";
        offerObj.offerNo =  "";
        offerObj.offerStatus =  "";
        offerObj.offerTopic = "";
        offerObj.cost.roundingDiscount = "";
        offerObj['personAcceptOfferInfo.personId'] = '';
        offerObj['personAcceptOfferInfo.personName'] = '';
        offerObj['personPrepareJobInfo.personId'] = '';
        offerObj['personPrepareJobInfo.personName'] = '';
        offerObj['personAcceptJobInfo.personId'] = '';
        offerObj['personAcceptJobInfo.personName'] = '';
         offerObj['status.offerCase'] = 'onay_bekleyen_teklifler';
        offerObj['status.job'] = '';
        offerObj['status.losingReason'] = '';
        offerObj['status.winFirm'] = '';
        offerObj['forwardingInfo.forwardId'] = '';
        offerObj['forwardingInfo.forwardLabel'] = '';
        offerObj['dates.deliveryDate'] = '';
        offerObj['dates.startJobDate'] = '';
        offerObj['dates.acceptOfferDate'] = '';
        offerObj['pdfInfo.pdfStatus'] = 'false';
        offerObj['pdfInfo.pdfUrl'] = '';
        offerObj.coverDescription = '';
    }
    offerObj.basket = JSON.parse(req.body.basket);
    return offerObj;
}

function firmCheckerAndPush(firmCode, tempOffer, req, res) {
    FirmModel.findOne({
        firmCode: firmCode
    }, function (error, firm) {
        if(error) {
            res.send({
                state: false,
                response: error
            });
            return;
        }
        if(firm) {
            cos.addNew(tempOffer, function (state, response) {
                if(!state) {
                    res.send({
                        state: state,
                        response: response
                    });
                    return;
                }
                res.send({
                    state: state,
                    response: response
                });
            });
        } else {
            res.send({
                state: false,
                response: "firma hatası"
            });
        }
    });
}
module.exports = {
    addNew: function (req, res) {
        var tempOffer;
        if(req.originalUrl == "/wsoffer/b2badd") {
            tempOffer = createB2bOffer("add",req);
            firmCheckerAndPush(req.session.customer.firmCode, tempOffer, req, res);
        } else {
            tempOffer = createOffer("add", req);
            firmCheckerAndPush(req.session.user.firmCode, tempOffer, req, res);
        }
    },
    update: function (req, res) {
        var tempOffer;
        if(req.originalUrl == "/wsoffer/b2bupdate"){
            tempOffer = createB2bOffer("update", req);
        }else{
            tempOffer = createOffer("update", req);
        }
        //console.log(JSON.stringify(tempOffer));
        cos.update(tempOffer, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateDates: function (req, res) {
        cos.updateDates(req.body._id, req.body.dates, req.body.basket, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateProductNote: function (req, res) {
        cos.updateProductNote(req.body._id, req.body.basket, req.body.dates, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateStatus: function (req, res) {
        var offerId = req.body._id;
        var offerStatus = req.body.offerStatus;
        cos.updateStatus(offerId, offerStatus, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateJobStatus: function (req, res) {
        var offerId = req.body._id;
        var jobStatus = req.body.status.job;
        var personConfirmJob = {
            personId: req.session.user._id,
            personName: req.session.user.name + " " + req.session.user.surname
        };
        cos.updateJobStatus(offerId, jobStatus, personConfirmJob, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateOfferCase: function (req, res) {
        //console.log(JSON.stringify(tempOffer));
        var offerId = req.body._id;
        var status = req.body.status;
        var acceptPerson = req.body.acceptPerson;
        var forwardingInfo = req.body.forwardingInfo;
        var acceptOfferDate = req.body.acceptOfferDate;

        cos.updateOfferCase(offerId, status, acceptPerson, forwardingInfo, acceptOfferDate, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateOfferCaseForConfirm: function (req, res) {
        cos.updateOfferCaseForConfirm(req.body.offerId, req.body.status, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateOfferCaseForCancel: function (req, res) {
        cos.updateOfferCaseForCancel(req.body.offerId, req.body.status, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    addActivity: function (req, res) {
        //console.log(JSON.stringify(tempOffer));
        var offerId = req.body.offerId;
        var activity = req.body.activity;
        cos.addActivity(offerId, activity, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    removeActivity: function (req, res) {
        var offerId = req.body.offerId;
        var activityId = req.body.activityId;
        cos.removeActivity(offerId, activityId, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    remove: function (req, res) {
        cos.remove(req.body, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    removeAll: function (req, res) {
        cos.removeAll(function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    listAll: function (req, res) {
        cos.listAll(req.session.user.firmCode, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    getOffer: function (req, res) {
        cos.getCreateOffer(req.body, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    searchOffer: function (req, res) {
        var criteria = req.body.search;
        if(req.session.accountType=="customer"){
            criteria.firmCode=session.customer.firmCode;
        }else{
            criteria.firmCode = req.session.user.firmCode;
        }
        cos.search(criteria, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    searchandGetCount: function (req, res) {
        var criteria = req.body;
        criteria.firmCode = req.session.user.firmCode;
        cos.searchandGetCount(criteria, function (state, response) {
            if(!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateActivity : function(req, res){
        cos.updateActivity(req.body.activityId, req.body.status, req.body.note, function(state, response){
             if(!state){
                res.send({
                    state: state,
                    response: Error
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    },
    updatePdfInfo : function(req, res){
        cos.updatePdfInfo(req.body._id, req.body.info, function(state, response){
             if(!state){
                res.send({
                    state: state,
                    response: Error
                });
                return;
            }
            res.send({
                state: state,
                response: response
            });
        });
    }
}