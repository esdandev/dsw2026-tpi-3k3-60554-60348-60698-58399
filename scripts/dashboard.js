document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.querySelector('.menu');
  const nav = document.getElementById('sidebar');

  const DESKTOP_BREAKPOINT = 900;

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  if (menuButton && nav) {
    const setMenu = (open) => {
      nav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', open);
    };

    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenu(!nav.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target)) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMenu(false);
    });
  }
});