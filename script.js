const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav a')];
const panels = [...document.querySelectorAll('main > section[id]')];
const homeExtras = [...document.querySelectorAll('main > section:not([id])')];

function showTab(id) {
  const target = panels.find(panel => panel.id === id);
  if (!target) return;

  panels.forEach(panel => {
    panel.hidden = panel !== target;
  });

  homeExtras.forEach(panel => {
    panel.hidden = id !== 'home';
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

    if (panels.some(panel => panel.id === id)) {
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
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const initialId = window.location.hash.slice(1);
showTab(panels.some(panel => panel.id === initialId) ? initialId : 'home');
