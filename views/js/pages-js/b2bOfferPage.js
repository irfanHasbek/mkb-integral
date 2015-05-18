function clickHandlers() {
    $("#slctMusteriListesi").on("change",function(){
        $("#divYeniMusteri").removeAttr("style");
        $("#frmMusteri").attr("action","/wschildcustomer/update");
        wsPost()
    });
    $("#btnYeniMusteri").click(function(){
        $("#divYeniMusteri").removeAttr("style");
        $("#frmMusteri").attr("action","/wschildcustomer/addnew");
    });
    $('.next').on('click', function(){
        $('.wizard').removeClass('active');
        $('a[href=' + $(this).attr('href') + ']').closest('li').addClass('active');
    });
    $('#btnRect').click(function(e) {
        e.preventDefault();
        $('#divCir').slideUp('800');
        $('#divOther').slideUp('800');
        $('#divRec').slideToggle('800');
        $('#inpCap').attr('disabled', 'disabled');
        $('#inpUzunluk').attr('disabled', 'disabled');
        $('#inpAdet').attr('disabled', 'disabled');
        $('#inpEn').removeAttr('disabled');
        $('#inpBoy').removeAttr('disabled');
        $('#inpYukseklik').removeAttr('disabled');
        $('#inpSizeType').val('Dikdörtgen');
    });

    $('#btnCir').click(function(e) {
        e.preventDefault();
        $('#divRec').slideUp('800');
        $('#divOther').slideUp('800');
        $('#divCir').slideToggle('800');
        $('#inpCap').removeAttr('disabled');
        $('#inpUzunluk').removeAttr('disabled');
        $('#inpEn').attr('disabled', 'disabled');
        $('#inpBoy').attr('disabled', 'disabled');
        $('#inpYukseklik').attr('disabled', 'disabled');
        $('#inpAdet').attr('disabled', 'disabled');
        $('#inpSizeType').val('Dairesel');
    });
    
    $('#btnOther').click(function(e) {
        e.preventDefault();
        $('#divRec').slideUp('800');
        $('#divCir').slideUp('800');
        $('#divOther').slideToggle('800');
        $('#inpAdet').removeAttr('disabled');
        $('#inpEn').attr('disabled', 'disabled');
        $('#inpBoy').attr('disabled', 'disabled');
        $('#inpYukseklik').attr('disabled', 'disabled');
        $('#inpCap').attr('disabled', 'disabled');
        $('#inpUzunluk').attr('disabled', 'disabled');
        $('#inpSizeType').val('Diger');
    });

    $('#btnAddBasket').on('click', function() {
        var basketItem = {
            productId: $('#selectProduct option:selected').attr("id"),
            productCodes: $('#selectProduct option:selected').attr("data"),
            productGroup: $("#productGroup option:selected").text(),
            productName: $('#selectProduct option:selected').text(),
            productSizeType: '',
            productSizeWidthOrDiameter: '',
            productSizeLength: '',
            productSizeHeight: '',
            montageType: $('#montageType').val(),
            coverType: $('#coverType').val(),
            setMechanism: $('#setMechanism').val(),
            accessory: $('#accessory').val(),
            bodyType: $('#bodyType').val(),
            amount: $('#amount').val(),
            lineDiscount: $("#inpDiscount").val(),
            productPrice: '',
            productListPrice: '',
            productPriceWithDiscount: '',
            unit : $('#slctUnit').val()
        }
        if ($('#inpSizeType').val() == 'Dikdörtgen') {
            basketItem.productSizeType = 'Dikdörtgen';
            basketItem.productSizeWidthOrDiameter = $('#inpEn').val();
            basketItem.productSizeLength = $('#inpBoy').val();
            basketItem.productSizeHeight = $('#inpYukseklik').val();
        } else if($('#inpSizeType').val() == 'Dairesel') {
            basketItem.productSizeType = 'Dairesel';
            basketItem.productSizeWidthOrDiameter = $('#inpCap').val();
            basketItem.productSizeLength = $('#inpUzunluk').val();
        }else if($('#inpSizeType').val() == 'Diger'){
            basketItem.productSizeType = 'Diger';
            basketItem.productSizeWidthOrDiameter = $('#inpAdet').val();
        }
        var info = {
            productId: basketItem.productId,
            montageCost: $('#montageType option:selected').attr('data'),
            coverCost: $('#coverType option:selected').attr('data'),
            setMechCost: $('#setMechanism option:selected').attr('data'),
            accessory: $('#accessory option:selected').attr('data'),
            bodyType: $('#bodyType option:selected').attr('data'),
            amount: basketItem.amount,
            lineDiscount: basketItem.lineDiscount,
            productType: basketItem.productSizeType,
            W: 0,
            H: 0,
            L: 0
        };
        if (info.productType == 'Dikdörtgen') {
            info.W = basketItem.productSizeWidthOrDiameter;
            info.H = basketItem.productSizeHeight;
            info.L = basketItem.productSizeLength;
        } else {
            info.W = basketItem.productSizeWidthOrDiameter;
            info.L = basketItem.productSizeLength;
        }
        //console.log(info);
        wsPost('/wspricecalculate/calculate', {
            info: info
        }, function(error, response) {
            if (error || !response.state) {
                console.error(error);
                alertify.error(response.message);
                return;
            }
            //console.log(response);
            if (response.state) {
                basketItem.productPrice = response.response.total;
                basketItem.productListPrice = response.response.listPrice;
                basketItem.productPriceWithDiscount = response.response.discountPrice;
                var basket = JSON.parse($('#inpBasket').val());
                basket.push(basketItem);
                $('#inpBasket').val(JSON.stringify(basket));
                //console.log($('#inpBasket').val());
                fillItemToBasket(basketItem);
                alertify.success('Ürün basariyla sepete eklendi.');
                $("#divProduct input[type='text']").val("");
                $("#divProduct input[type='number']").val("");
                $('#divProduct select').find('option:contains("Seçiniz")').attr('selected', true);
            }
        });
    });

    $('#tableBasket').on('click', '.remove', function() {
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        if (id) {
            alertify.confirm("Silmek istediğinizden emin misiniz?",
                function() {
                    tr.remove();
                    orderTable("#tableBasket");
                    removeFromBasketAndTable(id);
                    calculatePriceAfterOperation();
                    alertify.success('Başarı ile silindi.');
                },
                function() {
                    alertify.error('İşlem iptal edildi.');
                });
        }
    });
    $("#tblActivity tbody").on("click", ".silact", function() {
        var offerId = $(this).closest("td").attr("id");
        var tr = $(this).closest("tr");
        var activityId = tr.attr("id");
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function() {
                wsPost("/wsoffer/removeactivity", {
                    offerId: offerId,
                    activityId: activityId
                }, function(err, resp) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    alertify.success('Başarı ile silindi.');
                    tr.remove();
                    orderTable("#tblActivity");
                });

            },
            function() {
                alertify.error('İşlem iptal edildi.');
            });

    });
}

