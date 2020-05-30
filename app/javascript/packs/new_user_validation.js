const newUserValidation = () => {
    const findUser = document.getElementById('button-create-user')

    findUser.addEventListener('click', (e) => {
        //first name
        const firstNameErrorHTML = document.querySelector(".first-name-error-message")
        const firstNameInput = document.querySelector(".first-name-input")
        if (firstNameInput.value === "") {
            event.preventDefault()
            firstNameInput.style.border = 'solid 1px #FD0F15'
            firstNameInput.style.borderRadius = '2px'
            firstNameErrorHTML.style.display = "contents"
        } else if (firstNameInput.value !== "") {
            firstNameInput.style.border = 'solid 1px #A7D930'
            firstNameInput.style.borderRadius = '2px'
            firstNameErrorHTML.style.display = "none"
        }

        //last name
        const lastNameErrorHTML = document.querySelector(".last-name-error-message")
        const lastNameInput = document.querySelector(".last-name-input")
        if (lastNameInput.value === "") {
            event.preventDefault()
            lastNameInput.style.border = 'solid 1px #FD0F15'
            lastNameInput.style.borderRadius = '2px'
            lastNameErrorHTML.style.display = "contents"
        } else if (lastNameInput.value !== "") {
            lastNameInput.style.border = 'solid 1px #A7D930'
            lastNameInput.style.borderRadius = '2px'
            lastNameErrorHTML.style.display = "none"
        }

        //country
        const countryErrorHTML = document.querySelector(".country-error-message")
        const countryInput = document.querySelector(".country-input")
        if (countryInput.value === "") {
            event.preventDefault()
            countryInput.style.border = 'solid 1px #FD0F15'
            countryInput.style.borderRadius = '2px'
            countryErrorHTML.style.display = "contents"
        } else if (countryInput.value !== "") {
            countryInput.style.border = 'solid 1px #A7D930'
            countryInput.style.borderRadius = '2px'
            countryErrorHTML.style.display = "none"
        }

        //city
        const cityErrorHTML = document.querySelector(".city-error-message")
        const cityInput = document.querySelector(".city-input")
        if (cityInput.value === "") {
            event.preventDefault()
            cityInput.style.border = 'solid 1px #FD0F15'
            cityInput.style.borderRadius = '2px'
            cityErrorHTML.style.display = "contents"
        } else if (cityInput.value !== "") {
            cityInput.style.border = 'solid 1px #A7D930'
            cityInput.style.borderRadius = '2px'
            cityErrorHTML.style.display = "none"
        }
    })
}
export { newUserValidation }