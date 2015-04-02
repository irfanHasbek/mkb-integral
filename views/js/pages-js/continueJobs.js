function clickHandlers(){
    $('.search').on('click', function(){
        searchAndFillTable();
    });
    finishJob();
    saveChangesOnContinueJobs();
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
        "status.job":"devam_eden"
    };
    searchCriteria['firmCode'] = '';
    console.log(searchCriteria);
    wsPost('/wsoffer/search', {search : searchCriteria}, function(error, data){
        if(error){
            console.error(JSON.stringify(error));
            return;
        }
        //console.log('data : ' + JSON.stringify(data));
         fillTable(data.response);
    });
}

function fillTable(response){
    console.log(response);
    $('.tblContinueJob tbody').empty();
    for(var i = 0; i < response.length; i++){
       for(var j = 0; j < response[i].basket.length; j++){
            var tr = $('<tr id="'+response[i].basket[j]._id+'"></tr>');
            var tdCount = $('<td class="text-center">' + (j+1) +'</td>');
            var tdJobOrderNo = $('<td class="text-center">' + response[i].offerNo+'</td>');
            var tdCustName = $('<td>' + response[i].customerInfo.customerName + '</td>');
            var tdPrductName = $('<td>' + response[i].basket[j].productName + '</td>');
            var tdSize="";
               if(response[i].basket[j].productSizeType=="dikdörtgen"){
                 tdSize = $('<td>' + response[i].basket[j].productSizeWidthOrDiameter +" x " +response[i].basket[j].productSizeLength + " x " +response[i].basket[j].productSizeHeight + '</td>');
           }else{
                 tdSize = $('<td>' + response[i].basket[j].productSizeWidthOrDiameter +" x " + response[i].basket[j].productSizeLength+'</td>');
           }
           var tdMontageType = $('<td>' + response[i].basket[j].montageType + '</td>');
           var tdCoverType = $('<td>' + response[i].basket[j].coverType + '</td>');
           var tdSetMechanism = $('<td>' + response[i].basket[j].setMechanism + '</td>');
           var tdAccessory = $('<td>' + response[i].basket[j].accessory + '</td>');
           var tdBodyType = $('<td>...</td>');
           var tdAmount = $('<td>'+response[i].basket[j].amount+'</td>');
           var tdDeliveryDate = $('<td style="width:100px"><input type="date" class="delDate'+response[i]._id+'" value='+response[i].dates.deliveryDate+'></td>');
           var tdNote=$('<td><input id="" type="text" class="note'+response[i].basket[j]._id+'" value="'+response[i].basket[j].note+'"></td>');
           var tdStartJobDate = $('<td>'+response[i].dates.startJobDate+'</td>');
           var tdButtons = $('<td id='+response[i]._id+'><button class="btn btn-success btn-sm btn flat tamamla" data-toggle="tooltip" data-placement="top" title="Bitir"><i class="fa fa-check"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdJobOrderNo);tr.append(tdCustName);tr.append(tdPrductName);tr.append(tdSize);tr.append(tdMontageType);tr.append(tdCoverType);tr.append(tdSetMechanism);tr.append(tdAccessory);tr.append(tdBodyType);tr.append(tdAmount);tr.append(tdDeliveryDate);tr.append(tdNote);tr.append(tdStartJobDate);tr.append(tdButtons);
        $('.tblContinueJob tbody').append(tr);
    }
}
}
function finishJob(){
  $(".tamamla").click(function(){
        var tr=$(this).closest("tr");
       var offerId=$(this).closest("td").attr("id");
        var obj={
            _id : offerId,
           status:{
                job :"tamamlanmis"
            }
        };        
        wsPost("/wsoffer/updatejobstatus",obj,function(err,resp){
            if(err){
                console.log(err);
                return;
            }
            console.log(resp);
            tr.remove();
        });
    });
}
function saveChangesOnContinueJobs(){
    $(".kaydet").click(function(){
        var offerId=$(this).closest("td").attr("id");
        var productId=$(this).closest("tr").attr("id");
        console.log($(".note"+productId).val());
        var obj={
            _id : offerId,
            dates:{
                deliveryDate:$(".delDate"+offerId).val()
            },
            basket:{
                _id:productId,
                note:$(".note"+productId).val()
            }
        };    
        console.log(obj);
        wsPost("/wsoffer/updatenote",obj,function(err,resp){
            if(err){
                console.log(err);
                return;
            }
            console.log(resp);
        });
    });
}