function clickHandlers(){
    $('#tableProducts').on('click', '.remove', function(){
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        if(id != "" && id != undefined){
            wsPost('/wsproduct/remove',{ _id : id }, function(error, response){
                if(error){
                    console.log('silinemedi');
                    return;
                }
                //console.log(response);
                tr.remove();
            });   
        }
    });
    
    $('#tableProducts').on('click', '.edit', function(){
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        var win = window.open('/urun_tanimlari?id='+id, '_blank');
        win.focus();
    });
    
    $('.search').on('click', function(){
        searchAndFillTable();
    });
    
    var $lightbox = $('#lightbox');

    $('[data-target="#lightbox"]').on('click', function(event) {
        //console.log('click');
        var $img = $(this).find('img'), 
            src = $img.attr('src'),
            alt = $img.attr('alt'),
            css = {
                'maxWidth': $(window).width() - 100,
                'maxHeight': $(window).height() - 100
            };
        
        $lightbox.find('.close').addClass('hidden');
        $lightbox.find('img').attr('src', src);
        $lightbox.find('img').attr('alt', alt);
        $lightbox.find('img').css(css);
    });

    $lightbox.on('shown.bs.modal', function (e) {
        var $img = $lightbox.find('img');

        $lightbox.find('.modal-dialog').css({'width': $img.width()});
        $lightbox.find('.close').removeClass('hidden');
    });
}

function formHandlers(){
    
}

function otherScripts(){    
    $('#slgroup').change(function(){
        searchAndFillTable();
    });
}

function searchAndFillTable(){
    var group = $('#slgroup').val();
    var productName = $('#inpProductName').val();
    var productCode = $('#inpProductCode').val();
    
    var searchCriteria = {};
    searchCriteria['firmCode'] = '';
    searchCriteria['name'] = regexMultiKriterOlustur(productName);
    searchCriteria['code'] = regexMultiKriterOlustur(productCode);
    
    if(group != 'Ürün Grubu Seçiniz'){
        searchCriteria['group'] = group;   
    }
    
    wsPost('/wsproduct/search', {search : searchCriteria}, function(error, data){
        if(error){
            console.error(error);
            return;
        }
        //console.log('data : ' + JSON.stringify(data));
        fillTable(data.response);
    });
}

function fillTable(response){
    var table = $('#tableProducts').empty();
    for(var i = 0; i < response.length; i++){
        var tr = $('<tr id="'+response[i]._id+'"></tr>');
        var tdCount = $('<td class="text-center">' + (i+1) +'</td>');
        var tdCode = $('<td>' + response[i].code + '</td>');
        var tdGroup = $('<td>' + response[i].group + '</td>');
        var tdName = $('<td>' + response[i].name + '</td>');
        
        var tdPicture = $('<td class="text-center"><a href="#" data-toggle="modal" data-target="#lightbox"><img src="'+response[i].pictureUrl+'"  class="img-responsive img-center" style="width:auto; height:30px;"></a></td>');
        
        var tdButtons = $('<td><button class="btn btn-info btn-sm btn-flat edit"><i class="fa fa-pencil"></i></button>' + '<span> </span>' +
        '<button class="btn btn-danger btn-sm btn-flat remove"><i class="fa fa-trash-o"></i></button></td>');
        
        tr.append(tdCount);tr.append(tdCode);tr.append(tdGroup);tr.append(tdName);tr.append(tdPicture);tr.append(tdButtons);
        table.append(tr);
    }
}