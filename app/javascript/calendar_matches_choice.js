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
        console.log(event)
        // console.log(element)
      },

      displayEventTime: false,

      eventColor: "#f4f4f4",

      eventTimeFormat:{
        hour: '2-digit',
        minute: '2-digit'
      },

      select: function(info) {
        var theDate = new Date(info.start);
        var theMyDate = theDate.toLocaleDateString();

        const matchingDate = results.find(result => {
          const date = new Date(result.start)
          const myDate = date.toLocaleDateString()
          // console.log(myDate)
          return myDate === theMyDate
        })

        // console.log(matchingDate.start)

        if (matchingDate) {

          // Getting Hours, Mins and secs one by one
          // start time
          const matchingDateFormatingStart = new Date(matchingDate.start)
          const matchingDateStartHours = matchingDateFormatingStart.getHours()
          const matchingDateStartMins = matchingDateFormatingStart.getMinutes()
          const matchingDateStartSecs = matchingDateFormatingStart.getSeconds()

          // end time
          const matchingDateFormatingEnd = new Date(matchingDate.end)
          const matchingDateEndHours = matchingDateFormatingEnd.getHours()
          const matchingDateEndMins = matchingDateFormatingEnd.getMinutes()
          const matchingDateEndSecs = matchingDateFormatingEnd.getSeconds()

          // get day date
          const matchingDateStartDate = matchingDateFormatingStart.toDateString()

          // concatenatin part is gonna be long
          const startTime = matchingDateStartHours + ':' + matchingDateStartMins
          const endTime = matchingDateEndHours + ':' + matchingDateEndMins

          // date to import in match view
          const matchDate = matchingDateStartDate
          console.log(matchDate)

          // alert box message if selected a possible date
          const firstMessage = 'Are you sure you want to make your event happen on\n' + matchingDateStartDate + '\nfrom ' + startTime + ' until ' + endTime

          const ok = confirm(firstMessage)

          const matchid = JSON.parse(document
            .getElementById("calendar_matches")
            .dataset
            .matchid
            );

          if (ok == true) {
            fetch(`/matches/${matchid}`, {
              method: 'put',
              body: JSON.stringify({match: {
                match_date: matchDate
              }}),
              headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
              }
            })
            .then(res => {
              window.location.href = '/matches'
            }).catch(err => alert(err))
          }
        } else {
          alert('No match possible on that day \nPick another date please!')
        }

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
