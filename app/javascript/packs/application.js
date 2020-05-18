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
import { dropdown } from "./users_dropdown"
import { titleHover } from "./icon_bigger_hover"


// if(document.getElementById('set-timezone')){
//   console.log('Ola')
//   var moment = require('moment-timezone');
//   const b=moment().tz("America/Los_Angeles").format();
//   console.log(b)
// }


if(document.getElementById('calendar')){
  calendar();
}

if(document.getElementById('calendar_matches')){
  calendar_matches();
}

if(document.getElementById('possible_users')){
  dropdown();
}

if(document.getElementById("logo-image")){
  titleHover();
}


