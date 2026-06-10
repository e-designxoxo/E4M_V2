/* ═══════════════════════════════════════════════════════════════
   E4M GLOBAL JAVASCRIPT — SHARED ACROSS ALL PROJECT PAGES
   
   This file contains:
   - Navbar scroll shadow
   - Desktop dropdown toggles
   - Mobile hamburger + drawer toggle
   - Keyboard escape handling
   - Scroll reveal intersection observer
   
   DO NOT EDIT per-project. This is the single source of truth.
   Link this file at the bottom of every project page, before </body>:
   <script src="../../js/global.js"></script>
   ═══════════════════════════════════════════════════════════════ */

// Navbar scroll shadow
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('is-scrolled',window.scrollY>10),{passive:true});

// Desktop dropdown toggles
function toggleNav(id){
  const el=document.getElementById(id),w=el.classList.contains('is-open');
  document.querySelectorAll('.nav__item.is-open').forEach(n=>{
    n.classList.remove('is-open');
    n.querySelector('[aria-expanded]').setAttribute('aria-expanded','false');
  });
  if(!w){
    el.classList.add('is-open');
    el.querySelector('[aria-expanded]').setAttribute('aria-expanded','true');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click',e=>{
  if(!e.target.closest('.nav__item'))
    document.querySelectorAll('.nav__item.is-open').forEach(n=>{
      n.classList.remove('is-open');
      n.querySelector('[aria-expanded]').setAttribute('aria-expanded','false');
    });
});

// Close dropdowns on Escape key
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')
    document.querySelectorAll('.nav__item.is-open').forEach(n=>{
      n.classList.remove('is-open');
      n.querySelector('[aria-expanded]').setAttribute('aria-expanded','false');
      n.querySelector('.nav__link').focus();
    });
});

// Mobile hamburger + drawer toggle
const hamburger=document.getElementById('hamburger'),drawer=document.getElementById('mobile-drawer');
function toggleMobile(){
  const o=drawer.classList.toggle('is-open');
  hamburger.classList.toggle('is-open',o);
  hamburger.setAttribute('aria-expanded',String(o));
  hamburger.setAttribute('aria-label',o?'Close menu':'Open menu');
  document.body.style.overflow=o?'hidden':'';
}

// Mobile drawer section toggle
function toggleMobSection(id){
  document.getElementById(id).classList.toggle('is-open');
}

// Scroll reveal intersection observer
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
