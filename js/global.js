/* ═══════════════════════════════════════════════════════════════
   E4M GLOBAL JAVASCRIPT — SHARED ACROSS ALL PAGES
   
   This file contains:
   - Navbar scroll shadow
   - Desktop dropdown toggles
   - Mobile hamburger + drawer toggle
   - Keyboard escape handling
   - Scroll reveal intersection observer
   - Donate amount selector (homepage only)
   
   Link this file at the bottom of every page, before </body>:
   
   HOMEPAGE (root level):
   <script src="js/global.js"></script>
   
   PROJECT PAGES (nested 2 levels):
   <script src="../../js/global.js"></script>
   
   ═══════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────
   NAVBAR SCROLL SHADOW
   ───────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP DROPDOWNS — Open/close nav items
   ───────────────────────────────────────────────────────────── */
function toggleNav(id) {
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('is-open');
  
  // Close all other open items
  document.querySelectorAll('.nav__item.is-open').forEach(n => {
    n.classList.remove('is-open');
    n.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false');
  });
  
  // Toggle this item
  if (!wasOpen) {
    el.classList.add('is-open');
    el.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'true');
  }
}

/* Close dropdowns when clicking outside */
document.addEventListener('click', e => {
  if (!e.target.closest('.nav__item')) {
    document.querySelectorAll('.nav__item.is-open').forEach(n => {
      n.classList.remove('is-open');
      n.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false');
    });
  }
});

/* Close dropdowns on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav__item.is-open').forEach(n => {
      n.classList.remove('is-open');
      n.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false');
      n.querySelector('.nav__link').focus();
    });
  }
});

/* ─────────────────────────────────────────────────────────────
   MOBILE HAMBURGER + DRAWER
   ───────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobile-drawer');

function toggleMobile() {
  const isOpen = drawer.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

/* ─────────────────────────────────────────────────────────────
   MOBILE DRAWER SECTIONS — Accordion toggles
   ───────────────────────────────────────────────────────────── */
function toggleMobSection(id) {
  const section = document.getElementById(id);
  const button = section.querySelector('.mob-section__toggle');
  const isOpen = section.classList.toggle('is-open');
  
  button.setAttribute('aria-expanded', String(isOpen));
}

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL — Fade-up on intersection
   ───────────────────────────────────────────────────────────── */
const scrollRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      scrollRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// Observe all elements with .reveal class
document.querySelectorAll('.reveal').forEach(el => {
  scrollRevealObserver.observe(el);
});

/* ─────────────────────────────────────────────────────────────
   DONATE AMOUNT SELECTOR (homepage only)
   ───────────────────────────────────────────────────────────── */
function selectAmount(btn, amount) {
  // Remove active from all buttons
  document.querySelectorAll('.amount-btn').forEach(b => {
    b.classList.remove('is-active');
  });
  
  // Add active to clicked button
  btn.classList.add('is-active');
  
  // Update CTA button text
  const donateBtn = document.getElementById('donate-cta');
  if (donateBtn) {
    donateBtn.textContent = amount ? 'Donate ' + amount + ' now' : 'Donate now';
  }
}

/* ─────────────────────────────────────────────────────────────────
  ICONS - SOCIAL ICONS — inject sprite + replace .social-btn content 
   ───────────────────────────────────────────────────────────────── */

(function() {
  // Inject sprite into DOM
  const sprite = document.createElement('div');
  sprite.style.display = 'none';
  sprite.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">
    <symbol id="icon-facebook" viewBox="0 0 24 24">
      <path fill="#195301" d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </symbol>
    <symbol id="icon-instagram" viewBox="0 0 24 24">
      <rect fill="none" stroke="#195301" stroke-width="2" x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle fill="none" stroke="#195301" stroke-width="2" cx="12" cy="12" r="4"/>
      <circle fill="#195301" cx="17.5" cy="6.5" r="1.2"/>
    </symbol>
    <symbol id="icon-linkedin" viewBox="0 0 24 24">
      <path fill="#195301" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect fill="#195301" x="2" y="9" width="4" height="12"/>
      <circle fill="#195301" cx="4" cy="4" r="2"/>
    </symbol>
  </svg>`;
  document.body.prepend(sprite);

  // Replace .social-btn text content with the right icon
  document.querySelectorAll('.social-btn[aria-label]').forEach(btn => {
    const map = { Facebook: 'icon-facebook', Instagram: 'icon-instagram', LinkedIn: 'icon-linkedin' };
    const id = map[btn.getAttribute('aria-label')];
    if (id) btn.innerHTML = `<svg width="18" height="18" aria-hidden="true"><use href="#${id}"/></svg>`;
  });
})();
