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

  const events = document.querySelector(".fc-event-container");
  console.log(events);

  const prevent = (event) => {
    console.log(event)
    event.preventDefault();
  }

  events.forEach((eventOp) => {
    eventOp.addEventListener("click", prevent)
  });

}, 1000)


// const add_attendees = document.getElementById("match_user_ids");
// const usersBox = document.getElementById('possible_users')
// // const users = JSON.parse(usersBox.dataset.users)
// // console.log(users)




//   add_attendees.addEventListener("keyup", (event) => {
//     let insertedValue = event.currentTarget.value;
//     users.forEach(user => console.log(user.email))

//     // if user.start_with?('insertedValue')){
//     //   return "Yeah";
//     // };
//   });

