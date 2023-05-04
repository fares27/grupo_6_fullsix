
window.addEventListener("load", function () {
const hamburgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');

hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('visible');
});

});