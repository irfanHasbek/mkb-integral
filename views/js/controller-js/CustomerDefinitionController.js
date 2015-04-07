var CustomerDefinitionService = require("../service-js/CustomerDefinitionService");
var FirmModel = require("../Model-js/FirmModel");
var cds = new CustomerDefinitionService();

function createCustomerDefinition(type, req) {
    var custDefObj = {
        firmCode: req.session.user.firmCode,
        customerTitle: req.body.customerTitle,
        customerName: req.body.customerName,
        customerGroup: req.body.customerGroup,
        customerAgent: req.body.customerAgent,
        userName: "",
        password: "",
        webAccess: false,
        webOrder: false,
        discountInfo: req.body.discountInfo,
        competentInfo: [],
        contactInfo: {
            address: req.body.custDefContactAddress,
            city: req.body.custDefContactCity,
            state: req.body.custDefContactState,
            businessPhone: req.body.custDefContactBusinessPhone,
            fax: req.body.custDefContactFax,
            webAddress: req.body.custDefContactWebAdress
        },
        billInfo: {
            address: req.body.custDefBillAddress,
            city: req.body.custDefBillCity,
            state: req.body.custDefBillState,
            taxOffice: req.body.custDefBillTaxOffice,
            taxNum: req.body.custDefBillTaxNum
        },
        forwardingInfo: []
    }
    if (type == 'update') {
        custDefObj._id = req.body._id;
    }
    custDefObj.competentInfo = JSON.parse(req.body.competent);
    custDefObj.forwardingInfo = JSON.parse(req.body.forwarding);
    return custDefObj;
}
function updateB2bCustomer(req) {
    var custDefObj = {
        _id : req.body._id,
        firmCode: req.body.firmCode,
        customerTitle: req.body.customerTitle,
        customerName: req.body.customerName,
        customerGroup: req.body.customerGroup,
        customerAgent: req.body.customerAgent,
        competentInfo: [],
        contactInfo: {
            address: req.body.custDefContactAddress,
            city: req.body.custDefContactCity,
            state: req.body.custDefContactState,
            businessPhone: req.body.custDefContactBusinessPhone,
            fax: req.body.custDefContactFax,
            webAddress: req.body.custDefContactWebAdress
        },
        billInfo: {
            address: req.body.custDefBillAddress,
            city: req.body.custDefBillCity,
            state: req.body.custDefBillState,
            taxOffice: req.body.custDefBillTaxOffice,
            taxNum: req.body.custDefBillTaxNum
        },
        forwardingInfo: []
    }
    custDefObj.competentInfo = JSON.parse(req.body.competent);
    custDefObj.forwardingInfo = JSON.parse(req.body.forwarding);
    return custDefObj;
}

function createCustomerRegister(type, req) {
    var custDefObj = {
        firmCode: req.body.firmCode,
        customerTitle: req.body.customerTitle,
        customerName: req.body.customerName,
        customerGroup: "",
        customerAgent: "",
        userName: "",
        password: "",
        webAccess: false,
        webOrder: false,
        discountInfo: "",
        competentInfo: [],
        contactInfo: {
            address: req.body.contactAddress,
            city: "",
            state: "",
            businessPhone: req.body.contactPhone,
            fax: "",
            webAddress: ""
        },
        billInfo: {
            address: "",
            city: "",
            state: "",
            taxOffice: "",
            taxNum: ""
        },
        forwardingInfo: []
    }
    var competentObj = {
        name: req.body.competentName,
        task: req.body.competentTask,
        gsm: req.body.competentGsm,
        email: req.body.competentEmail
    };
    custDefObj.competentInfo.push(competentObj);
    return custDefObj;
}
function firmCheckerAndPush(firmCode,tempCustDef,req, res){
     FirmModel.findOne({
                firmCode: firmCode
            }, function(error, firm) {
                if (error) {
                    res.send({
                        state: false,
                        response: error
                    });
                    return;
                }
                if (firm) {
                    cds.addNew(tempCustDef, function(state, response) {
                        if (!state) {
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
                }else{
                     res.send({
                            state: false,
                            response: "firma hatası"
                        });
                }
            });
}
module.exports = {
    addNew: function(req, res) {
        var tempCustDef;
        if (req.originalUrl == "/wscustomerdefinition/register") {
            tempCustDef = createCustomerRegister("add", req);
            firmCheckerAndPush(req.body.firmCode,tempCustDef,req, res);
        } else {
            tempCustDef = createCustomerDefinition("add", req);
            firmCheckerAndPush(req.session.user.firmCode,tempCustDef,req, res);
        }
    },
    update: function(req, res) {
         if (req.originalUrl == "/wscustomerdefinition/b2bupdate") {
            tempCustDef = updateB2bCustomer(req);
        } else {
            tempCustDef = createCustomerDefinition("update", req);
        }
        cds.update(tempCustDef, function(state, response) {
            if (!state) {
                res.send({
                    state: state,
                    response: response
                });
                return;
            }
            req.session.customer=tempCustDef;
            res.send({
                state: state,
                response: response
            });
        });
    },
    updateB2BInformation: function(req, res) {
        cds.updateB2BInformation(req.body, function(state, response) {
            if (!state) {
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
    remove: function(req, res) {
        cds.remove(req.body, function(state, response) {
            if (!state) {
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
    removeAll: function(req, res) {
        cds.removeAll(function(state, response) {
            if (!state) {
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
    listAll: function(req, res) {
        cds.listAll(req.session.user.firmCode, function(state, response) {
            if (!state) {
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
    getCount: function(req, res) {
        cds.getCount(req.session.user.firmCode, function(state, response) {
            if (!state) {
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
    getCustomerDefinition: function(req, res) {
        cds.getCustomerDefinition(req.body._id,
        function(state, response) {
            if (!state) {
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
    searchCustomerDefinition: function(req, res) {
        var criteria = req.body.search;
        if(req.session.accountType=="customer"){
            criteria.firmCode = req.session.customer.firmCode;
        }else{
            criteria.firmCode = req.session.user.firmCode;
        }
        cds.search(criteria, function(state, response) {
            if (!state) {
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
    }
}