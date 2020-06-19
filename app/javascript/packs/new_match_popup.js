const removePopup = () => {
    document.querySelector(".clickme").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#backpopup").classList.remove("backpopup");
        document.querySelector("#frontpopup").style.display = "none";
    });
}

export { removePopup };