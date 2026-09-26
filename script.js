const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeBtn = document.getElementById('themeBtn');
const progress = document.querySelector('.progress');

menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const savedTheme = localStorage.getItem('tejaswi-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeBtn.textContent = document.body.classList.contains('light') ? '☾' : '☼';
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const light = document.body.classList.contains('light');
  localStorage.setItem('tejaswi-theme', light ? 'light' : 'dark');
  themeBtn.textContent = light ? '☾' : '☼';
});

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.max(0, Math.min(100, scrollY / max * 100))}%`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat.split(' ').includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});
