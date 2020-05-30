const newUserValidation = () => {
    const findUser = document.getElementById('button-create-user')
    const bodySelection = document.getElementById('body')

    findUser.addEventListener('click', (e) => {
        //first name
        const firstNameError = document.getElementById("first-name-error-message")
        const firstNameInput = document.querySelector(".first-name-input")
        if (firstNameInput.value === "") {
            event.preventDefault()
            if (firstNameInput.classList.contains('error-green')) {
                firstNameInput.classList.remove('error-green')
            }
            firstNameInput.classList.add('error-red')
            firstNameError.style.display = "contents"
        } else if (firstNameInput.value !== "") {
            if (firstNameInput.classList.contains('error-red')) {
                firstNameInput.classList.remove('error-red')
            }
            firstNameInput.classList.add('error-green')
            firstNameError.style.display = "none"
        }

        //last name
        const lastNameError = document.getElementById("last-name-error-message")
        const lastNameInput = document.querySelector(".last-name-input")
        if (lastNameInput.value === "") {
            event.preventDefault()
            if (lastNameInput.classList.contains('error-green')) {
                lastNameInput.classList.remove('error-green')
            }
            lastNameInput.classList.add('error-red')
            lastNameError.style.display = "contents"
        } else if (lastNameInput.value !== "") {
            if (lastNameInput.classList.contains('error-red')) {
                lastNameInput.classList.remove('error-red')
            }
            lastNameInput.classList.add('error-green')
            lastNameError.style.display = "none"
        }

        //country
        const countryError = document.getElementById("country-error-message")
        const countryInput = document.querySelector(".country-input")
        if (countryInput.value === "") {
            event.preventDefault()
            if (countryInput.classList.contains('error-green')) {
                countryInput.classList.remove('error-green')
            }
            countryInput.classList.add('error-red')
            countryError.style.display = "contents"
        } else if (countryInput.value !== "") {
            if (countryInput.classList.contains('error-red')) {
                countryInput.classList.remove('error-red')
            }
            countryInput.classList.add('error-green')
            countryError.style.display = "none"
        }

        //city
        const cityError = document.getElementById("city-error-message")
        const cityInput = document.querySelector(".city-input")
        if (cityInput.value === "") {
            event.preventDefault()
            if (cityInput.classList.contains('error-green')) {
                cityInput.classList.remove('error-green')
            }
            cityInput.classList.add('error-red')
            cityError.style.display = "contents"
        } else if (cityInput.value !== "") {
            if (cityInput.classList.contains('error-red')) {
                cityInput.classList.remove('error-red')
            }
            cityInput.classList.add('error-green')
            cityError.style.display = "none"
        }
    })

    const validateEntry = (e) => {
        // console.log(e.target.id)
        console.log(e.target)
        if (
            (e.target.id !== ('user_name' ||
                'user_last_name' ||
                'user_birthdate' ||
                'user_phone_number' ||
                'user_country' ||
                'user_city' ||
                'button-create-user')) ||
            (e.target.href !== 'http://localhost:3000/users/sign_out')
        ) {
            // flash.alert = "hey"
            event.preventDefault()
        }
    }

    bodySelection.addEventListener('click', validateEntry)
}



export { newUserValidation }