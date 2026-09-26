document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.querySelector('.menu');
  const nav = document.querySelector('nav');


  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      if (window.innerWidth < 600) {
        nav.classList.toggle('open');
      }
    });
  }
});