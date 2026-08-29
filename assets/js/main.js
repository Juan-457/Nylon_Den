(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (window.scrollY > 24) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.hidden = true;
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var heroVideos = Array.prototype.slice.call(document.querySelectorAll('[data-hero-video]'));
  var heroToggle = document.getElementById('heroMediaToggle');
  var iconPause = heroToggle ? heroToggle.querySelector('.icon-pause') : null;
  var iconPlay = heroToggle ? heroToggle.querySelector('.icon-play') : null;
  var heroToggleLabel = heroToggle ? heroToggle.querySelector('.visually-hidden') : null;
  var crossfadeTimer = null;
  var activeIndex = 0;
  var CROSSFADE_INTERVAL = 7000;
  var userPaused = false;

  function startCrossfade() {
    if (crossfadeTimer || heroVideos.length < 2) return;
    crossfadeTimer = setInterval(function () {
      var nextIndex = (activeIndex + 1) % heroVideos.length;
      heroVideos[activeIndex].classList.remove('is-active');
      heroVideos[nextIndex].classList.add('is-active');
      activeIndex = nextIndex;
    }, CROSSFADE_INTERVAL);
  }

  function stopCrossfade() {
    clearInterval(crossfadeTimer);
    crossfadeTimer = null;
  }

  function pauseHero() {
    stopCrossfade();
    heroVideos.forEach(function (video) { video.pause(); });
    if (iconPause) iconPause.hidden = true;
    if (iconPlay) iconPlay.hidden = false;
    if (heroToggleLabel) heroToggleLabel.textContent = 'Reanudar animación de fondo';
    if (heroToggle) heroToggle.setAttribute('aria-pressed', 'true');
  }

  function playHero() {
    heroVideos.forEach(function (video) { video.play().catch(function () {}); });
    startCrossfade();
    if (iconPause) iconPause.hidden = false;
    if (iconPlay) iconPlay.hidden = true;
    if (heroToggleLabel) heroToggleLabel.textContent = 'Pausar animación de fondo';
    if (heroToggle) heroToggle.setAttribute('aria-pressed', 'false');
  }

  if (reducedMotionQuery.matches) {
    pauseHero();
  } else {
    playHero();
  }

  reducedMotionQuery.addEventListener('change', function (event) {
    if (userPaused) return;
    if (event.matches) {
      pauseHero();
    } else {
      playHero();
    }
  });

  if (heroToggle) {
    heroToggle.addEventListener('click', function () {
      if (crossfadeTimer || heroVideos.some(function (v) { return !v.paused; })) {
        userPaused = true;
        pauseHero();
      } else {
        userPaused = false;
        playHero();
      }
    });
  }

  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      formNote.textContent = '¡Gracias! Esta es una demo sin backend todavía — cuando conectemos el envío real, tu consulta va a llegar acá.';
      formNote.style.color = '#c2410c';
      formNote.style.fontWeight = '600';
    });
  }
})();
