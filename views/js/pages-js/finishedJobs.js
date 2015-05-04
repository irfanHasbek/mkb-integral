function clickHandlers(){
    $('.search').on('click', function(){
        searchAndFillTable();
    });
}

function formHandlers(){
    
}

function otherScripts(){
}
function searchAndFillTable(){
    var custName = $('#inpCustomerName').val();
    var deliveryDate = $('#inpDeliveryDate').val();
    var startJobDate = $('#inpStartJobDate').val();
    
   var searchCriteria = {
        "customerInfo.customerName" : regexMultiKriterOlustur(custName),
        "dates.deliveryDate" : regexMultiKriterOlustur(deliveryDate),
        "dates.startJobDate" : regexMultiKriterOlustur(startJobDate),
        "status.job":"tamamlanmis"
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
    $('.tblFinishedJobs tbody').empty();
    for(var i = 0; i < response.length; i++){
       for(var j = 0; j < response[i].basket.length; j++){
            var tr = $('<tr id="'+response[i]._id+'"></tr>');
            var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
            var tdJobOrderNo = $('<td class="text-center">' + (i+1) +'</td>');
            var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
            var tdPrductName = $('<td>' + response[i].basket[j].productName + '</td>');
            var tdSize="";
               if(response[i].basket[j].productSizeType=="Dikdörtgen"){
                 tdSize = $('<td>' + response[i].basket[j].productSizeWidthOrDiameter +" x " +response[i].basket[j].productSizeLength + " x " +response[i].basket[j].productSizeHeight + '</td>');
           }else{
                 tdSize = $('<td>' + response[i].basket[j].productSizeWidthOrDiameter +" x " + response[i].basket[j].productSizeLength+'</td>');
           }
           var tdMontageType = $('<td>' + response[i].basket[j].montageType + '</td>');
           var tdCoverType = $('<td>' + response[i].basket[j].coverType + '</td>');
           var tdSetMechanism = $('<td>' + response[i].basket[j].setMechanism + '</td>');
           var tdAccessory = $('<td>' + response[i].basket[j].accessory + '</td>');
           var tdBodyType = $('<td>' + response[i].basket[j].bodyType + '</td>');
           var tdAmount = $('<td>'+response[i].basket[j].amount+'</td>');
           var tdDeliveryDate = $('<td style="width:100px"><input type="date" class="" value='+response[i].dates.deliveryDate+'></td>');
           var tdNote=$("<td>"+response[i].basket[j].note+"</td>");
           var tdStartJobDate = $('<td style="width:100px"><input type="date" class="" value='+response[i].dates.startJobDate+'></td>');
           var tdButtons = $('<td id="'+response[i]._id+'"><button class="btn btn-success btn-sm btn flat baslat" data-toggle="tooltip" data-placement="top" title="Başlat"><i class="fa fa-play"></i></button><button class="btn btn-info btn-sm btn flat kaydet" data-toggle="tooltip" data-placement="top" title="Kaydet"><i class="fa fa-save"></i></button><a href="/is_emri_yazdir?id=' + response[i]._id + '&code=' + response[i].firmCode + '" target="_blank" class="btn btn-warning btn-sm btn flat" data-toggle="tooltip" data-placement="top" title="Yazdır"><i class="fa fa-print"></i></a></td>');
        tr.append(tdCount);tr.append(tdJobOrderNo);tr.append(tdCustName);tr.append(tdPrductName);tr.append(tdSize);tr.append(tdMontageType);tr.append(tdCoverType);tr.append(tdSetMechanism);tr.append(tdAccessory);tr.append(tdBodyType);tr.append(tdAmount);tr.append(tdDeliveryDate);tr.append(tdNote);tr.append(tdStartJobDate);tr.append(tdButtons)
        $('.tblFinishedJobs tbody').append(tr);
    }
}
}
function removeOffer(){}