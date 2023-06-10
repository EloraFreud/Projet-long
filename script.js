const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');

navLinks.forEach(link => {
  link.addEventListener('click', () => {

    console.log("eventlistener");
    // supprimer la classe "active" de tous les liens
    navLinks.forEach(link => link.classList.remove('active'));
    
    // ajouter la classe "active" au lien cliqué
    link.classList.add('active');
    
    // changer la couleur des icônes
    const icons = document.querySelectorAll('.nav-link i');
    const activeColor = 'icon-primary';
    const defaultColor = 'icon-white'; 
    
    icons.forEach(icon => {
        console.log("change class icon");
      icon.classList.remove(activeColor);
      icon.classList.add(defaultColor);
    });

    const clickedIcon = link.querySelector('i');
    clickedIcon.classList.remove(defaultColor);
    clickedIcon.classList.add(activeColor);

    // decaler l'indicateur
    const linkRect = link.getBoundingClientRect();
    const indicatorOffset = linkRect.left - navIndicator.parentElement.getBoundingClientRect().left;
    navIndicator.style.transform = `translateX(${indicatorOffset}px)`;
  });
});