function clickHandlers() {
    $('#btnRect').click(function(e) {
        e.preventDefault();
        $('#divCir').slideUp('800');
        $('#divRec').slideToggle('800');
        $('#inpCap').attr('disabled', 'disabled');
        $('#inpEn').removeAttr('disabled');
        $('#inpBoy').removeAttr('disabled');
        $('#inpSizeType').val('Dikdörtgen');
    });

    $('#btnCir').click(function(e) {
        e.preventDefault();
        $('#divRec').slideUp('800');
        $('#divCir').slideToggle('800');
        $('#inpCap').removeAttr('disabled');
        $('#inpEn').attr('disabled', 'disabled');
        $('#inpBoy').attr('disabled', 'disabled');
        $('#inpSizeType').val('Dairesel');
    });

    $('#btnAddBasket').on('click', function() {
        var basketItem = {
            productId: $('#selectProduct option:selected').attr("id"),
            productGroup: $('#productGroup').val(),
            productName: $('#selectProduct').val(),
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
            lineDiscount: 0,
            productPrice: ''
        }
        if ($('#inpSizeType').val() == 'Dikdörtgen') {
            basketItem.productSizeType = 'Dikdörtgen';
            basketItem.productSizeWidthOrDiameter = $('#inpEn').val();
            basketItem.productSizeLength = $('#inpBoy').val();
            basketItem.productSizeHeight = $('#inpYukseklik').val();
        } else {
            basketItem.productSizeType = 'Dairesel';
            basketItem.productSizeWidthOrDiameter = $('#inpCap').val();
            basketItem.productSizeLength = $('#inpUzunluk').val();
        }
        var info = {
            productId: basketItem.productId,
            productCredit: $('#selectProduct option:selected').attr('time'),
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

        wsPost('/wspricecalculate/calculate', {
            info: info
        }, function(error, response) {
            if (error) {
                console.error(response);
                return;
            }
            if (response.state) {
                basketItem.productPrice = response.response;
                var basket = JSON.parse($('#inpBasket').val());
                basket.push(basketItem);
                $('#inpBasket').val(JSON.stringify(basket));
                fillItemToBasket(basketItem);
                $("#divProduct input[type='text']").val("");
                $("#divProduct input[type='number']").val("");
                $('#divProduct select').find('option:contains("Seçiniz")').attr('selected', true);
            } else {
                alert('Uygun ürün bulunamadi.');
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
}

function fillItemToBasket(item) {
    var table = $('#tableBasket');
    var count = table.find('tr').size();

    var tr = $('<tr id="' + item.productId + '"></tr>');
    var tdCount = $('<td>' + (++count) + '</td>');
    var tdAmount = $('<td>' + item.amount + '</td>');
    var tdProduct = $('<td>' + item.productGroup + ' - ' + item.productName + '</td>');
    var tdType = $('<td>' + item.productSizeType + '</td>');
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
    var tdButton = $('<td><button class="btn btn-danger btn-flat btn-sm remove"><i class="fa fa-trash-o"></i></button></td>');

    tr.append(tdCount);
    tr.append(tdAmount);
    tr.append(tdProduct);
    tr.append(tdType);
    tr.append(tdSize);
    tr.append(tdMontageType);
    tr.append(tdCoverType);
    tr.append(tdsetMech);
    tr.append(tdAccessory);
    tr.append(tdBodyType);
    tr.append(tdButton);
    table.append(tr);

    calculatePriceAfterOperation();
}

function calculatePriceAfterOperation() {
    var sum = parseFloat(calculateBasketTotalPrice());
    sum = sum - (sum * (parseFloat($('#generalDiscount').val()) / 100));
    $('#productSum').val(sum);

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

function removeFromBasketAndTable(id) {
    var basket = JSON.parse($('#inpBasket').val());
    var index = 0;
    for (var i = 0; i < basket.length; i++) {
        if (basket[i]._id === id) {
            index = i;
        }
    }
    basket.splice(index, 1);
    $('#inpBasket').val(JSON.stringify(basket));
}

function formHandlers() {
    $('#formOffer').ajaxForm(function(data) {
        console.log(JSON.stringify(data));
        if (data.state == true) {
            alertify.success("İşlem başarı ile gerçekleştirildi.");
            $("#btnPdfYazdir").removeAttr("disabled");
            $("#btnPdfYazdir").attr("href", "/teklif_yazdir?id=" + data.response._id + '&code=' + $('#inpFirmCode').val() + '');
            clearInputs("divOffer");
            clearTextareas("divOffer");
            restoreSelects("divOffer");
        } else {
            alertify.error("İşlem başarısız.");
        }
    });
}

function otherScripts() {
        if ($('#generalDiscount').val() == '') {
            $('#generalDiscount').val(0);
        }
        if ($('#RoundingDiscount').val() == '') {
            $('#RoundingDiscount').val(0);
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
            var basket = [];
            $("#inpBasket").val(JSON.stringify(basket));
        }

        $('#generalDiscount').on('input', function() {
            if (isNumber($(this).val())) {
                calculatePriceAfterOperation();
            }
        });
        $("#productGroup").change(function() {
            var group = $(this).val();
            listProductsByGroupName(group);
        });
        $("#slctCompetent").change(function() {
            clearInputs("divCompetent");
            console.log($("#slctCompetent option:selected").val());
            getCompetentInfo($("#slctCompetent option:selected").val(), $("#inpCustomerId").val());
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
                var optInitial = $("<option value='Seçiniz'>Ürün Seçiniz</option>");
                $("#selectProduct").append(optInitial);
                for (var i = 0; i < resp.response.length; i++) {
                    var opt = $("<option id='" + resp.response[i]._id + "' value=" + resp.response[i].name + " time=" + resp.response[i].time + ">" + resp.response[i].name + "</option>");
                    $("#selectProduct").append(opt);
                }
            });
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