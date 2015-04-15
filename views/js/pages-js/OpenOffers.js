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
    
    $('#tableOpenOffers').on('click', '.createPdf', function() {
        var offerId = $(this).closest('tr').attr('id');
        if(offerId){
            $.blockUI({ css: { backgroundColor: '#2c94c0', color: '#fff'}, message: '<h1>PDF Olusturuluyor...</h1>' }); 
            wsPost("/wscreatepdf",{pageUrl : "/teklif_yazdir?id=" + offerId + '&code=' + $('#inpFirmCode').val(), pageName : offerId + '_YOB.pdf'},function(err, data){
                if(err || !data.state){
                    alertify.error("Pdf olusturulamadi.");
                    $.unblockUI();
                    return;
                }
                wsPost("/wsoffer/updatepdfinfo",{_id : offerId ,info : { pdfStatus : 'true' , pdfUrl : data.url}},function(errUpdatePdf, dataUpdatePdf){
                    if(errUpdatePdf || !dataUpdatePdf.state){
                        alertify.error("Pdf bilgisi guncellenemedi.");
                        return;
                    }
                    $.unblockUI();
                    $('tr[id=' + offerId + ']').find('.sendMail').removeAttr('disabled');
                    $('tr[id=' + offerId + ']').find('.sendMail').attr('data', data.url);
                    window.open(data.url, '_blank');
                });
            });
        }
    });
    
     $('#tableOpenOffers').on('click', '.sendMail', function() {
        var offerId = $(this).closest('tr').attr('id');
        var attachment = $(this).attr('data');
        $('#mailModalAttachs').val(attachment);
        $('#sendMailModal').modal("show");
    });

    $('#tableOpenOffers').on('click', '.accept', function() {
        var offerId = $(this).closest('tr').attr('id');
        var custId = $(this).closest('tr').attr('custId');
        if (offerId) {
            $('#inpOfferIdModal').val(offerId);
            wsPost('/wscustomerdefinition/search', {
                search: {
                    _id: custId
                }
            }, function(state, response) {
                if (state) {
                    console.error(response);
                    return;
                }
                var forward = response.response[0].forwardingInfo;
                var mailAddress = response.response[0].userName;
                console.log(response.response[0]);
                var slct = $('#slctForwardingAddress');
                var optionDefault = $('<option value="">Seciniz</option>');
                slct.append(optionDefault);
                for (var i = 0; i < forward.length; i++) {
                    var option = $('<option value="' + forward[i]._id + '">' + forward[i].label + '</option>');
                    slct.append(option);
                }
                $('#modalAcceptOffer').modal('show');
            });
        }
    });

    $('#tableOpenOffers').on('click', '.note', function() {
        var offerId = $(this).closest('tr').attr('id');
        if (offerId) {
            $('#inpOfferIdNoteModal').val(offerId);
            $('#inpNoteDate').val(getTodayDate());
        }
    });

    $('#tableOpenOffers').on('click', '.remember', function() {
        var offerId = $(this).closest('tr').attr('id');
        if (offerId) {
            $('#inpOfferIdRememberModal').val(offerId);
            $('#inpRecallDate').val(getTodayDate());
        }
    });
    
    $('#btnMailModalSubmit').on('click', function(){
        $('#sendMailModal').modal("hide");
        $.blockUI({ css: { backgroundColor: '#2c94c0', color: '#fff'}, message: '<h1>Mail Gönderiliyor...</h1>' }); 
    }); 

    $('#btnUpdateOfferCase').on('click', function() {
        var offerId = $('#inpOfferIdModal').val();
        var job = 'onay_bekleyen';
        var offerCase = $('#slctOfferCase').val();
        var losingReason = '';
        var winFirm = '';
        var acceptOfferDate = getTodayDate();

        var forwardingInfo = {
            forwardId: $('#slctForwardingAddress option:selected').val(),
            forwardLabel: $('#slctForwardingAddress option:selected').text()
        }

        if ($('#divKaybeden').css('display') != 'none') {
            losingReason = $('#slctLosingReason').val();
            winFirm = $('#inpWinFirm').val();
            job = '';
            acceptOfferDate = '';
            forwardingInfo.forwardId = '';
            forwardingInfo.forwardLabel = '';
        }

        var status = {
            offerCase: offerCase,
            losingReason: losingReason,
            winFirm: winFirm,
            job: job
        };
        var acceptPerson = {
            personId: $('#slctAcceptPerson').attr('data'),
            personName: $('#slctAcceptPerson').val()
        }
        var forwardingInfo = {
            forwardId: $('#slctForwardingAddress option:selected').val(),
            forwardLabel: $('#slctForwardingAddress option:selected').text()
        }
        console.log(JSON.stringify(status));
        if (offerId) {
            alertify.confirm("Bu işlem sonucunda teklif onaylanacaktir.Devam etmek istiyor musunuz?",function(){
            wsPost('/wsoffer/updateoffercase', {
                _id: offerId,
                status: status,
                acceptPerson: acceptPerson,
                forwardingInfo: forwardingInfo,
                acceptOfferDate: acceptOfferDate
            }, function(error, response) {
                if (error) {
                    console.log(error);
                    return;
                }
                $('#modalAcceptOffer').modal('hide');
                $('tr[id='+ offerId +']').remove();
                orderTable('.tblOpenOffer');
              });
            },function(){
                alertify.error('Teklif onayı iptal edildi.');
            });
            
        }
    });

    $('#btnAddNote').on('click', function() {
        var offerId = $('#inpOfferIdNoteModal').val();
        var activity = {
            activityType: 'not',
            content: $('#txtOfferNote').val(),
            activityDate: $('#inpNoteDate').val(),
            owner: {
                ownerId: $('#slctActivityOwnerNote option:selected').val(),
                ownerName: $('#slctActivityOwnerNote option:selected').text()
            },
            activityStatus: 'undone',
            note : ''
        }
        if (offerId) {
            wsPost('/wsoffer/addactivity', {
                offerId: offerId,
                activity: activity
            }, function(state, response) {
                if (state) {
                    console.error(state);
                    return;
                }
                console.log(response);
            });
        }
    });

    $('#btnHatirlatma').on('click', function() {
        var offerId = $('#inpOfferIdRememberModal').val();
        var activity = {
            activityType: 'Hatırlatma',
            content: $('#inpRecallReason').val(),
            activityDate: $('#inpRecallDate').val(),
            owner: {
                ownerId: $('#slctActivityOwnerRemember option:selected').val(),
                ownerName: $('#slctActivityOwnerRemember option:selected').text()
            },
            activityStatus: 'undone',
            note : ''
        }
        if (offerId) {
            wsPost('/wsoffer/addactivity', {
                offerId: offerId,
                activity: activity
            }, function(state, response) {
                if (state) {
                    console.error(state);
                    return;
                }
                console.log(response);
            });
        }
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
        "status.offerCase": "acik_teklifler"
    };
    searchCriteria['firmCode'] = '';
    console.log(searchCriteria);
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
    //console.log(response)
    for (var i = 0; i < response.length; i++) {
        var tr = $('<tr id="' + response[i]._id + '"></tr>');
        var tdCount = $('<td class="text-center">' + (i + 1) + '</td>');
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
        var tdButtons = '';
        
        if(response[i].pdfInfo.pdfStatus == "false"){
            tdButtons = $('<td id="' + response[i]._id + '"><div class="btn-group"><button type="button" class="btn btn-primary btn-flat">İşlem</button><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu " role="menu"><li><a class=" edit"> <i class="fa fa-search"></i> İncele</a></li><li><a href="" class="note"  data-toggle="modal" data-target="#modal_note"> <i class="fa fa-pencil"></i> Aktivite Ekle</a></li><li><a href="" class="remember" data-toggle="modal" data-target="#modal_remind"> <i class="fa fa-bell-o"></i> Hatırlatma Ekle</a></li><li><a href="" class="accept" data-toggle="modal" data-target="#modal_close"> <i class="fa fa-check"></i> Bitir</a></li><li><a class="save"> <i class="fa fa-save"></i> Kaydet</a></li><li><a class="createPdf">  <i class="fa fa-download"></i> PDF Olustur</a></li><li class="disabled"><a class="sendMail" disabled><i class="fa fa-envelope-o"></i> Mail Gönder </a></li></ul></div></td>');   
        }else{
            tdButtons = $('<td id="' + response[i]._id + '"><div class="btn-group"><button type="button" class="btn btn-primary btn-flat">İşlem</button><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu " role="menu"><li><a class=" edit"> <i class="fa fa-search"></i> İncele</a></li><li><a href="" class="note"  data-toggle="modal" data-target="#modal_note"> <i class="fa fa-pencil"></i> Aktivite Ekle</a></li><li><a href="" class="remember" data-toggle="modal" data-target="#modal_remind"> <i class="fa fa-bell-o"></i> Hatırlatma Ekle</a></li><li><a href="" class="accept" data-toggle="modal" data-target="#modal_close"> <i class="fa fa-check"></i> Bitir</a></li><li><a class="save"> <i class="fa fa-save"></i> Kaydet</a></li><li><a class="createPdf">  <i class="fa fa-download"></i> PDF Olustur</a></li><li><a data="' + response[i].pdfInfo.pdfUrl + '" class="sendMail"><i class="fa fa-envelope-o"></i> Mail Gönder </a></li></ul></div></td>');    
        }

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
            "status.offerCase": "acik_teklifler"
        };
        searchCriteria['firmCode'] = '';
        //console.log(searchCriteria);
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