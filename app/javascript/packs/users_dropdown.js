const dropdown = () =>{

  const usersBox = document.getElementById('possible_users')

  if(usersBox) {
    let users = JSON.parse(usersBox.dataset.users)
    const hiddenUsersInput = document.querySelector("#match_user_ids")
    const userSearchInput = document.querySelector('#shown_user_ids')
    const selectedUsersDiv = document.querySelector('#selected_user_ids')
    const userSearchResults = document.querySelector('#user_search_results')
    const groupMembers = JSON.parse(selectedUsersDiv.dataset.group)

    let filteredUsers = []
    let selectedUsers = []


    const selectUser = (user) => {
      if (selectedUsers.indexOf(user) === -1) {
        selectedUsers.push(user)
        const paragraph = document.createElement('p')
        console.log(user.email)
        paragraph.appendChild( document.createTextNode(user.email) );
        paragraph.classList.add('user-chip')
        selectedUsersDiv.appendChild(paragraph)

        // paragraph.addEventListener("click", () => {
        //   const p = document.createElement('p')
        //   item = p.appendChild( document.createTextNode(user.email));
        //   userSearchResults.appendChild(item)
        //   selectedUsersDiv.removeChild(paragraph)
        // })

        hiddenUsersInput.value = JSON.stringify(selectedUsers.map(user => user.id))
      }
    }

    const clickSelectUser = (event) => {
      const userId = event.currentTarget.dataset.userId
      const user = users.find(item => item.id === parseInt(userId))
      selectUser(user)
      resetSearch()
    }

    const boxHover = (e) => {
      userSearchResults.childNodes.forEach((child) =>{
        if (child.classList){
          child.classList.remove("fancy-hover")
        }
      })
      e.currentTarget.classList.toggle("fancy-hover")
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
        paragraph.addEventListener('mouseover', boxHover)
        userSearchResults.appendChild(paragraph)
        filteredUsers.push(user)
      });
    }

    const resetSearch = () => {
      userSearchInput.value = ""
      search()
    }

   const prefillForm = () => {
      groupMembers.forEach((userId) => {
        const user = users.find(item => item.id === userId)
        selectUser(user)
        users.splice(users.indexOf(user), 1)
        resetSearch()
      })
    }

    prefillForm()

  const debileDisplay = (e) => {
    userSearchResults.classList.toggle("inactif")
    userSearchResults.children[0].classList.add("fancy-hover")
  }

  userSearchInput.addEventListener('click', debileDisplay )
  userSearchResults.addEventListener('click', debileDisplay )

  userSearchInput.addEventListener("input", search);
  userSearchInput.addEventListener("focus", search);


    userSearchInput.addEventListener("keypress", (event) => {
      if (event.key === 'Enter') {
        const user = filteredUsers[0]

        selectUser(user)
        resetSearch()
        debileDisplay()
        event.preventDefault()
      }
    })

    const usersAll =  document.querySelectorAll('.user')

    usersAll.forEach((user) => {
      user.addEventListener("click", clickSelectUser)
    })
  }
}

export { dropdown }
