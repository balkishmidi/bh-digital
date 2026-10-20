// Add your real business contact details before publishing.
const CONTACT = {
  email: 'bhdigital.contact@gmail.com',
  whatsapp: '', // International digits only, e.g. 216 followed by your number
};

const projectDirections = {
  presence: { title: 'Un site vitrine à votre image.', copy: 'Présentez vos services, racontez votre histoire et facilitez la prise de contact avec une présence claire et professionnelle.', service: 'La Présence — Site vitrine', cta: 'Parlons de votre site ↗' },
  launch: { title: 'Une landing page. Un objectif clair.', copy: 'Donnez une adresse à votre nouvelle offre, votre campagne ou votre lancement. Un parcours ciblé pour guider vos visiteurs vers la prise de contact.', service: 'L’Essentiel — Landing page', cta: 'Préparons votre lancement ↗' },
  refresh: { title: 'Votre site, avec un nouvel élan.', copy: 'Repensons la navigation, le confort sur mobile et la direction visuelle pour mieux présenter votre activité et simplifier le parcours de vos visiteurs.', service: 'Refonte d’un site existant', cta: 'Discutons de votre refonte ↗' },
};
let selectedDirection = 'presence';
document.querySelectorAll('[data-goal]').forEach(button => {
  button.addEventListener('click', () => {
    selectedDirection = button.dataset.goal;
    const direction = projectDirections[selectedDirection];
    document.querySelectorAll('[data-goal]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    document.querySelector('#finder-title').textContent = direction.title;
    document.querySelector('#finder-copy').textContent = direction.copy;
    document.querySelector('#finder-cta').textContent = direction.cta;
    const result = document.querySelector('.finder-result');
    result.classList.remove('changing');
    requestAnimationFrame(() => result.classList.add('changing'));
  });
});
document.querySelector('#finder-cta').addEventListener('click', () => {
  document.querySelector('#service').value = projectDirections[selectedDirection].service;
});

// Progressive enhancement: content remains visible without animation support.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .services-grid article, .project, .approach-intro, .steps article, .offers article, .contact > div, .contact form').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--delay', `${(index % 3) * 65}ms`);
    observer.observe(element);
  });
  document.documentElement.classList.add('motion-ready');
}
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);
let scrollPending = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// Native dialog supports keyboard navigation, focus containment and Escape.
document.querySelectorAll('[data-gallery-open]').forEach(trigger => {
  const gallery = document.getElementById(trigger.getAttribute('aria-controls'));
  if (!gallery) return;
  trigger.addEventListener('click', () => {
    gallery.showModal();
    document.body.classList.add('gallery-open');
  });
  gallery.querySelector('.gallery-close').addEventListener('click', () => gallery.close());
  gallery.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    trigger.focus({ preventScroll: true });
  });
  gallery.addEventListener('click', event => {
    if (event.target !== gallery) return;
    const bounds = gallery.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) gallery.close();
  });
  gallery.querySelector('.gallery-contact').addEventListener('click', () => gallery.close());
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Fermer le menu' : 'Ouvrir le menu');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) menuButton.click();
});
document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.package;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const whatsapp = document.querySelector('#whatsapp-link');
if (/^\d{8,15}$/.test(CONTACT.whatsapp)) {
  whatsapp.hidden = false;
  whatsapp.href = `https://wa.me/${CONTACT.whatsapp}`;
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener noreferrer';
}
// Keep submission on-page; report success only after provider acceptance.
document.querySelector('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.querySelector('#form-status');
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;
  status.dataset.state = '';
  if (window.location.protocol === 'file:') {
    status.dataset.state = 'error';
    status.textContent = 'Ouvrez le site en ligne pour envoyer votre message.';
    return;
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('_honey')) return;
  const originalLabel = button.innerHTML;
  button.disabled = true;
  button.textContent = 'Envoi en cours…';
  status.textContent = '';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://formsubmit.co/ajax/bhdigital.contact@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(data)),
      signal: controller.signal,
    });
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Submission rejected');
    // Activation is a provider prerequisite; don't label an activation notice as sent.
    if (/activat|confirm.*email|check.*email/i.test(result.message || '')) {
      status.dataset.state = 'error';
      status.textContent = 'Le formulaire est en cours d’activation. Écrivez à bhdigital.contact@gmail.com.';
      return;
    }
    status.dataset.state = 'success';
    status.textContent = 'Merci ! Votre message a bien été envoyé.';
    form.reset();
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error.name === 'AbortError'
      ? 'L’envoi n’a pas pu être confirmé. Réessayez plus tard ou écrivez à bhdigital.contact@gmail.com.'
      : 'L’envoi a échoué. Réessayez ou écrivez à bhdigital.contact@gmail.com.';
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    button.innerHTML = originalLabel;
  }
});
