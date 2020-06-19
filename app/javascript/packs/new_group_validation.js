const newGroupValidation = () => {
    const createGroup = document.getElementById(
        "button-create-group"
    );
    createGroup.addEventListener('click', (e) => {
        const nameError = document.getElementById("name-error");
        const nameInput = document.querySelector(".name-input");
        event.preventDefault()
        if (nameInput.value === "") {
            event.preventDefault();
            if (nameInput.classList.contains("error-green")) {
                nameInput.classList.remove("error-green");
            }
            nameInput.classList.add("error-red");
            nameError.style.display = "contents";
        } else if (nameInput.value !== "") {
            if (nameInput.classList.contains("error-red")) {
                nameInput.classList.remove("error-red");
            }
            nameInput.classList.add("error-green");
            nameError.style.display = "none";
        }
    })

    // for attendee validation, go have a look on user dropdown on the bottom
}

export { newGroupValidation };