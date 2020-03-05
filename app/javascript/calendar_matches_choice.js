import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';


var calendar_matches = () => {

  document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar_matches');

    var user_id = calendarEl.dataset.ids
    // var results = JSON.parse(document
    //   .getElementById("results")
    //   .dataset
    //   .results
    // );

    var results = JSON.parse(calendarEl.dataset.results)




    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin ],
      googleCalendarApiKey: process.env.GOOGLE_API_KEY,
      events: results,
      eventColor: '#378006'
      // doc for the events : https://fullcalendar.io/docs/event-object
      // add an event : https://fullcalendar.io/docs/Calendar-addEvent
    });
    calendar.render();
  });
}



export { calendar_matches }
