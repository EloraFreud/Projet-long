const navLinks = document.querySelectorAll(".nav-link");
const navIndicator = document.querySelector(".nav-indicator");

updateIndicator(document.querySelector("nav.nav .nav-link"));

navLinks.forEach((link) => {
  console.log(link);
  link.addEventListener("click", () => {
    updateIndicator(link);
  });
});

function updateIndicator(activeLink) {
  // supprimer la classe "active" de tous les liens
  navLinks.forEach((link) => link.classList.remove("active"));

  // ajouter la classe "active" au lien cliqué
  activeLink.classList.add("active");

  // changer la couleur des icônes
  const icons = document.querySelectorAll(".nav-link i");
  const activeColor = "icon-primary";
  const defaultColor = "icon-white";

  icons.forEach((icon) => {
    icon.classList.remove(activeColor);
    icon.classList.add(defaultColor);
  });

  const clickedIcon = activeLink.querySelector("i");
  clickedIcon.classList.remove(defaultColor);
  clickedIcon.classList.add(activeColor);

  // decaler l'indicateur
  const linkRect = activeLink.getBoundingClientRect();
  const indicatorOffset =
    linkRect.left - navIndicator.parentElement.getBoundingClientRect().left;
  navIndicator.style.transform = `translateX(${indicatorOffset}px)`;
}
