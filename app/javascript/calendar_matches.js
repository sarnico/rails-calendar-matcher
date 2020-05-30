import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';


var calendar = () => {
    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var user_id = calendarEl.dataset.ids
        var calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, googleCalendarPlugin],
            // plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin ],

            googleCalendarApiKey: process.env.GOOGLE_API_KEY,
            events: {
                googleCalendarId: user_id,
                // change the background color of the eventS
                // backgroundColor: "black",
                // borderColor: "black"
            }
            // doc for the events : https://fullcalendar.io/docs/event-object
            // add an event : https://fullcalendar.io/docs/Calendar-addEvent
        });
        calendar.render();

    });
}

//PreventDefault on google events
setTimeout((e) => {

    const events = document.querySelectorAll(".fc-event-container");

    const prevent = (event) => {
        event.preventDefault();
    }

    events.forEach((eventOp) => {
        eventOp.addEventListener("click", prevent)
    });

}, 500)



export { calendar }