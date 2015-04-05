function clickHandlers(){
    $('#btnAddCompetentInfo').on('click', function(){
        var CompetentInfoItem = {
            name : $('#inpCompetentName').val(),
            task : $('#inpCompetentTask').val(),
            gsm : $('#inpCompetentGsm').val(),
            email : $('#inpCompetentEmail').val()
        }
        fillItemToCompetentInfo(CompetentInfoItem);
        var competentInfo;
        competentInfo= JSON.parse($('#inpCompetentInfo').val());
        console.log("com : "+JSON.stringify(competentInfo));
        competentInfo.push(CompetentInfoItem);
        console.log("2 "+JSON.stringify(competentInfo));
        $('#inpCompetentInfo').val(JSON.stringify(competentInfo));
        console.log("3 "+$("#inpCompetentInfo").val());
        $('#inpCompetentName').val("");
        $('#inpCompetentTask').val("");
        $('#inpCompetentGsm').val("");
        $('#inpCompetentEmail').val("");
    });
    
    $('#tableCompetentInfo').on('click','.edit', function(){
        var tds=$(this).closest("tr").find("td");
        var arrCompetent=createArrForEdit(tds);
        var id=$(this).closest("tr").attr("id");
        $("#divEditCompetentInfo").attr("style","display:inline;");
        $("#btnAddCompetentInfo").attr("style","display:none;");
        $("#btnEditCompetentInfo").attr("data",id);
        $('#inpCompetentName').val(arrCompetent[0]);
        $('#inpCompetentTask').val(arrCompetent[1]);
        $('#inpCompetentGsm').val(arrCompetent[2]);
        $('#inpCompetentEmail').val(arrCompetent[3]);
        $('#divAddCompetent').slideDown(800);
    });
    $("#btnEditCompetentInfo").click(function(){
        var id=$(this).attr("data");    
        var CompetentInfoItem = {
            name : $('#inpCompetentName').val(),
            task : $('#inpCompetentTask').val(),
            gsm : $('#inpCompetentGsm').val(),
            email : $('#inpCompetentEmail').val()
        };
        var competentInfo = JSON.parse($('#inpCompetentInfo').val());
        competentInfo[id-1]=CompetentInfoItem;
        $('#inpCompetentInfo').val(JSON.stringify(competentInfo));
        var tds= $("#tableCompetentInfo tr[id='"+id+"']").find("td");
        tds.eq(1).text($('#inpCompetentName').val());
        tds.eq(2).text($('#inpCompetentTask').val());
        tds.eq(3).text($('#inpCompetentGsm').val());
        tds.eq(4).text($('#inpCompetentEmail').val());
        $('#inpCompetentName').val("");
        $('#inpCompetentTask').val("");
        $('#inpCompetentGsm').val("");
        $('#inpCompetentEmail').val("");
        $("#btnAddCompetentInfo").attr("style","display:inline;");
        $("#divEditCompetentInfo").attr("style","display:none;");
    });
    
    $('#tableCompetentInfo').on('click','.remove', function(e){
        console.log("abc: "+$('#inpCompetentInfo').val());
        e.preventDefault();
        var tr = $(this).closest('tr');
        var count = tr.attr('id');
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                if(count){
                    tr.remove();
                    orderTable("#tableCompetentInfo");
                    removeFromCompetentAndTable(count);
                }
                var tableSize=$('#tableCompetentInfo tr').size();
                var trs=$('#tableCompetentInfo').find("tr");
                for(var i=0;i<tableSize;i++){
                   trs.eq(i).attr("id",i+1);
                   trs.eq(i).find("td").eq(0).text(i+1);

                }
                alertify.success('Başarı ile silindi.');
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });
    });
    
    $('#btnAddCompetent').on('click', function(){
        $('#divAddCompetent').slideToggle(800);
    }); 
    
    $('#btnAddForwardingInfo').on('click', function(){
        var forwardingInfoItem = {
            label:$("#inpForwardingLabel").val(),
            deliveryType : $('#slctForwardingInfoDeliverType').val(),
            address : $('#txtForwardingAddress').val(),
            city : $('#slctForwardingCity').val(),
            state : $('#slctForwardingState').val()
        };
        fillItemToForwardingInfo(forwardingInfoItem);
        var forwardingInfo;
        forwardingInfo = JSON.parse($('#inpForwardingInfo').val());
        forwardingInfo.push(forwardingInfoItem);
        console.log($('#inpForwardingInfo').val());
        $('#inpForwardingInfo').val(JSON.stringify(forwardingInfo));
        $("#inpForwardingLabel").val("");
        $("#slctForwardingInfoDeliverType").val("Seçiniz");
        $("#slctForwardingCity").val("Seçiniz");
        $("#slctForwardingState").val("Seçiniz");
        $('#txtForwardingAddress').val("");
    });
    
    $('#tableForwardingInfo').on('click','.remove', function(e){
        e.preventDefault();
        var tr = $(this).closest('tr');
        var count = tr.attr('id');
        alertify.confirm("Silmek istediğinizden emin misiniz?",
            function(){
                if(count){
                    tr.remove();
                    orderTable("#tableForwardingInfo");
                    removeFromForwardingAndTable(count);
                }
                var tableSize=$('#tableForwardingInfo tr').size();
                var trs=$('#tableForwardingInfo').find("tr");
                for(var i=0;i<tableSize;i++){
                   trs.eq(i).attr("id",i+1);
                   trs.eq(i).find("td").eq(0).text(i+1);

                }
                alertify.success('Başarı ile silindi.');
                },
            function() {
               alertify.error('İşlem iptal edildi.');
        });
    });
    
    $('#btnAddForwarding').on('click', function(){
        $('#divAddForwarding').slideToggle(800);
    }); 
    $('#tableForwardingInfo').on('click','.edit', function(){
        var tds=$(this).closest("tr").find("td");
        var arrForwarding=createArrForEdit(tds);
        console.log(arrForwarding);
        var id=$(this).closest("tr").attr("id");
        $("#divEditForwardingInfo").attr("style","display:inline;");
        $("#btnEditForwardingInfo").attr("data",id);
        $("#btnAddForwardingInfo").attr("style","display:none;");
        $('#inpForwardingLabel').val(arrForwarding[0]);
        $("#slctForwardingInfoDeliverType option[value='"+arrForwarding[1]+"'").attr("selected",true);
        $('#txtForwardingAddress').val(arrForwarding[2]);
        $("#slctForwardingCity  option[value='"+arrForwarding[3]+"'").attr("selected",true);
        listStates("slctForwardingCity","slctForwardingState",arrForwarding[4]);
        $('#divAddForwarding').slideDown(800);
    });
    $("#btnEditForwardingInfo").click(function(){
        var id=$(this).attr("data");
        var forwardingObj = {
            label :$("#inpForwardingLabel").val(),
            deliveryType : $('#slctForwardingInfoDeliverType').val(),
            address : $('#txtForwardingAddress').val(),
            city : $('#slctForwardingCity').val(),
            state : $('#slctForwardingState').val()
        };
        var forwardingInfo = JSON.parse($('#inpForwardingInfo').val());
        forwardingInfo[id-1]=forwardingObj;
        $('#inpForwardingInfo').val(JSON.stringify(forwardingInfo));
        var tds= $("#tableForwardingInfo tr[id='"+id+"']").find("td");
        tds.eq(1).text($('#inpForwardingLabel').val());
        tds.eq(2).text($('#slctForwardingInfoDeliverType').val());
        tds.eq(3).text($('#txtForwardingAddress').val());
        tds.eq(4).text($('#slctForwardingCity').val());
        tds.eq(5).text($('#slctForwardingState').val());
        $('#inpForwardingLabel').val("");
        $("#slctForwardingInfoDeliverType").val("Seçiniz");
        $("#slctForwardingCity").val("Seçiniz");
        $("#slctForwardingState").val("Seçiniz");
        $('#txtForwardingAddress').val("");
        $("#btnAddForwardingInfo").attr("style","display:inline;");
        $("#divEditForwardingInfo").attr("style","display:none;");
    });
}
function fillItemToCompetentInfo(item){
    var table = $('#tableCompetentInfo');
    var count = table.find('tr').size();
    ++count;
    var tr = $('<tr id="' + count + '"></tr>');
    var tdCount = $('<td>' + count + '</td>');
    var tdName = $('<td>' + item.name + '</td>');
    var tdTask = $('<td>' +item.task+ '</td>');
    var tdGsm = $('<td>' + item.gsm + '</td>');
    var tdEmail= $('<td>' + item.email+ '</td>');
    var tdButton = $('<td><a class="btn btn-danger btn-flat btn-sm remove"><i class="fa fa-trash-o"></i></a><span> </span><a class="btn btn-info btn-sm edit"><i class="fa fa-pencil"></i></a></td>');
    
    tr.append(tdCount);tr.append(tdName);tr.append(tdTask);tr.append(tdGsm);tr.append(tdEmail);tr.append(tdButton);
    table.append(tr);
}

