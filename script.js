const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

function showTab(id) {
  const target = sections.find(section => section.id === id);
  if (!target) return;

  sections.forEach(section => {
    section.hidden = section !== target;
  });

  links.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (nav) nav.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'auto' });
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

const brand = document.querySelector('.brand');
if (brand) {
  brand.addEventListener('click', event => {
    event.preventDefault();
    showTab('home');
    history.replaceState(null, '', '#home');
  });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

const initialId = window.location.hash.slice(1);
showTab(sections.some(section => section.id === initialId) ? initialId : 'home');
    
