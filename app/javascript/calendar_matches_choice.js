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


      eventMouseEnter: function(event) {
        console.log("helloooooo")
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
              return res.json()
            }).then(match => {
              window.location.href = `/matches?validated_id=${match.id}`
            })

          }
          // const matcheCreated = document.querySelector('.flash')
          // console.log(matcheCreated)

        } else {
          alert('No match possible on that day \nPick another date please!')
        }
      },

    });
    calendar.render();


  });
};




// test.forEach((u) => {

//   u.currentTarget.addEventListener('mouseover', event => {
//     console.log("mouse in");
//   });
// });

export { calendar_matches }
