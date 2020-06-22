const newUserValidation = () => {
    const findUser = document.getElementById('button-create-user')
    const safariDateProblem = document.getElementById('dateInput')
    window.onload = (e) => {
        const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
        const iOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isSafari && iOS) {
            // alert("You are using Safari on iOS!");
        } else if (isSafari) {
            console.log(e)
            e.target.placeholder = "10/12/1997";
        }
    };

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

        //birthdate
        const birthdateError = document.getElementById("birthdate-error-message")
        const birthdateInput = document.querySelector(".birthdate-input")
        const pickedDate = Date.parse(birthdateInput.value)
        const dateNow = Date.now()
        if ((isNaN(birthdateInput.value) === true) && ((pickedDate - dateNow) >= 0)) {
            event.preventDefault()
            if (birthdateInput.classList.contains('error-green')) {
                birthdateInput.classList.remove('error-green')
            }
            birthdateInput.classList.add('error-red')
            birthdateError.style.display = "contents"
        } else if ((isNaN(birthdateInput.value) === true) && ((pickedDate - dateNow) <= 0)) {
            if (birthdateInput.classList.contains('error-red')) {
                birthdateInput.classList.remove('error-red')
            }
            birthdateInput.classList.add('error-green')
            birthdateError.style.display = "none"
        }

        //phone number
        const phoneNumberError = document.getElementById("phone-number-error-message")
        const phoneNumberInput = document.querySelector(".phone-number-input")
        const regex = RegExp(/^\d{10}$/);
        if (phoneNumberInput.value === "") {
            if (phoneNumberInput.classList.contains('error-green')) {
                phoneNumberInput.classList.remove('error-green')
            } else if (phoneNumberInput.classList.contains('error-red')) {
                phoneNumberInput.classList.remove('error-red')
            }
            phoneNumberInput.classList.add('original-border')
            phoneNumberError.style.display = "none"
        } else if (regex.test(phoneNumberInput.value) === false) {
            event.preventDefault()
            if (phoneNumberInput.classList.contains('error-green')) {
                phoneNumberInput.classList.remove('error-green')
            } else if (phoneNumberInput.classList.contains('original-border')) {
                phoneNumberInput.classList.remove('original-border')
            }
            phoneNumberInput.classList.add('error-red')
            phoneNumberError.style.display = "contents"
        } else if (regex.test(phoneNumberInput.value) === true) {
            if (phoneNumberInput.classList.contains('error-red')) {
                phoneNumberInput.classList.remove('error-red')
            } else if (phoneNumberInput.classList.contains('original-border')) {
                phoneNumberInput.classList.remove('original-border')
            }
            phoneNumberInput.classList.add('error-green')
            phoneNumberError.style.display = "none"
        }
    })

}

const capitalizeLetter = () => {
    const editUser = document.getElementById("button-create-user");
    editUser.addEventListener("click", (e) => {
        const firstNameInput = document.querySelector(".first-name-input");
        const lastNameInput = document.querySelector(".last-name-input");
        const cityInput = document.querySelector(".city-input");
        const firstNameCapitalized =
            firstNameInput.value[0].toUpperCase() +
            firstNameInput.value.slice(1).toLowerCase();
        const lastNameCapitalized =
            lastNameInput.value[0].toUpperCase() +
            lastNameInput.value.slice(1).toLowerCase();
        const cityCapitalized = cityInput.value[0].toUpperCase() +
            cityInput.value.slice(1).toLowerCase()
        firstNameInput.value = firstNameCapitalized
        lastNameInput.value = lastNameCapitalized
        cityInput.value = cityCapitalized
    });
};

export { newUserValidation, capitalizeLetter };