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

    const minsMinInput = document.querySelector('.min-min-input')
    minsMinInput.addEventListener('keyup', (e) => {
        fromHours = document.querySelector(".min-min-input");
        toMins = document.querySelector(".hour-max-input");
        const length = fromHours.value.length;
        const maxLength = fromHours.getAttribute("maxLength");
        if (length == maxLength) {
            toMins.focus();
        }
    })

    const hoursMaxInput = document.querySelector('.hour-max-input')
    hoursMaxInput.addEventListener('keyup', (e) => {
        fromHours = document.querySelector(".hour-max-input");
        toMins = document.querySelector(".min-max-input");
        const length = fromHours.value.length;
        const maxLength = fromHours.getAttribute("maxLength");
        if (length == maxLength) {
            toMins.focus();
        }
    })
}

const putRealTime = () => {
    const hoursRangePattern = /^(2[0-3]|1[0-9]|[0-9])$/;

    document.querySelector(".hour-min-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });
    document.querySelector(".hour-min-input").addEventListener("keypress", (e) => {
        const eKey = parseInt(e.key)
        console.log(e)
        if (hoursRangePattern.test(eKey)) {
            console.log(eKey)
            e.preventDefault()
        }
    })
    document.querySelector(".min-min-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })
    document.querySelector(".hour-max-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })
    document.querySelector(".min-min-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })
}


export { hoursAutomaticallySkip, putRealTime };