const newMatchValidation = () => {
    const findMatch = document.getElementById('button-find-the-match')

    findMatch.addEventListener('click', (e) => {
        // title
        const titleErrorHTML = document.querySelector(".title-error-message")
        const titleInput = document.querySelector(".title-input")
        if (titleInput.value === "") {
            event.preventDefault()
            titleInput.style.border = 'solid 1px #FD0F15'
            titleInput.style.borderRadius = '2px'
            titleErrorHTML.style.display = "contents"
        } else if (titleInput.value !== "") {
            titleInput.style.border = 'solid 1px #A7D930'
            titleInput.style.borderRadius = '2px'
            titleErrorHTML.style.display = "none"
        }

        //dates
        const dateMaxErrorHTML = document.querySelector(".date-max-error-message")
        const dateMinInput = document.querySelector(".date-min-input")
        const dateMaxInput = document.querySelector(".date-max-input")
        if (dateMaxInput.value === "") {
            event.preventDefault()
            dateMaxInput.style.border = 'solid 1px #FD0F15'
            dateMaxInput.style.borderRadius = '2px'
            dateMaxErrorHTML.style.display = "contents"
            dateMinInput.style.border = 'solid 1px #A7D930'
            dateMinInput.style.borderRadius = '2px'
        } else if (dateMaxInput.value !== "") {
            dateMaxInput.style.border = 'solid 1px #A7D930'
            dateMaxInput.style.borderRadius = '2px'
            dateMaxErrorHTML.style.display = "none"
            dateMinInput.style.border = 'solid 1px #A7D930'
            dateMinInput.style.borderRadius = '2px'
        }

        // for attendee validation, go have a look on user dropdown on the bottom
    })
}

export { newMatchValidation }