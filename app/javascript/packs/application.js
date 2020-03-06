import "bootstrap";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import { calendar } from "../calendar_matches"
import { calendar_matches } from "../calendar_matches_choice"



if(document.getElementById('calendar')){

calendar();
}
if(document.getElementById('calendar_matches'))
calendar_matches();

setTimeout( (e)  => {

  const events = document.querySelectorAll(".fc-event-container");
  console.log(events);

  const prevent = (event) => {
    console.log(event)
    event.preventDefault();
  }

  events.forEach((eventOp) => {
    eventOp.addEventListener("click", prevent)
  });

}, 1000)



