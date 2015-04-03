function clickHandlers(){
    $('#btnChooseFile').on('click', function(e){
        if($('#inpCsvFile').val() == '' || $('#productIdForPrice').val() == '' || $('#inpSizeTypeForPrice').val() == ''){
            e.preventDefault();
            alert('urun veya urun tipi seciniz!');
        }
    });
    $('#btnRect').click(function(e){
       e.preventDefault();
       $('#divCir').slideUp('800');
       $('#divRec').slideToggle('800');
       $('#inpCap').attr('disabled','disabled');
       $('#inpDaireUzunluk').attr('disabled','disabled');
       $('#inpEn').removeAttr('disabled');
       $('#inpBoy').removeAttr('disabled');
       $('#inpUzunluk').removeAttr('disabled');
       $('#inpSizeType').val('dikdörtgen');
       $('#inpSizeTypeForPrice').val('dikdörtgen');
   });
    
   $('#btnCir').click(function(e){
        e.preventDefault();
        $('#divRec').slideUp('800');
        $('#divCir').slideToggle('800');
        $('#inpCap').removeAttr('disabled');
        $('#inpDaireUzunluk').removeAttr('disabled');
        $('#inpEn').attr('disabled','disabled');
        $('#inpBoy').attr('disabled','disabled');
        $('#inpUzunluk').attr('disabled','disabled');
        $('#inpSizeType').val('daire');
        $('#inpSizeTypeForPrice').val('daire');
   });
    
    
    $('#btnGetPrice').on('click', function(){
        //console.log($('#slProduct').val());
        var pId = $('#slProduct').val();
        
        if(pId != '' && pId != undefined){
            $('#inpProductId').val(pId);
            $('#productIdForPrice').val(pId);
            wsPost('/wsproductprice/listproductprice', {productId : pId}, function(error, response){
               if(error){
                    console.error(error);
                    return;
               }
                
                $('#priceTable').empty();
                var priceList = response.data;
                var count = 1;
                //console.log('data : ' + JSON.stringify(priceList));
                for(var i = 0;i < priceList.dimension.length; i++){
                    //console.log(i);
                    fillPriceTable(priceList, priceList.dimension[i], count++);
                }
            });
        }
        
    });
    
    $('#btnSubmitPrice').on('click', function(){
         if($('#inpProductId').val() != ""){
            $('#formPrice').submit();
         }else{
            alert('Urun seciniz.');   
         }
    });
    
    $('#priceTable').on('click', '.remove', function(){
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        console.log('asd');
        wsPost('/wsproductprice/remove', { _id : id }, function(error, response){
            if(error){
                console.error(error);
                return;
            }
            tr.remove();
            //console.log(response);
        });
    });
}

function fillPriceTable(product, dimension, count){
    //console.log(product+' '+dimension);
    var table = $('#priceTable');
    
    var tr = $('<tr id="' + product._id + ',' + dimension._id + '"></tr>');
    var tdCount = '<td class="text-center">' + count + '</td>';
    var tdType = '<td class="text-center">' + product.dimensionType + '</td>';
    var tdDimension;
    if(product.dimensionType == 'dikdörtgen'){
        tdDimension = '<td class="text-center">' + dimension.W + 'X' + dimension.H + 'X' + dimension.L + '</td>';
    }
    else{
        tdDimension = '<td class="text-center">' + dimension.W + 'X' + dimension.L + '</td>';   
    }
    var tdDimensionPrice = '<td class="text-center">' + dimension.price + '</td>';
    var tdButton = '<td class="text-center"><a class="btn btn-danger btn-sm btn-flat remove"><i class="fa fa-trash-o"></i></a></td>';
    
    tr.append(tdCount);
    tr.append(tdType);
    tr.append(tdDimension);
    tr.append(tdDimensionPrice);
    tr.append(tdButton);
    
    
    table.append(tr);
    //console.log('tr : ' + tr.html());
}

function formHandlers(){
    $('#formPrice').ajaxForm(function(data){
        //console.log(data);
        addPriceToTable();
    });
    $('#formUploadCsv').ajaxForm(function(data){
        console.log(data);
    });
}

function addPriceToTable(){
    var product = {
        _id : '',
        dimensionType : ''
    }
    
    var dimension = {
        _id : '',
        W: 0,
        H : 0,
        L : 0,
        price : ''
    }
    var type = $('#inpSizeType').val();
    product._id = $('#inpProductId').val();
    if(type == 'dikdörtgen'){
        product.dimensionType = 'dikdörtgen';   
    }else{
        product.dimensionType = 'daire';
    }
    if(product.dimensionType == 'dikdörtgen'){
        dimension.W = $('#inpEn').val();
        dimension.H = $('#inpBoy').val();
        dimension.L = $('#inpUzunluk').val();
    }
    else{
        dimension.W = $('#inpCap').val();
        dimension.L = $('#inpDaireUzunluk').val();
    }
    dimension.price = $('#inpPrice').val();
    var count = $('#priceTable').find('tr').size();
    
    fillPriceTable(product, dimension, ++count);
}

function otherScripts(){
   jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
        return this.each(function() {
            var select = this;
            var options = [];
            $(select).find('option').each(function() {
                options.push({value: $(this).val(), text: $(this).text()});
            });
            $(select).data('options', options);
            $(textbox).bind('change keyup', function() {
                var options = $(select).empty().data('options');
                var search = $(this).val().trim();
                var regex = new RegExp(search,"gi");
              
                $.each(options, function(i) {
                    var option = options[i];
                    if(option.text.match(regex) !== null) {
                        $(select).append(
                           $('<option>').text(option.text).val(option.value)
                        );
                    }
                });
                if (selectSingleMatch === true && $(select).children().length === 1) {
                    $(select).children().get(0).selected = true;
                }
            });            
        });
    };

    $(function() {
        $('.select').filterByText($('#textbox'), false);
		  $("select option").click(function(){
			alert(1);
		  });
    });
}