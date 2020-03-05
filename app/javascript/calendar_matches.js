import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';


const calendar = () => {
  document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');

    let calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin ]
    });

    calendar.render();
  });
}


export { calendar }