function fillItemToBasket(item) {
    var table = $('#tableBasket');
    var count = table.find('tr').size();

    var tr = $('<tr id="' + item.productId + '"></tr>');
    var tdCount = $('<td>' + (++count) + '</td>');
    var tdProductCode = $('<td>' + item.productCodes + '</td>');
    var tdProduct = $('<td>' + item.productGroup + ' - ' + item.productName + '</td>');
    var tdSize = '';
    if (item.productSizeType == 'Dikdörtgen') {
        tdSize = $('<td>' + item.productSizeWidthOrDiameter + ' x ' + item.productSizeHeight + ' x ' + item.productSizeLength + '<font size="1" color="blue"> (genişlik*yükseklik*uzunluk)</font></td>');
    } else {
        tdSize = $('<td>' + item.productSizeWidthOrDiameter + ' x ' + item.productSizeLength + '<font size="1" color="blue"> (çap*uzunluk)</font></td>');
    }
    var tdMontageType = $('<td>' + item.montageType + '</td>');
    var tdCoverType = $('<td>' + item.coverType + '</td>');
    var tdsetMech = $('<td>' + item.setMechanism + '</td>');
    var tdAccessory = $('<td>' + item.accessory + '</td>');
    var tdBodyType = $('<td>' + item.bodyType + '</td>');
    var tdAmount = $('<td>' + item.amount + ' ' + item.unit +'</td>');
    var tdListPrice = $('<td>' + item.productListPrice + '</td>');
    var tdLineDiscount = $('<td> %' + item.lineDiscount + '</td>');
    var tdDiscountPrice = $('<td>' + item.productPriceWithDiscount + '</td>');
    var tdPrice = $('<td>' + item.productPrice + '</td>');
    var tdButton = $('<td><button class="btn btn-danger btn-flat btn-sm remove"><i class="fa fa-trash-o"></i></button></td>');

    tr.append(tdCount);
    tr.append(tdProductCode);
    tr.append(tdProduct);
    tr.append(tdSize);
    tr.append(tdMontageType);
    tr.append(tdCoverType);
    tr.append(tdsetMech);
    tr.append(tdAccessory);
    tr.append(tdBodyType);
    tr.append(tdAmount);
    tr.append(tdListPrice);
    tr.append(tdLineDiscount);
    tr.append(tdDiscountPrice);
    tr.append(tdPrice);
    tr.append(tdButton);
    table.append(tr);

    calculatePriceAfterOperation();
}

