const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.nav-menu');
const navigationLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const sections = navigationLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigationLinks.forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.abstract-toggle').forEach((button) => {
  const abstract = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    abstract.hidden = expanded;
  });
});

const wechatButton = document.querySelector('[data-wechat-open]');
const wechatDialog = document.querySelector('#wechat-dialog');
if (wechatButton && wechatDialog) {
  wechatButton.addEventListener('click', () => wechatDialog.showModal());
  wechatDialog.addEventListener('click', (event) => {
    if (event.target === wechatDialog) wechatDialog.close();
  });
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navigationLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });
sections.forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
