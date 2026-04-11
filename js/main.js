// ─── NAV SCROLL BEHAVIOR ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 20
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(255,255,255,0.07)';
});

// ─── MOBILE MENU ───
const toggle = document.querySelector('.nav-mobile-toggle');
const mobileMenu = document.querySelector('.nav-mobile');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) mobileMenu.classList.remove('open');
  });
}

// ─── ACTIVE NAV LINK ───
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  if (link.dataset.page === currentPath || 
      (currentPath === '/' && link.dataset.page === '/index.html')) {
    link.classList.add('active');
  }
});

// ─── FADE IN ON SCROLL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
