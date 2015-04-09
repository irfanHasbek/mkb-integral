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
                $('#inpCustomerMail').val(mailAddress);
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
            alertify.confirm("Bu işlem sonucunda teklif onaylanacak ve müşteriye onay bilgi maili gönderilecektir.Devam etmek istiyor musunuz?",function(){
            if($('#inpCustomerMail').val() != ''){
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
                    $.blockUI({ css: { backgroundColor: '#2c94c0', color: '#fff'}, message: '<h1>Onaylaniyor...</h1>' }); 
                    var optionPdf = {
                        pageUrl: 'http://localhost:3000/teklif_yazdir?id=' + offerId + '&code=' + $('#inpFirmCode').val(),
                        pageName: 'offer_' + offerId + '.pdf'
                    };
                    wsPost('wscreatepdf', optionPdf, function(errorPdf, responsePdf) {
                        if (errorPdf) {
                            alertify.error(errorPdf);
                            $.unblockUI();
                            return;
                        }
                        wsPost('wssendmail', {
                            attachs: responsePdf,
                            mailTo: $('#inpCustomerMail').val()
                        }, function(errorMail, responseMail) {
                            if (errorPdf) {
                                alertify.error(errorMail);
                                $.unblockUI();
                                return;
                            }
                            $.unblockUI();
                            alertify.success('Teklif başarı ile onaylandı ve müşteriye onay bilgi maili gönderildi.');
                        });
                    });
                  });
            }else{
                alertify.error('Lutfen gecerli bir mail adresi giriniz.');
            }
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
        var tdButtons = $('<td id="' + response[i]._id + '"><div class="btn-group"><button type="button" class="btn btn-primary btn-flat">Operasyon</button><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu color_a" role="menu"><li><a class="btn btn-info btn-flat edit">İncele <i class="fa fa-search"></i></a></li><li><a href="" class="btn btn-flat btn-success note"  data-toggle="modal" data-target="#modal_note">Not Ekle <i class="fa fa-pencil"></i></a></li><li><a href="" class="btn btn-primary btn-flat remember" data-toggle="modal" data-target="#modal_remind">Hatırlatma Ekle <i class="fa fa-bell-o"></i></a></li><li><a href="" class="btn btn-warning  btn-flat accept" data-toggle="modal" data-target="#modal_close">Bitir <i class="fa fa-check"></i></a></li><li><a class="btn btn-info btn-flat save">Kaydet <i class="fa fa-save"></i></a></li></ul></div></td>');

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
        console.log(searchCriteria);
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