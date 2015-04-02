function clickHandlers(){
    removeFromTable("tblWinningOffer","/wsoffer/remove",function(id){});
    $('.search').on('click', function(){
        searchAndFillTable();
    });
}

function formHandlers(){
    
}

function otherScripts(){
}
function searchAndFillTable(){
    var offerTopic = $('#inpOfferTopic').val();
    var customerName = $('#inpCustomerName').val();
    var offerDate = $('#inpOfferDate').val();
    
    var searchCriteria = {
        offerTopic : regexMultiKriterOlustur(offerTopic),
        customerInfo:{customerName : regexMultiKriterOlustur(customerName)},
        offerDate:offerDate,
        status:{offerCase:"kazanilmis"}
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
    $('.tblWinningOffer tbody').empty();
    for(var i = 0; i < response.length; i++){
        var tr = $('<tr id="'+response[i]._id+'"></tr>');
        var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
        var tdOfferTopic = $('<td>' + response[i].offerTopic + '</td>');
        var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
        var tdOfferDate = $('<td>' + response[i].offerDate + '</td>');
        var tdPerson = $('<td>' + response[i].personPrepareOfferInfo.personName + '</td>');
        var tdButtons = $('<td><button class="btn btn-danger btn-sm btn-flat sil"><i class="fa fa-trash-o"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdOfferTopic);tr.append(tdCustName);tr.append(tdOfferDate);tr.append(tdPerson);tr.append(tdButtons);
        $('.tblWinningOffer tbody').append(tr);
    }
}