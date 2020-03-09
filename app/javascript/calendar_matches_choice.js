import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view

var calendar_matches = () => {

  document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar_matches');

    var user_id = calendarEl.dataset.ids

    var results = JSON.parse(calendarEl.dataset.results)




    var calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, interactionPlugin ],
      selectable: true,
      events: results,

      eventRender: function(event, element) {
        if(event.icon){
          element.find(".fc-title").prepend("<i class='fas fa-"+event.icon+"'></i>");
        }
      },

      displayEventTime: false,

      eventColor: "#f4f4f4",

      eventTimeFormat:{
        hour: '2-digit',
        minute: '2-digit'
      },


       select: function(info) {
        console.log(info)

                // var selDate = new Date(start);
                // add your function
          },

      // select: function(info) {
      // a = fc-title
      // console.log(fc-title.results)
      //   // if (info.start > Date.now()) {
      //   //   var eventTitle = prompt("Provide your name:");

      //   //   calendar.addEvent({
      //   //     title: eventTitle,
      //   //     start: info.start,
      //   //     end: info.end
      //   //   });

      //   //   let input_time = document.querySelector('#booking_time_slot')
      //   //   input_time.value = info.start
      //   //   document.querySelector('#new_booking').submit()
      //   //   alert('Buddy time booked on: ' + info.start.toUTCString());
      //   // } else {
      //   //   alert('Cannot book an appointment in the past');
      //   },

    });
    calendar.render();
  });
};

export { calendar_matches }
