import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';


var calendar = () => {
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var user_id = calendarEl.dataset.ids
    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin ],
      googleCalendarApiKey: process.env.GOOGLE_API_KEY,
      events: {
        googleCalendarId: user_id,
        // change the background color of the eventS
        // backgroundColor: "black",
        // borderColor: "black"
      }
      // doc for the events : https://fullcalendar.io/docs/event-object
    });

    calendar.render();
  });
}







export { calendar }
