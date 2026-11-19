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

const emailToggle = document.querySelector('[data-email-toggle]');
const emailPanel = document.querySelector('#profile-email');
if (emailToggle && emailPanel) {
  const address = emailPanel.querySelector('[data-email-address]');
  const copyButton = emailPanel.querySelector('[data-email-copy]');
  const status = emailPanel.querySelector('.email-copy-status');

  emailToggle.addEventListener('click', () => {
    const expanded = emailToggle.getAttribute('aria-expanded') === 'true';
    emailToggle.setAttribute('aria-expanded', String(!expanded));
    emailPanel.hidden = expanded;
    status.textContent = '';
  });

  emailPanel.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    emailPanel.hidden = true;
    emailToggle.setAttribute('aria-expanded', 'false');
    emailToggle.focus();
  });

  copyButton.addEventListener('click', async () => {
    const email = address.textContent.trim();
    let copied = false;
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(address);
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      if (copied) selection.removeAllRanges();
    }
    status.textContent = copied ? 'Copied!' : 'Select the address to copy.';
  });
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navigationLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });
sections.forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();
