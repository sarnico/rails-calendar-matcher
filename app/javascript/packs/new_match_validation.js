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
        const dateMinErrorHTML = document.querySelector(".date-min-error-message")
        const dateMinInput = document.querySelector(".date-min-input")
        const dateMaxInput = document.querySelector(".date-max-input")
        if (dateMaxInput.value === "") {
            event.preventDefault()
            dateMaxInput.style.border = 'solid 1px #FD0F15'
            dateMaxInput.style.borderRadius = '2px'
            dateMaxErrorHTML.style.display = "contents"
            dateMinErrorHTML.style.display = "contents"
            dateMinInput.style.border = 'solid 1px #A7D930'
            dateMinInput.style.borderRadius = '2px'
        } else if (dateMaxInput.value !== "") {
            dateMaxInput.style.border = 'solid 1px #A7D930'
            dateMaxInput.style.borderRadius = '2px'
            dateMaxErrorHTML.style.display = "none"
            dateMinErrorHTML.style.display = "none"
            dateMinInput.style.border = 'solid 1px #A7D930'
            dateMinInput.style.borderRadius = '2px'
        }

        //hours
        const hourMinErrorHTML = document.querySelector(".hour-min-error-message")
        const doublePointMin = document.querySelector(".double-point-min");
        const hourMinInput = document.querySelector(".hour-min-input")
        const minMinInput = document.querySelector(".min-min-input")
        const hourMaxErrorHTML = document.querySelector(".hour-max-error-message")
        const doublePointMax = document.querySelector(".double-point-max");
        const hourMaxInput = document.querySelector(".hour-max-input")
        const minMaxInput = document.querySelector(".min-max-input")
        console.log(hourMinInput.value.length)
        if (
            hourMinInput.value.length === 0 ||
            minMinInput.value.length === 0 ||
            minMinInput.value.length > 2 ||
            hourMinInput.value.length > 2
        ) {
            event.preventDefault();
            hourMinInput.style.borderLeft = "solid 1px #FD0F15";
            hourMinInput.style.borderTop = "solid 1px #FD0F15";
            hourMinInput.style.borderBottom = "solid 1px #FD0F15";
            hourMinInput.style.borderRadiusLeft = "2px";
            hourMinInput.style.outline = "none";
            minMinInput.style.borderRight = "solid 1px #FD0F15";
            minMinInput.style.borderTop = "solid 1px #FD0F15";
            minMinInput.style.borderBottom = "solid 1px #FD0F15";
            minMinInput.style.borderRadiusRight = "2px";
            doublePointMin.style.borderTop = "solid 1px #FD0F15";
            doublePointMin.style.borderBottom = "solid 1px #FD0F15";
            hourMinErrorHTML.style.display = "contents";
        } else {
            hourMinInput.style.borderLeft = "solid 1px #A7D930";
            hourMinInput.style.borderTop = "solid 1px #A7D930";
            hourMinInput.style.borderBottom = "solid 1px #A7D930";
            hourMinInput.style.borderRadiusLeft = "2px";
            minMinInput.style.borderRight = "solid 1px #A7D930";
            minMinInput.style.borderTop = "solid 1px #A7D930";
            minMinInput.style.borderBottom = "solid 1px #A7D930";
            minMinInput.style.borderRadiusRight = "2px";
            doublePointMin.style.borderTop = "solid 1px #A7D930";
            doublePointMin.style.borderBottom = "solid 1px #A7D930";
            hourMinErrorHTML.style.display = "none";
        }
        if (
            hourMaxInput.value.length === 0 ||
            minMaxInput.value.length === 0 ||
            minMaxInput.value.length > 2 ||
            hourMaxInput.value.length > 2
        ) {
            event.preventDefault();
            hourMaxInput.style.borderLeft = "solid 1px #FD0F15";
            hourMaxInput.style.borderTop = "solid 1px #FD0F15";
            hourMaxInput.style.borderBottom = "solid 1px #FD0F15";
            hourMaxInput.style.borderRadiusLeft = "2px";
            minMaxInput.style.borderRight = "solid 1px #FD0F15";
            minMaxInput.style.borderTop = "solid 1px #FD0F15";
            minMaxInput.style.borderBottom = "solid 1px #FD0F15";
            minMaxInput.style.borderRadiusRight = "2px";
            doublePointMax.style.borderTop = "solid 1px #FD0F15";
            doublePointMax.style.borderBottom = "solid 1px #FD0F15";
            hourMaxErrorHTML.style.display = "contents";
        } else {
            hourMaxInput.style.borderLeft = "solid 1px #A7D930";
            hourMaxInput.style.borderTop = "solid 1px #A7D930";
            hourMaxInput.style.borderBottom = "solid 1px #A7D930";
            hourMaxInput.style.borderRadiusLeft = "2px";
            minMaxInput.style.borderRight = "solid 1px #A7D930";
            minMaxInput.style.borderTop = "solid 1px #A7D930";
            minMaxInput.style.borderBottom = "solid 1px #A7D930";
            minMaxInput.style.borderRadiusRight = "2px";
            doublePointMax.style.borderTop = "solid 1px #A7D930";
            doublePointMax.style.borderBottom = "solid 1px #A7D930";
            hourMaxErrorHTML.style.display = "none";
        }

        // for attendee validation, go have a look on user dropdown on the bottom
    })
}

export { newMatchValidation }