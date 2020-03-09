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



const usersBox = document.getElementById('possible_users')
const users = JSON.parse(usersBox.dataset.users)
console.log(users)


  const hiddenUsersInput = document.querySelector("#match_user_ids")
  const userSearchInput = document.querySelector('#shown_user_ids')
  const selectedUsersDiv = document.querySelector('#selected_user_ids')
  const userSearchResults = document.querySelector('#user_search_results')

  let filteredUsers = []
  let selectedUsers = []

  const selectUser = (user) => {
    if (selectedUsers.indexOf(user) === -1) {
      selectedUsers.push(user)
      const paragraph = document.createElement('p')
      paragraph.appendChild( document.createTextNode(user.email) );
      paragraph.classList.add('user-chip')
      selectedUsersDiv.appendChild(paragraph)
      hiddenUsersInput.value = JSON.stringify(selectedUsers.map(user => user.id))
    }
  }

  const clickSelectUser = (event) => {
    const userId = event.currentTarget.dataset.userId
    const user = users.find(item => item.id === parseInt(userId))
    selectUser(user)
    resetSearch()
  }

  const search = () => {
    filteredUsers = []
    let query = userSearchInput.value;
    const children = userSearchResults.children
    for (let i = children.length - 1; i >= 0; i--){
      const child = children[i]
      child.remove()
    }

    users.forEach(user => {
      if (!user.email.includes(query)) return
      if (selectedUsers.indexOf(user) != -1) return
      const paragraph = document.createElement('p')
      paragraph.appendChild( document.createTextNode(user.email) );
      paragraph.dataset.userId = user.id;
      paragraph.addEventListener('click', clickSelectUser)
      userSearchResults.appendChild(paragraph)
      filteredUsers.push(user)
    });
  }

  const resetSearch = () => {
    userSearchInput.value = ""
    search()
  }

  userSearchInput.addEventListener("input", search);

  userSearchInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
      const user = filteredUsers[0]
      selectUser(user)
      resetSearch()
      event.preventDefault()
    }
  })

  const usersAll =  document.querySelectorAll('.user')

  usersAll.forEach((user) => {
    user.addEventListener("click", clickSelectUser)
  })



  // userSearchResults.addEventListener("click", (event) => {
  //   // const user = filteredUsers[0]
  //   // console.log(event.currentTarget)
  //   const user = document.querySelector("#user_search_results p").dataset.userId
  //   console.log(user)
  //   if (selectedUsers.indexOf(user) === -1) {
  //     selectedUsers.push(user)
  //     const paragraph = document.createElement('p')
  //     paragraph.appendChild( document.createTextNode(user.email) );
  //     paragraph.classList.add('user-chip')
  //     selectedUsersDiv.appendChild(paragraph)
  //     hiddenUsersInput.value = JSON.stringify(selectedUsers.map(user => user.id))
  //   event.preventDefault()
  // }
// })

