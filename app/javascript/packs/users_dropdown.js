const dropdown = () => {

    const usersBox = document.getElementById('possible_users')

    if (usersBox) {
        let users = JSON.parse(usersBox.dataset.users)
        const usersAll = document.querySelectorAll('.user')
        const bodySelection = document.getElementById('body')
        const hiddenUsersInput = document.querySelector(`#${usersBox.dataset.inputId}`)
        const userSearchInput = document.querySelector('#shown_user_ids')
        const selectedUsersDiv = document.querySelector('#selected_user_ids')
        const userSearchResults = document.querySelector('#user_search_results')
        const findMatch = document.getElementById('button-find-the-match')
        const groupMembers = JSON.parse(selectedUsersDiv.dataset.group || "[]")
        const attendeesSelected = JSON.parse(selectedUsersDiv.dataset.attendees || "[]")

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

        const prefillForm = () => {
            if (groupMembers != "[]") {
                groupMembers.forEach((userId) => {
                    const user = users.find(item => item.id === userId)
                    selectUser(user)
                    users.splice(users.indexOf(user), 1)
                    resetSearch()
                })
            }
            if (attendeesSelected != "[]") {
                groupMembers.forEach((userId) => {
                    const user = users.find(item => item.id === userId)
                    selectUser(user)
                    users.splice(users.indexOf(user), 1)
                    resetSearch()
                })
            }
        }

        prefillForm()

        const debileDisplay = (e) => {
            userSearchResults.classList.toggle("inactif")
            userSearchResults.children[0].classList.add("fancy-hover")
        }
        const removeDebileDisplay = (e) => {
            if (e.target.id !== 'shown_user_ids') {
                userSearchResults.classList.add("inactif")
                userSearchResults.children[0].classList.remove("fancy-hover")
            }
        }

        userSearchInput.addEventListener('click', debileDisplay)
        userSearchResults.addEventListener('click', debileDisplay)
        bodySelection.addEventListener('click', removeDebileDisplay)

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
            const attendeeError = document.getElementById("attendee-error-message")
            const userIcon = document.getElementById("user-icon")
            if (selectedUsers.length === 0) {
                event.preventDefault()
                if (userIcon.classList.contains('user-icon')) {
                    userIcon.classList.remove('user-icon')
                    userIcon.classList.add('user-icon-on-error')
                    userSearchResults.style.top = "68%"
                }
                if (userSearchInput.classList.contains('error-green')) {
                    userSearchInput.classList.remove('error-green')
                }
                userSearchInput.classList.add('error-red')
                attendeeError.style.display = "contents"
            } else if (selectedUsers.length >= 1) {
                if (userIcon.classList.contains('user-icon-on-error')) {
                    userIcon.classList.remove('user-icon-on-error')
                    userIcon.classList.add('user-icon')
                    userSearchResults.style.top = "96%"
                }
                if (userSearchInput.classList.contains('error-red')) {
                    userSearchInput.classList.remove('error-red')
                }
                userSearchInput.classList.add('error-green')
                attendeeError.style.display = "none"
            }
        })

        usersAll.forEach((user) => {
            user.addEventListener("click", clickSelectUser)
        })
    }
}


export { dropdown }