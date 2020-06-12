const newMatchValidation = () => {
    const findMatch = document.getElementById('button-find-the-match')
    document.querySelector(".date-min-input").valueAsDate = new Date();

    findMatch.addEventListener('click', (e) => {
        // title
        const titleError = document.getElementById("title-error")
        const titleInput = document.querySelector(".title-input")
        if (titleInput.value === "") {
            event.preventDefault()
            if (titleInput.classList.contains('error-green')) {
                titleInput.classList.remove('error-green')
            }
            titleInput.classList.add('error-red')
            titleError.style.display = "contents"
        } else if (titleInput.value !== "") {
            if (titleInput.classList.contains('error-red')) {
                titleInput.classList.remove('error-red')
            }
            titleInput.classList.add('error-green')
            titleError.style.display = "none"
        }

        // //dates
        const dateMinError = document.getElementById("date-min-error")
        const dateMinError2 = document.getElementById("date-min-error-2")
        const dateMaxError = document.getElementById("date-max-error")
        const dateMaxError2 = document.getElementById("date-max-error-2")
        const dateMinInput = document.querySelector(".date-min-input")
        const dateMaxInput = document.querySelector(".date-max-input")
        if (dateMaxInput.value === "") {
            event.preventDefault()
            dateMinInput.classList.add("error-green")
            if (dateMaxInput.classList.contains('error-green')) {
                dateMaxInput.classList.remove('error-green')
            }
            dateMaxInput.classList.add("error-red")
            dateMaxError.style.display = "contents"
            dateMaxError2.style.display = "none"
            dateMinError.style.display = "contents"
        } else if (dateMaxInput.value !== "") {
            dateMinInput.classList.add("error-green")
            if (dateMaxInput.classList.contains('error-red')) {
                dateMaxInput.classList.remove('error-red')
            }
            dateMaxInput.classList.add('error-green')
            dateMaxError.style.display = "none"
            dateMaxError2.style.display = "none"
            dateMinError.style.display = "none"
        }
        if ((dateMaxInput.value < dateMinInput.value) && dateMaxInput.value !== "") {
            event.preventDefault()
            dateMinInput.classList.add("error-green")
            if (dateMaxInput.classList.contains('error-green')) {
                dateMaxInput.classList.remove('error-green')
            }
            dateMaxInput.classList.add("error-red")
            dateMaxError2.style.display = "contents"
            dateMaxError.style.display = "none"
            dateMinError.style.display = "contents"
        }

        let today = new Date();
        let dd = today.getDate();

        let mm = today.getMonth() + 1;
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }

        if (mm < 10) {
            mm = `0${mm}`;
        }
        today = `${yyyy}-${mm}-${dd}`
        if (dateMinInput.value < today) {
            event.preventDefault()
            if (dateMinInput.classList.contains('error-green')) {
                dateMinInput.classList.remove('error-green')
            }
            dateMinInput.classList.add("error-red")
            dateMinError.style.display = "none"
            dateMinError2.style.display = "contents"
        } else {
            dateMinError2.style.display = "none"
        }

        // //hours
        const hourMinInput = document.querySelector(".hour-min-input")
        const doublePointMin = document.getElementById("double-point-min");
        const minMinInput = document.querySelector(".min-min-input")
        const hourMinError = document.getElementById("hour-min-invalid")

        const doublePointMax = document.getElementById("double-point-max");
        const hourMaxInput = document.querySelector(".hour-max-input")
        const minMaxInput = document.querySelector(".min-max-input")
        const hourMaxError = document.getElementById("hour-max-invalid")
            // hour minimum
        if (
            hourMinInput.value.length === 0 ||
            minMinInput.value.length === 0 ||
            minMinInput.value.length > 2 ||
            hourMinInput.value.length > 2
        ) {
            event.preventDefault();
            if (
                hourMinInput.classList.contains('hour-error-green') ||
                minMinInput.classList.contains('min-error-green') ||
                doublePointMin.classList.contains('double-point-green')
            ) {
                hourMinInput.classList.remove('hour-error-green')
                minMinInput.classList.remove('min-error-green')
                doublePointMin.classList.remove('double-point-green')
            }
            hourMinInput.classList.add('hour-error-red')
            minMinInput.classList.add('min-error-red')
            doublePointMin.classList.remove('double-point')
            doublePointMin.classList.add('double-point-red')
            hourMinError.style.display = "contents";
        } else {
            if (
                hourMinInput.classList.contains('hour-error-red') ||
                minMinInput.classList.contains('min-error-red') ||
                doublePointMin.classList.contains('double-point-red')
            ) {
                hourMinInput.classList.remove('hour-error-red')
                minMinInput.classList.remove('min-error-red')
                doublePointMin.classList.remove('double-point-green')
            }
            hourMinInput.classList.add('hour-error-green')
            minMinInput.classList.add('min-error-green')
            doublePointMin.classList.remove('double-point')
            doublePointMin.classList.add('double-point-green')
            hourMinError.style.display = "none";
        }
        // hour maximum
        if (
            hourMaxInput.value.length === 0 ||
            minMaxInput.value.length === 0 ||
            minMaxInput.value.length > 2 ||
            hourMaxInput.value.length > 2
        ) {
            event.preventDefault();
            if (
                hourMaxInput.classList.contains('hour-error-green') ||
                minMaxInput.classList.contains('min-error-green') ||
                doublePointMax.classList.contains('double-point-green')
            ) {
                hourMaxInput.classList.remove('hour-error-green')
                minMaxInput.classList.remove('min-error-green')
                doublePointMax.classList.remove('double-point-green')
            }
            hourMaxInput.classList.add('hour-error-red')
            minMaxInput.classList.add('min-error-red')
            doublePointMax.classList.remove('double-point')
            doublePointMax.classList.add('double-point-red')
            hourMaxError.style.display = "contents";
        } else {
            if (
                hourMaxInput.classList.contains('hour-error-red') ||
                minMaxInput.classList.contains('min-error-red') ||
                doublePointMax.classList.contains('double-point-red')
            ) {
                hourMaxInput.classList.remove('hour-error-red')
                minMaxInput.classList.remove('min-error-red')
                doublePointMax.classList.remove('double-point-red')
            }
            hourMaxInput.classList.add('hour-error-green')
            minMaxInput.classList.add('min-error-green')
            doublePointMax.classList.remove('double-point')
            doublePointMax.classList.add('double-point-green')
            hourMaxError.style.display = "none";
        }

        const rightHour = document.getElementById("right-hour")
        if (
            (
                (hourMinInput.value.length !== 0) && (hourMaxInput.value.length !== 0) &&
                (minMinInput.value.length !== 0) && (minMaxInput.value.length !== 0)
            ) &&
            (
                hourMinInput.value > hourMaxInput.value ||
                (minMinInput.value > minMaxInput.value && hourMinInput.value === hourMaxInput.value) ||
                (minMinInput.value === minMaxInput.value && hourMinInput.value === hourMaxInput.value)
            )) {
            event.preventDefault()
            if (rightHour.classList.contains("error-green")) {
                rightHour.classList.remove("error-green")
            }
            rightHour.classList.add("error-red")
            if (
                hourMinInput.classList.contains('hour-error-green') ||
                minMinInput.classList.contains('min-error-green') ||
                doublePointMin.classList.contains('double-point-green')
            ) {
                hourMinInput.classList.remove('hour-error-green')
                minMinInput.classList.remove('min-error-green')
                doublePointMin.classList.remove('double-point-green')
            }
            hourMinInput.classList.add('hour-error-red')
            minMinInput.classList.add('min-error-red')
            doublePointMin.classList.remove('double-point')
            doublePointMin.classList.add('double-point-red')
            rightHour.style.display = "contents";
        } else {
            rightHour.style.display = "none";
        }

        // for attendee validation, go have a look on user dropdown on the bottom
    })
}

export { newMatchValidation }