function calculatePriceAfterOperation() {
    var sum = parseFloat(calculateBasketTotalPrice());
    $('#productSum').val(sum);
    var discount = parseFloat(calculateBasketTotalDiscount());
    $('#generalDiscount').val(discount);
    
    var kdv = sum * (18 / 100);
    $('#productKDV').val(kdv);
    $('#productTotal').val(sum + kdv);
}

function calculateBasketTotalPrice() {
    var basket = JSON.parse($('#inpBasket').val());
    var total = 0;
    if (basket != [] || basket != '') {
        for (var i = 0; i < basket.length; i++) {
            total += parseFloat(basket[i].productPrice);
        }
    }
    return total;
}

function calculateBasketTotalDiscount() {
    var basket = JSON.parse($('#inpBasket').val());
    var total = 0;
    if (basket != [] || basket != '') {
        for (var i = 0; i < basket.length; i++) {
            total += parseFloat(basket[i].amount * parseFloat(basket[i].productListPrice - basket[i].productPriceWithDiscount));
        }
    }
    return total;
}

function removeFromBasketAndTable(id) {
    var basket = JSON.parse($('#inpBasket').val());
    var index = 0;
    for (var i = 0; i < basket.length; i++) {
        if (basket[i].productId == id) {
            index = i;
        }
    }
    basket.splice(index, 1);
    $('#inpBasket').val(JSON.stringify(basket));
}

function formHandlers() {
    $('#formOffer').ajaxForm(function(data) {
        if(data.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            $("#btnPdfYazdir").removeAttr("disabled");
            if ($('#formOffer').attr('action') == '/wsoffer/b2badd') {
                $("#btnPdfYazdir").attr("href", "/teklif_yazdir?id=" + data.response._id + '&code=' + $('#inpFirmCode').val() + '');
                clearInputs("divOffer");
                clearTextareas("divOffer");
                restoreSelects("divOffer");
            }
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}

function otherScripts() {
    var id=window.location.search.split("id=");
    if(id[1]=="0"){
        $("#modalYeniMusteriEkle").modal('show');
    } 
    if ($('#generalDiscount').val() == '') {
        $('#generalDiscount').val(0);
    }
    if ($('#productSum').val() == '') {
        $('#productSum').val(0);
    }
    if ($('#productKDV').val() == '') {
        $('#productKDV').val(0);
    }
    if ($('#productTotal').val() == '') {
        $('#productTotal').val(0);
    }

    $('#inpOfferDate').val(getTodayDate());

    if ($("#formOffer").attr("action") == "/wsoffer/b2badd") {
        getCustomer($("#selectCustomer option:selected").val());
        var basket = [];
        $("#inpBasket").val(JSON.stringify(basket));
    }

    $('#generalDiscount').on('input', function() {
        if (isNumber($(this).val())) {
            calculatePriceAfterOperation();
        }
    });
    $("#productGroup").change(function() {
        var group = $("#productGroup option:selected").text();
        console.log("group : "+group);
        listProductsByGroupName(group);
        listMontageTypeByGroupName(group);
        listAccesorryByGroupName(group);
        listBodyTypeByGroupName(group);
        listSetMechanismByGroupName(group);
        getProductsDiscountByGroupName($('#selectCustomer').val(), $('#productGroup').val());
    });
    $("#slctCompetent").change(function() {
        clearInputs("divCompetent");
        console.log($("#slctCompetent option:selected").val());
        getCompetentInfo($("#slctCompetent option:selected").val(), $("#selectCustomer option:selected").val());
    });
}

function getProductsDiscountByGroupName(customerId, groupId) {
    var searchCriteria = {
        customerId : customerId,
        productGroupId : groupId
    };
    wsPost("/wsdiscount/getdiscount", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#inpDiscount").val(resp.response.percent);
    });
}

function listProductsByGroupName(group) {
    var searchCriteria = {
        search: {
            group: group
        }
    };
    wsPost("/wsproduct/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#selectProduct").empty();
        var optInitial = $("<option value='Seçiniz' data='0'>Ürün Seçiniz</option>");
        $("#selectProduct").append(optInitial);
        for (var i = 0; i < resp.response.length; i++) {
            var opt = $("<option id='" + resp.response[i]._id + "' value='" + resp.response[i].name + "' data='" + resp.response[i].code +"'>" + resp.response[i].name + "</option>");
            $("#selectProduct").append(opt);
        }
    });
}

