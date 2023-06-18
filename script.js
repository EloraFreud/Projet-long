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

// activity nav bar
const links = document.querySelectorAll("#activity-nav li:not(#activity-close)");
const send = document.querySelectorAll(".icon-send");
const activityElements = document.querySelectorAll(".activity");
updateActivityNav(document.querySelector("#activity-nav li"));

links.forEach((link) => {
  console.log(link);
  link.addEventListener("click", () => {
    updateActivityNav(link);
  });
});

send.forEach((link) => {
  link.addEventListener("click", () => {
    const activityTargetSend = link.dataset.target;

    activityElements.forEach(element => {
      if (element.id === activityTargetSend) {
        element.classList.add("visible");
        element.classList.remove("none");
      } else {
        element.classList.add("none");
        element.classList.remove("visible");
      }
    })
  });
});


function updateActivityNav(activeActivityLink) {
      const activityTarget = activeActivityLink.dataset.target;
  
      //changer l'apparence du button cliqué
      links.forEach(l => l.classList.remove("active"));
      activeActivityLink.classList.add("active");
         
      
      activityElements.forEach(element => {
        if (element.id === activityTarget) {
          element.classList.add("visible");
          element.classList.remove("none");
        } else {
          element.classList.add("none");
          element.classList.remove("visible");
        }
      })
}

// tout le reste
const cta = document.querySelectorAll(".CTA");
const elements = document.querySelectorAll(".transition");

cta.forEach((link) => {
  console.log(link);
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-target").split(" ");

    elements.forEach((element) => {
      if (target.includes(element.id)) {
        element.classList.add("visible");
        element.classList.remove("none");
      } else {
        element.classList.add("none");
        element.classList.remove("visible");      
      }
    });
  });
});


// mettre .CTA a tous les boutons qui vont avoir une action
// mettre .transition a toutes les parties qui s'affichent et disparaissent
// mettre data target sur le CTA avec l'id de la page a afficher quand je clique sur ce CTA


// selection des réponses aux questions du quiz
const answerQuiz = document.querySelectorAll(".answer-quiz");

answerQuiz.forEach((link) => {
  link.addEventListener("click", () => {
    link.classList.toggle("answer-quiz-clicked");
  });
});

