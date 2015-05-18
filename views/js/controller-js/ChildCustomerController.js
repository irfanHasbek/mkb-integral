var ChildCustomerService = require("../service-js/ChildCustomerService");
var ccs = new ChildCustomerService();
module.exports = {
    addNew: function(req, res) {
        ccs.addNew(req.body, function(state, response) {
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
    update: function(req, res) {
        ccs.update(req.body, function(state, response) {
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
        ccs.remove(req.body, function(state, response) {
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
        ccs.removeAll(function(state, response) {
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
        ccs.listAll(req.body.ekleyenFirma, function(state, response) {
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
    getChildCustomer: function(req, res) {
        ccs.getCustomerDefinition(req.body._id,
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
    }
}