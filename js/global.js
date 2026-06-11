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
