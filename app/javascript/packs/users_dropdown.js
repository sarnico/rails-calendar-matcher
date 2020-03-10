
const usersBox = document.getElementById('possible_users')

if(usersBox) {
  const users = JSON.parse(usersBox.dataset.users)

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

// if (event.key === "q") {
//     player1.classList.remove("active");
//     if (player1.nextElementSibling) {
//       player1.nextElementSibling.classList.add("active");
//     } else {
//       alert("Player 1 you WON ! CONGRATS !!!");
//       window.location.reload();
//     }
//   }
//   if (event.key === "p") {
//     player2.classList.remove("active");
//     if (player2.nextElementSibling) {
//       player2.nextElementSibling.classList.add("active");
//     } else {
//       alert("Player 2 you WON ! CONGRATS !!!");
//       window.location.reload();
//     }
//   }
// });



  if (userSearchInput.addEventListener('mouseover')){

    user_search_results.classList.remove("inactif")
  }

  // console.log('FOCUS!')
  // }, true)){
  //   ;

  // if (userSearchInput.addEventListener('mouseover',function(e){
  //   user_search_results.classList.remove("inactif")

  // console.log('FOCUS!')
  // }, true)){
  //   ;

  // window.addEventListener('blur',function(e){
  //   user_search_results.classList.add("inactif")
  // console.log('windows UNFOCUS!')
  // }, true);

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
}
