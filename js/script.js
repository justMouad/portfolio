/* Portfolio interactions — vanilla JS, no dependencies */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----- Theme toggle (remembered in localStorage) ----- */
  $('#themeToggle').addEventListener('click', function () {
    var next = doc.dataset.theme === 'light' ? 'dark' : 'light';
    doc.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ----- Mobile menu ----- */
  var burger = $('#burger'), links = $('#navLinks');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.innerHTML = '<i class="fa-solid ' + (open ? 'fa-xmark' : 'fa-bars') + '"></i>';
  }
  burger.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ----- Nav background, back-to-top ----- */
  var nav = $('#nav'), toTop = $('#toTop');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 20);
    toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  /* ----- Active section indicator ----- */
  var navAnchors = $$('.nav__links a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });

    /* ----- Scroll reveal ----- */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----- Project filters ----- */
  var chips = $$('.chip'), cards = $$('.project');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      cards.forEach(function (card) {
        card.hidden = !(f === 'all' || card.dataset.cat.split(' ').indexOf(f) > -1);
      });
    });
  });

  /* ----- Contact form: opens the visitor's email client (no backend) ----- */
  var form = $('#contactForm'), msg = $('#formMsg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), text = form.message.value.trim();
    if (!name || !text || !/^\S+@\S+\.\S+$/.test(email)) {
      msg.textContent = 'Enter your name, a valid email and a message.';
      return;
    }
    var subject = encodeURIComponent('Portfolio contact from ' + name);
    var body = encodeURIComponent(text + '\n\n' + name + '\n' + email);
    msg.textContent = 'Opening your email app…';
    window.location.href = 'mailto:chouaimouad42@gmail.com?subject=' + subject + '&body=' + body;
  });

  /* ----- Footer year ----- */
  $('#year').textContent = new Date().getFullYear();
})();
