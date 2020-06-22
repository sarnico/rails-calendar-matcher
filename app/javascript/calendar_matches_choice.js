import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view

  const testSARA = (e) => {
    console.log("yeaj")
    console.log(e)
        }

var calendar_matches = () => {

    document.addEventListener('DOMContentLoaded', function() {

        var calendarEl = document.getElementById('calendar_matches');

        // var user_id = calendarEl.dataset.ids

        var results = JSON.parse(calendarEl.dataset.results)

        var calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            selectable: true,
            selectLongPressDelay: 500,
            events: results,


            eventRender: function(event, element) {
                if (event.icon) {
                    element.find(".fc-title").prepend("<i class='fas fa-" + event.icon + "'></i>");
                }
            },

            eventMouseEnter: function(event) {

            },

            firstDay: 1,

            displayEventTime: false,

            eventColor: "#f4f4f4",

            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit'
            },

            select: function(info) {
                console.log(info)
                var theDate = new Date(info.start);
                var theMyDate = theDate.toLocaleDateString();

                const matchingDate = results.find(result => {
                    const title= result.title
                    const date = new Date(result.start)
                    const myDate = date.toLocaleDateString()
                    return myDate === theMyDate
                })


                if (matchingDate && matchingDate.title!="") {

                    // Getting Hours, Mins and secs one by one
                    // start time
                    const matchingDateFormatingStart = new Date(matchingDate.start)

                    // get day date
                    const matchingDateStartDate = matchingDateFormatingStart.toDateString()

                    const matchDate = matchingDateStartDate

                    const matchid = JSON.parse(document
                        .getElementById("calendar_matches")
                        .dataset
                        .matchid
                    );

                        fetch(`/matches/${matchid}`, {
                                method: 'put',
                                body: JSON.stringify({
                                    match: {
                                        match_date: matchDate
                                    }
                                }),
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
                } else {
                    alert('No match possible on that day \nPick another date please!')
                }
            },
        });
        calendar.render();
    });
};

export { calendar_matches }
