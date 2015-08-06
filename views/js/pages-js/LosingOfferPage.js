function clickHandlers(){
    updateFromTable("tblLosingOffer","/wsoffer/updateoffercaseforcancel", 'onay_bekleyen_teklifler', function(id){});
    $('.search').on('click', function(){
        searchAndFillTable();
    });
    
    $('.tblLosingOffer').on('click', '.edit', function() {
        var offerId = $(this).closest('tr').attr('id');
        if (offerId) {
            var win = window.open('/teklif_olusturma?id=' + offerId, '_blank');
            win.focus();
        }
    });
}

function formHandlers(){
    
}

function otherScripts(){
}
function searchAndFillTable(){
    var offerTopic = $('#inpLOfferTopic').val();
    var customerName = $('#inpLCustomerName').val();
    var offerDate = $('#inpLOfferDate').val();
    
    var searchCriteria = {
        "offerTopic": regexMultiKriterOlustur(offerTopic),
        "customerInfo.customerName" : regexMultiKriterOlustur(customerName),
        "offerDate":regexMultiKriterOlustur(offerDate),
        "status.offerCase":"kaybedilmis"
    };
    searchCriteria['firmCode'] = '';
    
    wsPost('/wsoffer/search', {search : searchCriteria}, function(error, data){
        if(error){
            console.error(error);
            return;
        }
        //console.log('data : ' + JSON.stringify(data));
         fillTable(data.response);
    });
}

function fillTable(response){
    console.log(response);
    $('#tblLosingOffer').empty();
    for(var i = 0; i < response.length; i++){
        var tr = $('<tr id="'+response[i]._id+'"></tr>');
        var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
        var tdOfferTopic = $('<td>' + response[i].offerTopic + '</td>');
        var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
        var tdOfferDate = $('<td>' + response[i].offerDate + '</td>');
        var tdPerson = $('<td>' + response[i].personPrepareOfferInfo.personName + '</td>');
        var tdWinFirm = $('<td>' + response[i].status.winFirm + '</td>');
        var tdLosingReason = $('<td>' + response[i].status.losingReason + '</td>');
        var tdButtons = $('<td id="' + response[i]._id + '"><button class="btn btn-primary btn-sm edit"><i class="fa fa-search"></i></button>&nbsp<button class="btn btn-danger btn-sm cancel"><i class="fa fa-trash-o"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdOfferTopic);tr.append(tdCustName);tr.append(tdOfferDate);tr.append(tdLosingReason);tr.append(tdWinFirm);tr.append(tdPerson);tr.append(tdButtons);
        $('#tblLosingOffer').append(tr);
    }
}