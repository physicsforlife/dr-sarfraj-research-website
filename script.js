const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

function showTab(id) {
  sections.forEach(section => {
    section.hidden = section.id !== id;
  });

  links.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (nav) nav.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

links.forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href').slice(1);
    if (sections.some(section => section.id === id)) {
      event.preventDefault();
      showTab(id);
      history.replaceState(null, '', '#' + id);
    }
  });
});

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const initialId = window.location.hash.slice(1);
showTab(sections.some(section => section.id === initialId) ? initialId : 'home');
