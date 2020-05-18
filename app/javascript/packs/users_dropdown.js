const dropdown = () => {
    // console.log('javascript/packs/users_dropdown.js LOADED')
    const usersBox = document.getElementById('possible_users')

    if (usersBox) {
        let users = JSON.parse(usersBox.dataset.users)
        const hiddenUsersInput = document.querySelector(`#${usersBox.dataset.inputId}`)
        const userSearchInput = document.querySelector('#shown_user_ids')
        const selectedUsersDiv = document.querySelector('#selected_user_ids')
        const userSearchResults = document.querySelector('#user_search_results')
        const findMatch = document.getElementById('button-find-the-match')
        const groupMembers = JSON.parse(selectedUsersDiv.dataset.group || "[]")

        let filteredUsers = []
        let selectedUsers = []

        const generateTimesSvg = () => {
            const htmlString = `<svg aria-hidden="true" focusable="false" data-icon="times" class="i-inline-text" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`
            const div = document.createElement('div')
            div.innerHTML = htmlString.trim()
            return div.firstChild
        }

        const search = () => {
            filteredUsers = []
            let query = userSearchInput.value;
            const children = userSearchResults.children
            for (let i = children.length - 1; i >= 0; i--) {
                const child = children[i]
                child.remove()
            }

            users.forEach(user => {
                if (!user.email.includes(query)) return
                if (selectedUsers.indexOf(user) != -1) return
                const paragraph = document.createElement('p')
                paragraph.appendChild(document.createTextNode(user.email));
                paragraph.dataset.userId = user.id;
                paragraph.addEventListener('click', clickSelectUser)
                paragraph.addEventListener('mouseover', boxHover)
                userSearchResults.appendChild(paragraph)
                filteredUsers.push(user)
            });
        }

        const selectUser = (user) => {
            if (!user) return
            if (selectedUsers.indexOf(user) === -1) {
                selectedUsers.push(user)
                const paragraph = document.createElement('p')
                paragraph.appendChild(document.createTextNode(`${user.email}  `))
                paragraph.appendChild(generateTimesSvg())
                paragraph.classList.add('user-chip')
                paragraph.dataset.userId = user.id
                selectedUsersDiv.appendChild(paragraph)
                paragraph.addEventListener("click", unSelectUser)
                hiddenUsersInput.value = JSON.stringify(selectedUsers.map(user => user.id))
            }
        }

        const unSelectUser = (event) => {
            const paragraph = event.currentTarget
            const idToRemove = paragraph.dataset.userId
            selectedUsersDiv.removeChild(paragraph)
            const indexToRemove = selectedUsers.findIndex(item => item.id === idToRemove)
            selectedUsers.splice(indexToRemove, 1);
            hiddenUsersInput.value = JSON.stringify(selectedUsers.map(user => user.id))
            search()
        }

        const clickSelectUser = (event) => {
            const userId = event.currentTarget.dataset.userId
            const user = users.find(item => item.id === parseInt(userId))
            selectUser(user)
            resetSearch()
        }

        const boxHover = (e) => {
            userSearchResults.childNodes.forEach((child) => {
                if (child.classList) {
                    child.classList.remove("fancy-hover")
                }
            })
            e.currentTarget.classList.toggle("fancy-hover")
        }



        const resetSearch = () => {
            userSearchInput.value = ""
            search()
        }

        // Commenté les lignes suivantes car la séléction de personnes ne fonctionne pas lorqu'on render new.

        // const prefillForm = () => {
        //     groupMembers.forEach((userId) => {
        //         const user = users.find(item => item.id === userId)
        //         selectUser(user)
        //         users.splice(users.indexOf(user), 1)
        //         resetSearch()
        //     })
        // }

        // prefillForm()

        const debileDisplay = (e) => {
            userSearchResults.classList.toggle("inactif")
            userSearchResults.children[0].classList.add("fancy-hover")
        }

        userSearchInput.addEventListener('click', debileDisplay)
        userSearchResults.addEventListener('click', debileDisplay)

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

        // validation & preventDefault for attendees

        findMatch.addEventListener('click', (e) => {
            const attendeeHTML = document.getElementById("attendee-div")
            if (selectedUsers.length === 0) {
                event.preventDefault()
                userSearchInput.style.border = 'solid 1px #FD0F15'
                userSearchInput.style.borderRadius = '2px'
                attendeeHTML.insertAdjacentHTML('afterend', '<p style="color:#FD0F15; font-size: 13px;">Please select at least one friend</p>')
            } else if (selectedUsers.length >= 1) {
                userSearchInput.style.border = 'solid 1px #A7D930'
                userSearchInput.style.borderRadius = '2px'
            }
        })

        const usersAll = document.querySelectorAll('.user')

        usersAll.forEach((user) => {
            user.addEventListener("click", clickSelectUser)
        })


    }


}


export { dropdown }