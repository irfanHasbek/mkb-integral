function clickHandlers(){
    $('.search').on('click', function(){
        searchAndFillTable();
    });
    saveChangesOnPendingJobs();
    startJobs();
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
        "status.job":"onay_bekleyen"
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
    $('.tblPendingJobs tbody').empty();
    for(var i = 0; i < response.length; i++){
       for(var j = 0; j < response[i].basket.length; j++){
            var tr = $('<tr id="'+response[i].basket[j]._id+'"></tr>');
            var tdCount = $('<td class="text-center">' + (j+1) +'</td>');
            var tdJobOrderNo = $('<td class="text-center">' +response[i].offerNo+'</td>');
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
           var tdDeliveryDate = $('<td style="width:100px"><input id="" type="date" class="delDate'+response[i]._id+'" value="'+response[i].dates.deliveryDate+'"></td>');
           var tdNote=$('<td><input id="" type="text" class="note'+response[i].basket[j]._id+'" value="'+response[i].basket[j].note+'"></td>');
           var tdStartJobDate = $('<td style="width:100px"><input type="date" class="stJbDate'+response[i]._id+'" value='+response[i].dates.startJobDate+'></td>');
        var tdButtons = $('<td id="'+response[i]._id+'"><button class="btn btn-success btn-sm btn flat baslat" data-toggle="tooltip" data-placement="top" title="Başlat"><i class="fa fa-play"></i></button><button class="btn btn-info btn-sm btn flat kaydet" data-toggle="tooltip" data-placement="top" title="Kaydet"><i class="fa fa-save"></i></button><a href="/is_emri_yazdir?id=' + response[i]._id + '&code=' + response[i].firmCode + '" target="_blank" class="btn btn-warning btn-sm btn flat" data-toggle="tooltip" data-placement="top" title="Yazdır"><i class="fa fa-print"></i></a></td>');
        
        tr.append(tdCount);tr.append(tdJobOrderNo);tr.append(tdCustName);tr.append(tdPrductName);tr.append(tdSize);tr.append(tdMontageType);tr.append(tdCoverType);tr.append(tdSetMechanism);tr.append(tdAccessory);tr.append(tdBodyType);tr.append(tdAmount);tr.append(tdDeliveryDate);tr.append(tdNote);tr.append(tdStartJobDate);tr.append(tdButtons);
        $('.tblPendingJobs tbody').append(tr);
    }
  }
}

function saveChangesOnPendingJobs(){
    $(".tblPendingJobs").on("click",".kaydet",function(){
        var offerId=$(this).closest("td").attr("id");
        var productId=$(this).closest("tr").attr("id");
        var obj={
            _id : offerId,
            basket:{
                _id:productId,
                note:$(".note"+productId).val()
            },
            dates:{
                deliveryDate :$(".delDate"+offerId).val(),
                startJobDate :$(".stJbDate"+offerId).val()
            }
        };    
        console.log(obj);
        wsPost("/wsoffer/updatedates",obj,function(err,resp){
            if(err){
                alertify.error("Hata!! kaydetme başarısız");
                return;
            }
            alertify.success("İşleminiz başarı ile kaydedildi.");
        });
    });
}
function startJobs(){
    $(".tblPendingJobs").on("click",".baslat",function(){
        var tr=$(this).closest("tr");
        var productId=tr.attr("id");
        var offerId=$(this).closest("td").attr("id");
        var obj={
            _id : offerId,
           status:{
                job :"devam_eden"
            }
        };
        alertify.confirm("İşleminiz gerçekleşecektir.Emin misiniz?",
        function(){
            wsPost("/wsoffer/updatejobstatus",obj,function(err,resp){
            if(err){
                console.log(err);
                return;
            }
            alertify.success("İşleminiz başarı ile gerçekleşmiştir.");
            tr.remove();
        });
        },function(){
            alertify.error("İşlem iptal edildi.");
        });
    });
}
    