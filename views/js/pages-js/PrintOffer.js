$(document).ready(function(){
    //console.log($('body').height());
    var basket = JSON.parse($('#tempBasket').val());
    b = {};
    for (var i = 0; i < basket.length; i++) {
        b[basket[i].productId] = basket[i];
    }
    var productList = [];
    for(var key in b){
        productList.push(key);
    }
    
    wsPost("/wsproduct/textsearchproduct", { _id : productList }, function(error, data){
        if(error || data.state == false){
            console.log('Hata Olustu');
            return;
        }
        //console.log(data);
        var div = $('#productSummary');
        for(var i = 0; i < data.response.length; i++){ 
            var table = $('<table class="table table-bordered-print"></table>');
            var tr1 = '<tr><td colspan="3"><span style="font-size:12px;"> <strong> ' + data.response[i].code + ' / ' + data.response[i].name + ' </strong></span></td></tr>';
            var tr2 = '<tr><td style="width:20px;"> '+ (i+1) +' </td><td style="width:200px;"><img src="' + data.response[i].pictureUrl + '" class="img-responsive" style="max-height:100px" alt=""></td><td><p>' + data.response[i].description + '</p></td></tr>';
            table.append(tr1);table.append(tr2);
            div.append(table);
        }
        
    });
});