function listMontageTypeByGroupName(group) {
    var searchCriteria = {
        productGroupName: group,
        firmCode:$("#inpFirmCode").val()
    };
    wsPost("/wsmontagetype/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#montageType").empty();
        var optInitial = $("<option value='Seçiniz' data='0'>Seçiniz</option>");
        $("#montageType").append(optInitial);
        for (var i = 0; i < resp.data.length; i++) {
            var opt = $("<option id='" + resp.data[i]._id + "' value=" + resp.data[i].montageType + " data='" + resp.data[i].cost +"'>" + resp.data[i].montageType + "</option>");
            $("#montageType").append(opt);
        }
    });
}

function listBodyTypeByGroupName(group) {
    var searchCriteria = {
        productGroupName: group,
        firmCode:$("#inpFirmCode").val()
    };
    wsPost("/wsbodytype/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#bodyType").empty();
        var optInitial = $("<option value='Seçiniz' data='0'>Seçiniz</option>");
        $("#bodyType").append(optInitial);
        for (var i = 0; i < resp.data.length; i++) {
            var opt = $("<option id='" + resp.data[i]._id + "' value=" + resp.data[i].bodyType + " data='" + resp.data[i].cost +"'>" +  resp.data[i].bodyType + "</option>");
            $("#bodyType").append(opt);
        }
    });
}

function listAccesorryByGroupName(group) {
    var searchCriteria = {
        productGroupName: group,
        firmCode:$("#inpFirmCode").val()
    };
    wsPost("/wsaccessory/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#accessory").empty();
        var optInitial = $("<option value='Seçiniz' data='0'>Seçiniz</option>");
        $("#accessory").append(optInitial);
        for (var i = 0; i < resp.data.length; i++) {
            var opt = $("<option id='" + resp.data[i]._id + "' value=" + resp.data[i].accessory + " data='" + resp.data[i].cost +"'>" + resp.data[i].accessory + "</option>");
            $("#accessory").append(opt);
        }
    });
}

function listSetMechanismByGroupName(group) {
    var searchCriteria = {
        productGroupName: group,
        firmCode:$("#inpFirmCode").val()
    };
    wsPost("/wssetmechanism/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        $("#setMechanism").empty();
        var optInitial = $("<option value='Seçiniz' data='0'>Seçiniz</option>");
        $("#setMechanism").append(optInitial);
        for (var i = 0; i < resp.data.length; i++) {
            var opt = $("<option id='" + resp.data[i]._id + "' value=" + resp.data[i].setMechanism + " data='" + resp.data[i].cost +"'>" + resp.data[i].setMechanism + "</option>");
            $("#setMechanism").append(opt);
        }
    });
}

function getCustomer(custName) {

    var searchCriteria = {
        search: {
            _id: custName
        }
    };
    wsPost("/wscustomerdefinition/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        listComptents(resp.response[0].competentInfo);
        getContact(resp.response[0].contactInfo);
    });
}

function listComptents(data) {
    $("#slctCompetent").empty();
    var optInitial = $("<option value='Seçiniz' selected disabled>Yetkili Seçiniz</option>");
    $("#slctCompetent").append(optInitial);
    for (var i = 0; i < data.length; i++) {
        var opt = $("<option value=" + data[i]._id + ">" + data[i].name + "</option>");
        $("#slctCompetent").append(opt);
    }
}

function getContact(data) {
    $("#inpContactInfoAddress").val(data.address);
    $("#inpContactInfoCity").val(data.city);
    $("#inpContactInfoState").val(data.state);
    $("#inpContactInfoBusinessPhone").val(data.businessPhone);
    $("#inpContactInfoFax").val(data.fax);
    $("#inpContactInfoWeb").val(data.webAddress);
}

function getCompetentInfo(competentId, custId) {
    var searchCriteria = {
        search: {
            _id: custId
        }
    };
    wsPost("/wscustomerdefinition/search", searchCriteria, function(err, resp) {
        if (err) {
            console.error(err);
            return;
        }
        for (var i = 0; i < resp.response[0].competentInfo.length; i++) {
            if (competentId == resp.response[0].competentInfo[i]._id) {
                console.log(resp.response[0].competentInfo[i]);
                $("#inpCompetentInfoName").val(resp.response[0].competentInfo[i].name);
                $("#inpCompetentInfoTask").val(resp.response[0].competentInfo[i].task);
                $("#inpCompetentInfoGsm").val(resp.response[0].competentInfo[i].gsm);
                $("#inpCompetentInfoEmail").val(resp.response[0].competentInfo[i].email);
            }
        }
    });
}