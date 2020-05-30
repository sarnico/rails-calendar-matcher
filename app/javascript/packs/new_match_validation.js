const newMatchValidation = () => {
    const findMatch = document.getElementById('button-find-the-match')

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
        const dateMaxError = document.getElementById("date-max-error")
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
            dateMinError.style.display = "contents"
        } else if (dateMaxInput.value !== "") {
            dateMinInput.classList.add("error-green")
            if (dateMaxInput.classList.contains('error-red')) {
                dateMaxInput.classList.remove('error-red')
            }
            dateMaxInput.classList.add('error-green')
            dateMaxError.style.display = "none"
            dateMinError.style.display = "none"
        }

        // //hours
        const hourMinErrorHTML = document.querySelector(".hour-min-invalid-error-message")
        const doublePointMin = document.querySelector(".double-point-min");
        const hourMinInput = document.querySelector(".hour-min-input")
        const minMinInput = document.querySelector(".min-min-input")

        const hourMaxErrorHTML = document.querySelector(".hour-max-error-message")
        const doublePointMax = document.querySelector(".double-point-max");
        const hourMaxInput = document.querySelector(".hour-max-input")
        const minMaxInput = document.querySelector(".min-max-input")
            // if (
            //     hourMinInput.value.length === 0 ||
            //     minMinInput.value.length === 0 ||
            //     minMinInput.value.length > 2 ||
            //     hourMinInput.value.length > 2
            // ) {
            //     event.preventDefault();
            //     hourMinInput.style.borderLeft = "solid 1px #FD0F15";
            //     hourMinInput.style.borderTop = "solid 1px #FD0F15";
            //     hourMinInput.style.borderBottom = "solid 1px #FD0F15";
            //     hourMinInput.style.borderRadiusLeft = "2px";
            //     hourMinInput.style.outline = "none";
            //     minMinInput.style.borderRight = "solid 1px #FD0F15";
            //     minMinInput.style.borderTop = "solid 1px #FD0F15";
            //     minMinInput.style.borderBottom = "solid 1px #FD0F15";
            //     minMinInput.style.borderRadiusRight = "2px";
            //     doublePointMin.style.borderTop = "solid 1px #FD0F15";
            //     doublePointMin.style.borderBottom = "solid 1px #FD0F15";
            //     hourMinErrorHTML.style.display = "contents";
            // } else {
            //     hourMinInput.style.borderLeft = "solid 1px #A7D930";
            //     hourMinInput.style.borderTop = "solid 1px #A7D930";
            //     hourMinInput.style.borderBottom = "solid 1px #A7D930";
            //     hourMinInput.style.borderRadiusLeft = "2px";
            //     minMinInput.style.borderRight = "solid 1px #A7D930";
            //     minMinInput.style.borderTop = "solid 1px #A7D930";
            //     minMinInput.style.borderBottom = "solid 1px #A7D930";
            //     minMinInput.style.borderRadiusRight = "2px";
            //     doublePointMin.style.borderTop = "solid 1px #A7D930";
            //     doublePointMin.style.borderBottom = "solid 1px #A7D930";
            //     hourMinErrorHTML.style.display = "none";
            // }
            // if (
            //     hourMaxInput.value.length === 0 ||
            //     minMaxInput.value.length === 0 ||
            //     minMaxInput.value.length > 2 ||
            //     hourMaxInput.value.length > 2
            // ) {
            //     event.preventDefault();
            //     hourMaxInput.style.borderLeft = "solid 1px #FD0F15";
            //     hourMaxInput.style.borderTop = "solid 1px #FD0F15";
            //     hourMaxInput.style.borderBottom = "solid 1px #FD0F15";
            //     hourMaxInput.style.borderRadiusLeft = "2px";
            //     minMaxInput.style.borderRight = "solid 1px #FD0F15";
            //     minMaxInput.style.borderTop = "solid 1px #FD0F15";
            //     minMaxInput.style.borderBottom = "solid 1px #FD0F15";
            //     minMaxInput.style.borderRadiusRight = "2px";
            //     doublePointMax.style.borderTop = "solid 1px #FD0F15";
            //     doublePointMax.style.borderBottom = "solid 1px #FD0F15";
            //     hourMaxErrorHTML.style.display = "contents";
            // } else {
            //     hourMaxInput.style.borderLeft = "solid 1px #A7D930";
            //     hourMaxInput.style.borderTop = "solid 1px #A7D930";
            //     hourMaxInput.style.borderBottom = "solid 1px #A7D930";
            //     hourMaxInput.style.borderRadiusLeft = "2px";
            //     minMaxInput.style.borderRight = "solid 1px #A7D930";
            //     minMaxInput.style.borderTop = "solid 1px #A7D930";
            //     minMaxInput.style.borderBottom = "solid 1px #A7D930";
            //     minMaxInput.style.borderRadiusRight = "2px";
            //     doublePointMax.style.borderTop = "solid 1px #A7D930";
            //     doublePointMax.style.borderBottom = "solid 1px #A7D930";
            //     hourMaxErrorHTML.style.display = "none";
            // }


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
                rightHour.classList.remove("error-red")
            }
            rightHour.classList.add("error-red")
            rightHour.style.display = "contents";
        } else {
            rightHour.style.display = "none";
        }

        // for attendee validation, go have a look on user dropdown on the bottom
    })
}

export { newMatchValidation }