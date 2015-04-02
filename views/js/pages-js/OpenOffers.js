function otherScripts(){
   $('#slctOfferCase').change(function(){
        if($(this).val() == 'kaybedilmis'){
             $('#divKaybeden').slideDown(800);  
        }
        else{
            $('#divKaybeden').slideUp(800);  
        }
   });
}
function clickHandlers(){
    $('#tableOpenOffers').on('click','.edit', function(){
       var offerId = $(this).closest('tr').attr('id');
        if(offerId){
            var win = window.open('/teklif_olusturma?id='+offerId, '_blank');
            win.focus();   
        }
    });
    
    $('#tableOpenOffers').on('click','.save', function(){
        var offerId = $(this).closest('tr').attr('id');
        var offerStatus = $('#slctOrderStatus').val();
        if(offerId){
            wsPost('/wsoffer/updatestatus',{_id : offerId, offerStatus : offerStatus}, function(error, response){
                if(error){
                    console.log(error);
                    return;
                }
                console.log(response);
            });
        }
    });
    
    $('#tableOpenOffers').on('click','.accept', function(){
        var offerId = $(this).closest('tr').attr('id');
        var custId = $(this).closest('tr').attr('custId');
        if(offerId){
            $('#inpOfferIdModal').val(offerId);
            wsPost('/wscustomerdefinition/search', { search : { _id : custId }}, function(state, response){
                if(state){
                    console.error(response);
                    return;
                }
                var forward = response.response[0].forwardingInfo;
                var mailAddress = response.response[0].userName;
                console.log(response.response[0]);
                $('#inpCustomerMail').val(mailAddress);
                var slct = $('#slctForwardingAddress');
                for(var i = 0; i < forward.length; i++){
                    var option = $('<option value="' + forward[i]._id + '">' + forward[i].label + '</option>');
                    slct.append(option);
                }
            });
        }
    });
    
    $('#tableOpenOffers').on('click','.note', function(){
        var offerId = $(this).closest('tr').attr('id');
        if(offerId){
            $('#inpOfferIdNoteModal').val(offerId);
            $('#inpNoteDate').val(getTodayDate());
        }
    });
    
    $('#tableOpenOffers').on('click','.remember', function(){
        var offerId = $(this).closest('tr').attr('id');
        if(offerId){
            $('#inpOfferIdRememberModal').val(offerId);
            $('#inpRecallDate').val(getTodayDate());
        }
    });
    
    $('#btnUpdateOfferCase').on('click', function(){
        var offerId = $('#inpOfferIdModal').val();
        var job = 'onay_bekleyen';
        var offerCase = $('#slctOfferCase').val();
        var losingReason = '';
        var winFirm = '';
        var acceptOfferDate = getTodayDate();
        
        var forwardingInfo = {
            forwardId : $('#slctForwardingAddress option:selected').val(),
            forwardLabel : $('#slctForwardingAddress option:selected').text()
        }
        
        if($('#divKaybeden').css('display')!='none'){
            losingReason = $('#slctLosingReason').val();
            winFirm = $('#inpWinFirm').val();
            job = '';
            acceptOfferDate = '';
            forwardingInfo.forwardId = '';
            forwardingInfo.forwardLabel = '';
        }
        
        var status = {
            offerCase : offerCase,
            losingReason : losingReason,
            winFirm : winFirm,
            job : job
        };
        var acceptPerson = {
            personId : $('#slctAcceptPerson').attr('data'),
            personName : $('#slctAcceptPerson').val() 
        }
        var forwardingInfo = {
            forwardId : $('#slctForwardingAddress option:selected').val(),
            forwardLabel : $('#slctForwardingAddress option:selected').text()
        }
        console.log(JSON.stringify(status));
        if(offerId){
            wsPost('/wsoffer/updateoffercase',{_id : offerId, status : status, acceptPerson : acceptPerson, forwardingInfo : forwardingInfo, acceptOfferDate : acceptOfferDate}, function(error, response){
                if(error){
                    console.log(error);
                    return;
                }
                var optionPdf = {
                    pageUrl : 'http://localhost:3000/teklif_yazdir?id=' + offerId + '&code=' + $('#inpFirmCode').val(), 
                    pageName : 'offer_' + offerId + '.pdf'
                };
                wsPost('wscreatepdf', optionPdf, function(errorPdf, responsePdf){
                    if(errorPdf){
                        console.log(errorPdf);
                        return;
                    }
                    wsPost('wssendmail', {attachs : responsePdf, mailTo : $('#inpCustomerMail').val()}, function(errorMail, responseMail){
                        if(errorPdf){
                            console.log(errorMail);
                            return;
                        }
                        console.log(responseMail);
                    });
                });
            });
        }
    });
    
    $('#btnAddNote').on('click', function(){
        var offerId = $('#inpOfferIdNoteModal').val();
        var activity = {
            activityType : 'note',
            content : $('#txtOfferNote').val(),
            activityDate : $('#inpNoteDate').val(),
            owner : {
                ownerId : $('#slctActivityOwnerNote option:selected').val(),
                ownerName : $('#slctActivityOwnerNote option:selected').text()
            },
            activityStatus : 'unread'
        }
        if(offerId){
            wsPost('/wsoffer/addactivity',{ offerId : offerId, activity : activity }, function(state, response){
                if(state){
                    console.error(state);
                    return;
                }
                console.log(response);
            });   
        }
    });
    
    $('#btnHatirlatma').on('click', function(){
        var offerId = $('#inpOfferIdRememberModal').val();
        var activity = {
            activityType : 'remember',
            content : $('#inpRecallReason').val(),
            activityDate : $('#inpRecallDate').val(),
            owner : {
                ownerId : $('#slctActivityOwnerRemember option:selected').val(),
                ownerName : $('#slctActivityOwnerRemember option:selected').text()
            },
            activityStatus : 'unread'
        }
        if(offerId){
            wsPost('/wsoffer/addactivity',{ offerId : offerId, activity : activity }, function(state, response){
                if(state){
                    console.error(state);
                    return;
                }
                console.log(response);
            });   
        }
    });
}
function formHandlers(){
    
}