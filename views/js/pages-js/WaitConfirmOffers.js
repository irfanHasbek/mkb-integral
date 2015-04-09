function otherScripts() {
    $('#slctOfferCase').change(function() {
        if ($(this).val() == 'kaybedilmis') {
            $('#divKaybeden').slideDown(800);
        } else {
            $('#divKaybeden').slideUp(800);
        }
    });
}

function clickHandlers() {
    $('#tableOpenOffers').on('click', '.edit', function() {
        var offerId = $(this).closest('tr').attr('id');
        if (offerId) {
            var win = window.open('/teklif_olusturma?id=' + offerId, '_blank');
            win.focus();
        }
    });

    $('#tableOpenOffers').on('click', '.save', function() {
        var offerId = $(this).closest('tr').attr('id');
        var offerStatus = $('#slctOrderStatus' + offerId).val();
        if (offerId) {
            wsPost('/wsoffer/updatestatus', {
                _id: offerId,
                offerStatus: offerStatus
            }, function(error, response) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(response);
            });
        }
    });
    
     $('#tableOpenOffers').on('click', '.sendMail', function() {
        var offerId = $(this).closest('tr').attr('id');
        $('#sendMailModal').modal("show");
    });
    
    

    $('#tableOpenOffers').on('click', '.confirmOffer', function() {
        var offerId = $(this).closest('tr').attr('id');
        alertify.confirm('Teklifi onayliyor musunuz?',
        function(){
            if (offerId) {
            wsPost('/wsoffer/updateoffercaseforconfirm', {offerId : offerId, status : 'acik_teklifler'}, function(error, response){
                if(error || !response.state){
                    alertify.error('Hata olustu.');
                    return;
                }
                alertify.success('Teklif onaylandi.');
            });
        }
        },function(){
            alertify.error('Teklif onaylanmadi.');
        });
    });
    
    $('#btnMailModalSubmit').on('click', function(){
        $.blockUI({ css: { backgroundColor: '#2c94c0', color: '#fff'}, message: '<h1>Mail Gönderiliyor...</h1>' }); 
    }); 
    
    $('.search').on('click', function() {
        listOfferStatus();
    });
}

function formHandlers() {
    $('#formSendMailModal').ajaxForm(function(data){
        if(!data.state){
            $.unblockUI();
            alertify.error('Mail gonderimi sirasinda hata olustu.');
        }
        $.unblockUI();
        alertify.success('Mail basariyla gonderildi.');
    });
}

function searchAndFillTable() {
    var offerTopic = $('#inpOfferTopic').val();
    var customerName = $('#inpCustomerName').val();
    var offerDate = $('#inpOfferDate').val();

    var searchCriteria = {
        "offerTopic": regexMultiKriterOlustur(offerTopic),
        "customerInfo.customerName": regexMultiKriterOlustur(customerName),
        "offerDate": regexMultiKriterOlustur(offerDate),
        "status.offerCase": "onay_bekleyen_teklifler"
    };
    searchCriteria['firmCode'] = '';
    wsPost('/wsoffer/search', {
        search: searchCriteria
    }, function(error, data) {
        if (error) {
            console.error(error);
            return;
        }
        fillTable(data.response);
    });
}

function fillTable(response, respOfferStatus) {
    $('#tableOpenOffers').empty();
    for (var i = 0; i < response.length; i++) {
        var tr = $('<tr id="' + response[i]._id + '"></tr>');
        var tdCount = $('<td class="text-center">' + (i + 1) + '.</td>');
        var tdOfferTopic = $('<td>' + response[i].offerTopic + '</td>');
        var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
        var tdOfferStatus = $('<td></td>');
        var select = $('<select id="slctOrderStatus' + response[i]._id + '" class="form-control"></select>');
        for (var j = 0; j < respOfferStatus.length; j++) {
            if (response[i].offerStatus == respOfferStatus[j].offerStatus) {
                var op = $('<option id="' + respOfferStatus[j]._id + '" value="' + respOfferStatus[j].offerStatus + '"selected>' + respOfferStatus[j].offerStatus + '</option>');
            } else {
                var op = $('<option id="' + respOfferStatus[j]._id + '" value="' + respOfferStatus[j].offerStatus + '">' + respOfferStatus[j].offerStatus + '</option>');
            }
            select.append(op);
        }
        tdOfferStatus.append(select);
        var tdOfferDate = $('<td>' + response[i].offerDate + '</td>');
        var tdPerson = $('<td>' + response[i].personPrepareOfferInfo.personName + '</td>');
        var tdButtons = $('<td id="' + response[i]._id + '">&nbsp&nbsp<a class="btn btn-info btn-flat edit btn-sm"><i class="fa fa-search"></i></a>&nbsp<a href="" class="btn btn-warning  btn-flat btn-sm confirm"><i class="fa fa-check"></i></a>&nbsp<a class="btn btn-success btn-flat btn-sm save"><i class="fa fa-save"></i></a>&nbsp<a class="btn btn-primary btn-flat btn-sm sendMail"><i class="fa fa-mail-reply"></i></a></td>');

        tr.append(tdCount);
        tr.append(tdOfferTopic);
        tr.append(tdCustName);
        tr.append(tdOfferStatus);
        tr.append(tdOfferDate);
        tr.append(tdPerson);
        tr.append(tdButtons);
        $('#tableOpenOffers').append(tr);
    }
}

function listOfferStatus(response) {
    wsGet("/wsofferstatus/listall", function(error, respOfferStatus) {
        if (error) {
            console.error(error);
            return;
        }
        var offerTopic = $('#inpOfferTopic').val();
        var customerName = $('#inpCustomerName').val();
        var offerDate = $('#inpOfferDate').val();

        var searchCriteria = {
            "offerTopic": regexMultiKriterOlustur(offerTopic),
            "customerInfo.customerName": regexMultiKriterOlustur(customerName),
            "offerDate": regexMultiKriterOlustur(offerDate),
            "status.offerCase": "onay_bekleyen_teklifler"
        };
        searchCriteria['firmCode'] = '';
        wsPost('/wsoffer/search', {
            search: searchCriteria
        }, function(error, data) {
            if (error) {
                console.error(error);
                return;
            }
            fillTable(data.response, respOfferStatus.data);
        });
    });
}