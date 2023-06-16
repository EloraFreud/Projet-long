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
const elements = document.querySelectorAll(".activity");
updateActivityNav(document.querySelector("#activity-nav li"));

links.forEach((link) => {
  console.log(link);
  link.addEventListener("click", () => {
    updateActivityNav(link);
  });
});

function updateActivityNav(activeActivityLink) {
      const target = activeActivityLink.dataset.target;
  
      //changer l'apparence du button cliqué
      links.forEach(l => l.classList.remove("active"));
      activeActivityLink.classList.add("active");
      
      
      elements.forEach(element => {
        if (element.id === target) {
          element.classList.add("visible");
          element.classList.remove("none");
        } else {
          element.classList.add("none");
          element.classList.remove("visible");
        }
      })
}

// nav community + home
const navCommunity = document.querySelectorAll("#nav-community");
const navHome= document.querySelectorAll("#nav-home");
const communityPage = document.querySelector("#community-page");
const homePage = document.querySelector("#home-page");

navCommunity.forEach((link) => {
  console.log("le truc que je veux tester :");
  console.log(link);
  link.addEventListener("click", () => {

    communityPage.classList.add("visible");
    communityPage.classList.remove("none");
    
    homePage.classList.add("none");
    homePage.classList.remove("visible");
  });
});

navHome.forEach((link) => {
  link.addEventListener("click", () => {
    
    homePage.classList.add("visible");
    homePage.classList.remove("none");
    
    communityPage.classList.add("none");
    communityPage.classList.remove("visible");
  });
});


// nav subject to quiz1 to quiz2 to activity
const subject = document.querySelectorAll("#subject");
const quiz1 = document.querySelector("#quiz-1");
const quiz2 = document.querySelector("#quiz-2");
const subjectPage = document.querySelector("#subject-page");
const quizCloseButton = document.querySelectorAll("#quiz-close");
const quizButtonSuivant = document.querySelectorAll("#quiz-button-suivant");
const quizButtonCommencer = document.querySelectorAll("#quiz-button-commencer");
const sectionActivity = document.querySelector("#section-activity");

subject.forEach((link) => {
  link.addEventListener("click", () => {

    quiz1.classList.add("visible");
    quiz1.classList.remove("none");
    
    subjectPage.classList.add("none");
    subjectPage.classList.remove("visible");
  });
});

quizCloseButton.forEach((link) => {
  link.addEventListener("click", () => {

    quiz1.classList.add("none");
    quiz1.classList.remove("visible");
    
    subjectPage.classList.add("visible");
    subjectPage.classList.remove("none");
  });
});

quizButtonSuivant.forEach((link) => {
  link.addEventListener("click", () => {

    quiz1.classList.add("none");
    quiz1.classList.remove("visible");
    
    quiz2.classList.add("visible");
    quiz2.classList.remove("none");
  });
});

quizButtonCommencer.forEach((link) => {
  link.addEventListener("click", () => {

    quiz2.classList.add("none");
    quiz2.classList.remove("visible");
    
    sectionActivity.classList.add("visible");
    sectionActivity.classList.remove("none");
  });
});

//close activity
const closeActivity = document.querySelectorAll("#activity-close");
closeActivity.forEach((link) => {
  link.addEventListener("click", () => {

    sectionActivity.classList.add("none");
    sectionActivity.classList.remove("visible");
    
    subjectPage.classList.add("visible");
    subjectPage.classList.remove("none");
  });
});