function removeFromCompetentAndTable(count){
    console.log($('#inpCompetentInfo').val());
    var competentInfo = JSON.parse($('#inpCompetentInfo').val()); 
    competentInfo.splice((count-1),1);
    console.log("competentInfoArr : "+JSON.stringify(competentInfo));
    $('#inpCompetentInfo').val(JSON.stringify(competentInfo));
    console.log("silindi: "+$('#inpCompetentInfo').val());
}
function fillItemToForwardingInfo(item){
    var table = $('#tableForwardingInfo');
    var count = table.find('tr').size();
    ++count;
    var tr = $('<tr id="' +count+ '"></tr>');
    var tdCount = $('<td>' +count+ '</td>');
    var tdLabel = $('<td>' + item.label + '</td>');
    var tdDeliverType = $('<td>' + item.deliveryType + '</td>');
    var tdAddress = $('<td>' +item.address+ '</td>');
    var tdCity = $('<td>' + item.city + '</td>');
    var tdState= $('<td>' + item.state+ '</td>');
    var tdButton = $('<td><a class="btn btn-danger btn-flat btn-sm remove"><i class="fa fa-trash-o"></i></a><span> </span><a class="btn btn-info btn-sm edit"><i class="fa fa-pencil"></i></a></td>');
    
    tr.append(tdCount);tr.append(tdLabel);tr.append(tdDeliverType);tr.append(tdAddress);tr.append(tdCity);tr.append(tdState);tr.append(tdButton);
    table.append(tr);
}

