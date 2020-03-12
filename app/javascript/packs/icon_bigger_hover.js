
const titleHover = () => {

  const hover = document.querySelector(".root-navbar-title")
  const logoImage = document.getElementById("logo-image")

  hover.addEventListener('mouseenter', (e) => {
    logoImage.classList.add("logo-hovered")
  })

  hover.addEventListener('mouseleave', (e) => {
    logoImage.classList.remove("logo-hovered")
  })

}


export { titleHover }
