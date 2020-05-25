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


    document.querySelector(".hour-min-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })


    document
        .querySelector(".hour-min-input")
        .addEventListener("keydown", (event) => {
            const key = event.key
            const value = event.target.value
            const length = value.length
            console.log(key)
            if (
                key === "Backspace" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Tab"
            ) {
                return;
            }

            if (
                (length === 0 && !/^[0-2]$/g.test(key)) ||
                (length === 1 && Number(value) === 1 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 2 && !/^[0-3]$/g.test(key)) ||
                length >= 2
            ) {
                return event.preventDefault()
            }
        })

    document.querySelector(".min-min-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })

    document
        .querySelector(".min-min-input")
        .addEventListener("keydown", (event) => {
            const key = event.key
            const value = event.target.value
            const length = value.length

            if (
                key === "Backspace" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Tab"
            ) {
                return;
            }

            if (
                (length === 0 && !/^[0-5]$/g.test(key)) ||
                (length === 1 && Number(value) === 1 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 2 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 3 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 4 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 5 && !/^[0-9]$/g.test(key)) ||
                length >= 2
            ) {
                return event.preventDefault()
            }
        })

    document.querySelector(".hour-max-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })

    document
        .querySelector(".hour-max-input")
        .addEventListener("keydown", (event) => {

            const key = event.key
            const value = event.target.value
            const length = value.length

            if (
                key === "Backspace" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Tab"
            ) {
                return;
            }

            if (
                (length === 0 && !/^[0-2]$/g.test(key)) ||
                (length === 1 && Number(value) === 1 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 2 && !/^[0-3]$/g.test(key)) ||
                length >= 2
            ) {
                return event.preventDefault()
            }
        })

    document.querySelector(".min-max-input").addEventListener("keypress", (e) => {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })

    document
        .querySelector(".min-max-input")
        .addEventListener("keydown", (event) => {
            const key = event.key
            const value = event.target.value
            const length = value.length
            if (
                key === "Backspace" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Tab"
            ) {
                return;
            }

            if (
                (length === 0 && !/^[0-5]$/g.test(key)) ||
                (length === 1 && Number(value) === 1 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 2 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 3 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 4 && !/^[0-9]$/g.test(key)) ||
                (length === 1 && Number(value) === 5 && !/^[0-9]$/g.test(key)) ||
                length >= 2
            ) {
                return event.preventDefault();
            }
        });
}


export { hoursAutomaticallySkip, putRealTime }