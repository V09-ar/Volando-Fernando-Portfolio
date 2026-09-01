const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));
}

const roles = ['Web Developer', 'AI / ML', 'Data Analytics', 'Project Coordination', 'Digital Solutions'];
const roleElement = document.querySelector('#role');
if (roleElement) {
  let roleIndex = 0;
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }, { opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' });
    roleElement.textContent = roles[roleIndex];
  }, 2700);
}

const header = document.querySelector('.site-header');
const topButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
  topButton?.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
