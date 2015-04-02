function clickHandlers(){

}
function formHandlers(){

}
function otherScripts(){
    $(function() {
        wsPost('/wsoffer/search', {search : {
            'activities.activityType' : 'remember'
        }}, function(error, response){
            var newEvents = [];
            if(response.response.length > 0){
                for(var i = 0; i < response.response.length; i++){
                    for(var j = 0; j < response.response[i].activities.length; j++){
                        if(response.response[i].activities[j].activityType == 'remember'){
                            var event = {
                                title: '',
                                start: new Date(),
                                end: new Date()
                            };
                            event.title = response.response[i].activities[j].content;
                            event.start = new Date(response.response[i].activities[j].activityDate);
                            event.end = new Date(response.response[i].activities[j].activityDate);
                            newEvents.push(event);
                        }
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
                lang:'tr'
            });
            $('#calendar').fullCalendar('addEventSource', newEvents);
            $('#calendar').fullCalendar('rerenderEvents');
        });
    });
}