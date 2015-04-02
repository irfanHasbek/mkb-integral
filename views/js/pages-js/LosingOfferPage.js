function clickHandlers(){
    removeFromTable("tblLosingOffer","/wsoffer/remove",function(id){});
    $('.search').on('click', function(){
        searchAndFillTable();
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
        offerTopic : regexMultiKriterOlustur(offerTopic),
        customerInfo:{customerName : regexMultiKriterOlustur(customerName)},
        offerDate:offerDate,
        status:{offerCase:"kaybedilmis"}
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
    $('.tblLosingOffer tbody').empty();
    for(var i = 0; i < response.length; i++){
        var tr = $('<tr id="'+response[i]._id+'"></tr>');
        var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
        var tdOfferTopic = $('<td>' + response[i].offerTopic + '</td>');
        var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
        var tdOfferDate = $('<td>' + response[i].offerDate + '</td>');
        var tdPerson = $('<td>' + response[i].personPrepareOfferInfo.personName + '</td>');
        var tdButtons = $('<td><button class="btn btn-danger btn-sm btn-flat sil"><i class="fa fa-trash-o"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdOfferTopic);tr.append(tdCustName);tr.append(tdOfferDate);tr.append(tdPerson);tr.append(tdButtons);
        $('.tblLosingOffer tbody').append(tr);
    }
}