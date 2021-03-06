function clickHandlers(){
    
    removeFromTable("tblCustDef","/wscustomerdefinition/remove",function(id){});
    
    $('.tblCustDef').on('click', '.edit', function(){
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        var win = window.open('/musteri_tanimi?id='+id, '_blank');
        win.focus();
    });
    $('.search').on('click', function(){
        searchAndFillTable();
    });
    
    $('.preview').on('click', function(){
        var id = $(this).closest('tr').attr('id');
        wsPost('/wscustomerdefinition/getcustomerdefinition', {_id : id}, function(error, data){
            if(error || data.state == false){
                alertify.error("Hata olustu : " + data.response);
                return;
            }
            var customer = data.response;
            $('#spnFirma').html(customer.customerTitle);
            $('#spnMusteriAdi').html(customer.customerName);
            $('#spnMusteriGrup').html(customer.customerGroup);
            $('#spnMusteriTemsilcisi').html(customer.customerAgent);
            $('#spnIletisimAdres').html(customer.contactInfo.address);
            $('#spnSehir').html(customer.contactInfo.city);
            $('#spnIlce').html(customer.contactInfo.state);
            $('#spnTel').html(customer.contactInfo.businessPhone);
            $('#spnFax').html(customer.contactInfo.fax);
            $('#spnWeb').html(customer.contactInfo.webAddress);
            if(customer.competentInfo.length > 0){
                $('#spnYetkiliAdi').html(customer.competentInfo[0].name);
                $('#spnYetkiliGsm').html(customer.competentInfo[0].gsm);
            }
            if(customer.forwardingInfo.length > 0){
                $('#spnSevkiyatAdresi').html(customer.forwardingInfo[0].label);
            }
        });
        $('#previewModal').modal('show');   
    });
}

function formHandlers(){
    
}

function otherScripts(){
    $("#slctCustGroup").on("change",function(){
        searchAndFillTable();
    
    });
     $("#slctCustAgent").on("change",function(){
        searchAndFillTable();
    
    });
}
function searchAndFillTable(){
    var custGroup = $('#slctCustGroup').val();
    var custAgent = $('#slctCustAgent').val();
    var custTitle = $('#inpCustomerTitle').val();
    var custName = $('#inpCustomerName').val();
    
    var searchCriteria = {
        customerTitle : regexMultiKriterOlustur(custTitle),
        customerName : regexMultiKriterOlustur(custName)
    };
    searchCriteria['firmCode'] = '';
    if(custGroup != 'Müşteri Grubu Seçiniz'){
        searchCriteria['customerGroup'] = custGroup;   
    }
    
    if(custAgent != 'Müşteri Temsilcisi Seçiniz'){
        searchCriteria['customerAgent'] = custAgent;    
    }
    console.log(searchCriteria);
    wsPost('/wscustomerdefinition/search', {search : searchCriteria}, function(error, data){
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
    $('.tblCustDef tbody').empty();
    for(var i = 0; i < response.length; i++){
        var tr = $('<tr id="'+response[i]._id+'"></tr>');
        var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
        var tdCustGroup = $('<td>' + response[i].customerGroup + '</td>');
        var tdCustTitle = $('<td>' + response[i].customerTitle + '</td>');
        var tdCustAgent = $('<td>' + response[i].customerAgent + '</td>');
        var tdCustName = $('<td>' + response[i].customerName + '</td>');
        var tdUserName = $('<td>' + response[i].userName + '</td>');
        if(response[i].webAccess==true){
            var tdCustWebAccess = $('<td class="text-center"><i class="fa fa-check" style="color:green;"></td>');
        }else{
             var tdCustWebAccess = $('<td class="text-center"><i class="fa fa-times" style="color:red;"></td>');
        }
        if(response[i].webOrder==true){
            var tdCustWebOrder = $('<td class="text-center"><i class="fa fa-check" style="color:green;"></td>');
        }else{
             var tdCustWebOrder = $('<td class="text-center"><i class="fa fa-times" style="color:red;"></td>');
        }
        var tdButtons = $('<td><button class="btn btn-info btn-sm btn-flat edit"><i class="fa fa-pencil"></i></button>' + '<span> </span>' +
         '<button class="btn btn-info btn-sm preview"><i class="fa fa-search-plus"></i></button>&nbsp' + '<button class="btn btn-danger btn-sm btn-flat sil"><i class="fa fa-trash-o"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdCustGroup);tr.append(tdCustTitle);tr.append(tdCustAgent);tr.append(tdCustName);tr.append(tdUserName);tr.append(tdCustWebAccess);tr.append(tdCustWebOrder);tr.append(tdButtons);
        $('.tblCustDef tbody').append(tr);
    }
}
