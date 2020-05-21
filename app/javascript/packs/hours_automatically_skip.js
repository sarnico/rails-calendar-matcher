const hoursAutomaticallySkip = (fromHours, toMins) => {
    fromHours = document.querySelector(".hour-min-input")
    toMins = document.querySelector(".min-min-input")
    const length = fromHours.value.length
    const maxLength = fromHours.getAttribute("maxLength")

    if (length == maxLength) {
        toMins.focus()
    }
}

export { hoursAutomaticallySkip }