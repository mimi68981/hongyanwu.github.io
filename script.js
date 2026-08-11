// =========================================================
// Academic Homepage — behavior script
// =========================================================

// ===== Theme =====
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
})();

document.getElementById('theme-toggle').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
siteNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => siteNav.classList.remove('open'))
);

// ===== Header shadow + reading progress + back-to-top =====
const header = document.querySelector('.site-header');
const progress = document.getElementById('progress-bar');
const backTop = document.getElementById('back-top');

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 8);

  const h = document.documentElement.scrollHeight - window.innerHeight;
  const pct = h > 0 ? Math.min((y / h) * 100, 100) : 0;
  progress.style.width = pct + '%';

  backTop.classList.toggle('show', y > 400);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  '.section-head, .prose, .research-line, .entry-list li, .pub-item, .patent-list li, .project-list li, .work-item, .honor-list li'
);
revealTargets.forEach(t => t.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 6) * 40 + 'ms';
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach(t => io.observe(t));

// ===== Scroll-spy for nav =====
const sectionIds = ['about', 'research', 'education', 'publications', 'patents', 'projects', 'work-experience', 'honors', 'skills'];
const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function updateActiveNav() {
  const pos = window.scrollY + 120;
  let currentId = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= pos) currentId = s.id;
  }
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === '#' + currentId);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===== Footer info =====
document.getElementById('year').textContent = new Date().getFullYear();
const lu = document.getElementById('last-updated');
if (lu) {
  const d = new Date();
  lu.textContent = d.toISOString().slice(0, 10);
}
