const hoursAutomaticallySkip = (fromHours, toMins) => {
    const hoursMinInput = document.querySelector('.hour-min-input')
    hoursMinInput.addEventListener('keyup', (e) => {
        fromHours = document.querySelector(".hour-min-input");
        toMins = document.querySelector(".min-min-input");
        const length = fromHours.value.length;
        const maxLength = fromHours.getAttribute("maxLength");

        if (length == maxLength) {
            toMins.focus();
        }

    })
}

export { hoursAutomaticallySkip };