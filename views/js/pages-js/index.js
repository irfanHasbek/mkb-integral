var selectedEvent;
function clickHandlers(){

}
function formHandlers(){
    $('#formUpdateActivity').ajaxForm(function(data){
        if(data.state){
            /*if($('#slctModalActivityOperation').val == 'done'){
                selectedEvent.backgroundColor = "#0f0";
                selectedEvent.borderColor = "#fff";
            }else if($('#slctModalActivityOperation').val == 'undone'){
                selectedEvent.backgroundColor = "#f00";
                selectedEvent.borderColor = "#fff";
            }else if($('#slctModalActivityOperation').val == 'progress'){
                selectedEvent.backgroundColor = "#00f";
                selectedEvent.borderColor = "#fff";
            }
            $('#calendar').fullCalendar('rerenderEvents');*/
            alertify.success('Aktivite basari ile guncellendi.');
            $('#alertModal').modal('hide');
            return;
        }
        alertify.error('Aktivite guncellenemedi.Lutfen saglayici ile iletisime gecin.!');
    });
}
function otherScripts(){
    $(function() {
        wsPost('/wsoffer/search', {search : {
            'activities.owner.ownerName' : $('#inpUsernameForIndex').val()
        }}, function(error, response){
            var newEvents = [];
            if(response.response.length > 0){
                for(var i = 0; i < response.response.length; i++){
                    for(var j = 0; j < response.response[i].activities.length; j++){
                        var event = {
                            start: new Date(),
                            end: new Date()
                        };
                        event.activityId = response.response[i].activities[j]._id;
                        event.activityType = response.response[i].activities[j].activityType;
                        event.content = response.response[i].activities[j].owner.ownerName;
                        event.title = response.response[i].activities[j].content;
                        event.activityStatus = response.response[i].activities[j].activityStatus;
                        event.note = response.response[i].activities[j].note;
                        event.start = new Date(response.response[i].activities[j].activityDate);
                        event.end = new Date(response.response[i].activities[j].activityDate);
                        event.activityStatus = response.response[i].activities[j].activityStatus;
                        if(event.activityStatus == 'done'){
                            event.backgroundColor = "#0f0";
                            event.borderColor = "#fff";
                        }else if(event.activityStatus == 'undone'){
                            event.backgroundColor = "#f00";
                            event.borderColor = "#fff";
                        }else{
                            event.backgroundColor = "#00f";
                            event.borderColor = "#fff";
                        }
                        newEvents.push(event);
                    }
                }
            }
               /* initialize the calendar
             -----------------------------------------------------------------*/
            var lastView;
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                buttonText: {//This is to add icons to the visible buttons
                    prev: "<span class='fa fa-caret-left'></span>",
                    next: "<span class='fa fa-caret-right'></span>",
                    today: 'Bugün',
                    month: 'Ay',
                    week: 'Hafta',
                    day: 'Gün'
                },
                defaultView: 'month',
                lang:'tr',
                eventClick : function(event){
                    //selectedEvent = event;
                    $('#activityOwner').html(event.content);
                    $('#inpActivityId').val(event.activityId);
                    $("#alertModal").modal("show");   
                }
            });
            $('#calendar').fullCalendar('addEventSource', newEvents);
            $('#calendar').fullCalendar('rerenderEvents');
        });
    });
}