function removeFromForwardingAndTable(count){
    console.log("a : "+$('#inpForwardingInfo').val());
    console.log("c : "+count);
    var forwardingInfo = JSON.parse($('#inpForwardingInfo').val()); 
    forwardingInfo.splice((count-1),1);
    $('#inpForwardingInfo').val(JSON.stringify(forwardingInfo));
    console.log($('#inpForwardingInfo').val());
}

function formHandlers(){
     $('#frmCustomerDefinition').ajaxForm(function(data){
        console.log('basarili');
         if(data.state==true){
            alertify.success("İşlem başarı ile gerçekleştirildi.");
        }else{
            alertify.error("İşlem başarısız.");
        }
    });
}
function otherScripts(){
    $("#slctContactCity").on("change",function(){
        listStates("slctContactCity","slctContactState","");
    });
    $("#slctBillCity").on("change",function(){
        listStates("slctBillCity","slctBillState","");
    });
    $("#slctForwardingCity").on("change",function(){
        listStates("slctForwardingCity","slctForwardingState","");
    });
}
function listStates(slctCity,slctState,item){
        $("#"+slctState).empty();
        var cityId=$("#"+slctCity+" option:selected").attr("id");
        var op1=$('<option style="padding-left:0px;" value="Seçiniz" >Seçiniz</option>');
        $("#"+slctState).append(op1);
        wsPost("/wscity/gettowns",{_id : cityId},function(err,resp){
            if(err){
                console.error(err);
                return;
            }
            for(var i=0;i<resp.data[0].towns.length;i++){
                if(item==""){
                     var op=$("<option value='"+resp.data[0].towns[i].townName+"'>"+resp.data[0].towns[i].townName+"</option>");
                }else{
                     if(item==resp.data[0].towns[i].townName){
                         var op=$("<option value='"+resp.data[0].towns[i].townName+"' selected>"+resp.data[0].towns[i].townName+"</option>");
                        }else{
                         var op=$("<option value='"+resp.data[0].towns[i].townName+"'>"+resp.data[0].towns[i].townName+"</option>");
                        }
                }
                $("#"+slctState).append(op);
            }
        });
}
function createArrForEdit(tds){
    var arr=[];
    for(var i=1;i<tds.size()-1;i++){
       arr.push(tds.eq(i).text());
    }
    return arr;
}

