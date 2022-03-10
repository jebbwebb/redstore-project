const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

export function navBar() {
  toggleButton.addEventListener('click', () => {
    console.log('click');
    navbarLinks.classList.toggle('active');
  });
}
