const root = document.documentElement;
try {
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;
} catch {}

document.querySelector('.theme-btn').addEventListener('click', () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
});

const nav = document.getElementById('nav');
const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', () => {
  btn.setAttribute('aria-expanded', nav.classList.toggle('open'));
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
});

const items = document.querySelectorAll('.project, .card, .job, .contact-box');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  items.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}
